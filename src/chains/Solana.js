import KeystoneSDK, {KeystoneSolanaSDK, UR, URType} from "@keystonehq/keystone-sdk";
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr";
import { Transaction, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Message } from "@solana/web3.js";

const getTransaction = () => {
    let transaction = new Transaction({
        recentBlockhash: "CBP1Vd5bL3LC7erH2EUykCo3sPKGMvG9ZCbRBwkXmbbr", // recentBlockhash
        feePayer: new PublicKey("DHwzop9H7oWEhyFV89TU7sC2U8LJmVLNstRjGa2tvkwg"),
    });
    transaction.add(
        SystemProgram.transfer({
            fromPubkey: new PublicKey("DHwzop9H7oWEhyFV89TU7sC2U8LJmVLNstRjGa2tvkwg"),
            toPubkey: new PublicKey("2q8vpggiroLnp65iDfm74RhLd1q9rpQrjdcJP27i5fhC"),
            lamports: 1 * LAMPORTS_PER_SOL,
        }),
    );
    return transaction.serializeMessage();
}

const getMessage = () => {
    return "68656c6c6f" // hex string of the message "hello"
}

const solSignRequest = {
    requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", // uuid.v4()
    signData: getMessage(),
    dataType: KeystoneSolanaSDK.DataType.Message,
    path: "m/44'/501'/0'/0'",
    xfp: "F23F9FD2",
    origin: "Solflare"
}

export const Solana = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.sol.generateSignRequest(solSignRequest);

    return <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>
    // const onSucceed = ({type, cbor}) => {
    //     const signature = keystoneSDK.sol.parseSignature(new UR(Buffer.from(cbor, "hex"), type))
    //     console.log("signature: ", signature);
    // }
    // const onError = (errorMessage) => {
    //     console.log("error: ",errorMessage);
    // }
    //
    // return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={URType.SolSignature} />

}
