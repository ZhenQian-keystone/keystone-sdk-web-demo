import {useState} from "react";
import KeystoneSDK, {UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"
import {networks, payments, Psbt} from "bitcoinjs-lib";

const generatePSBT = () => {
    const psbt = new Psbt();

    psbt.addInput({
        hash: "226a14d30cfd411b14bf20b7ffd211f7f206699690c54d456cc1bef70c2de5a6", // The utxo hash
        index: 0, // The utxo index
        witnessUtxo: { // An example of a P2WPKH utxo
            value: 100000000, // The utxo amount
            script: payments.p2wpkh({
                pubkey: Buffer.from("0341d94247fabfc265035f0a51bcfaca3b65709a7876698769a336b4142faa4bad", "hex"), // The public key this utxo locked
                network: networks.bitcoin,
            }).output,
        },
        bip32Derivation: [
            {
                masterFingerprint: Buffer.from("F23F9FD2", "hex"), // The master fingerprint
                pubkey: Buffer.from("0341d94247fabfc265035f0a51bcfaca3b65709a7876698769a336b4142faa4bad", 'hex'), // The public key this utxo locked
                path: "m/84'/0'/0'/0/0" // The public key HD path
            }
        ]
    })

    psbt.addOutputs([
        {
            address: "bc1qwvr3x4mc3jrpys0xaxguc8mexw4gw3zyt3h05c", // transfer target
            value: 10000000 // transfer value
        },
        {
            address: "bc1qmx85cfywqmj56z96lhpp8yf2e2qvpg620f2pa6", // change address
            value: 85000000, // change value
            bip32Derivation: [
                {
                    masterFingerprint: Buffer.from("F23F9FD2", "hex"),
                    pubkey: Buffer.from("03ab7173024786ba14179c33db3b7bdf630039c24089409637323b560a4b1d0256", 'hex'), // change public key
                    path: "m/84'/0'/0'/1/0" // change full path
                }
            ]
        }
    ])

    return psbt.toHex()
}

const extractTransaction = (psbtHex) => {
    const psbt = Psbt.fromHex(psbtHex)
    let extractedTransaction
    try {
        extractedTransaction = psbt.finalizeAllInputs().extractTransaction()
    } catch (_){
        extractedTransaction = psbt.extractTransaction()
    }
    // network serialized transaction
    return extractedTransaction.toHex()
}


export const Bitcoin = () => {
    const [isScanning, setIsScanning] = useState(false);

    const psbtHex = generatePSBT();
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.btc.generatePSBT(Buffer.from(psbtHex, "hex"));

    const onSucceed = ({type, cbor}) => {
        const psbtHex = keystoneSDK.btc.parsePSBT(new UR(Buffer.from(cbor, "hex"), type))
        console.log("psbt: ", psbtHex);
        console.log("tx: ", extractTransaction(psbtHex));
        setIsScanning(false);
    }

    const onError = (errorMessage) => {
        console.log("error: ",errorMessage);
        setIsScanning(false);
    }

    return (
        isScanning
            ? <AnimatedQRScanner
                handleScan={onSucceed}
                handleError={onError}
                urTypes={[URType.CryptoPSBT]}
                options={{
                    width: 400,
                    height: 300
                }}
            />
            : (
                <>
                    <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>
                    <button onClick={() => { setIsScanning(true) }}>Scan Keystone</button>
                </>
            )
    )
}
