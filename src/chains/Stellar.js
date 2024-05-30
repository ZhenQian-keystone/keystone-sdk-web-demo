import KeystoneSDK, { KeystoneStellarSDK, UR, URType } from "@keystonehq/keystone-sdk"
import { AnimatedQRCode, AnimatedQRScanner } from "@keystonehq/animated-qr"

let stellarTransaction = {
    requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    signData: "7ac33997544e3175d266bd022439b22cdb16508c01163f26e5cb2a3e1045a979000000020000000096e8c54780e871fabf106cb5b047149e72b04aa5e069a158b2d0e7a68ab50d4f00002710031494870000000a00000001000000000000000000000000664ed303000000000000000100000000000000060000000155534443000000003b9911380efe988ba0a8900eb1cfe44f366f7dbe946bed077240f7f624df15c57fffffffffffffff00000000",
    dataType: KeystoneStellarSDK.DataType.Transaction,
    path: "m/44'/148'/0'",
    xfp: "1250B6BC",
    origin: 'xbull wallet'
}

export const Stellar = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.stellar.generateSignRequest(stellarTransaction);

    return <>
        <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")} />
        <StellarScanner />
    </>;
}

export const StellarScanner = () => {
    const keystoneSDK = new KeystoneSDK();

    const onSucceed = ({ cbor, type }) => {
        console.log(type, cbor);
        const signature = keystoneSDK.stellar.parseAccount(new UR(Buffer.from(cbor, "hex"), type))
        console.log("signature: ", signature);
    }
    const onError = (errorMessage) => {
        console.log("error: ", errorMessage);
    }

    return <AnimatedQRScanner options={{ width: 100 }} handleScan={onSucceed} handleError={onError} urTypes={[URType.StellarSignature]} />
}
