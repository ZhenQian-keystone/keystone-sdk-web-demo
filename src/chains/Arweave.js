import KeystoneSDK, {KeystoneArweaveSDK, UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"

let arweaveTransaction = {
    requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    signData: "7b22666f726d6174223a322c226964223a22222c226c6173745f7478223a22675448344631615059587639314a704b6b6e39495336684877515a3141597949654352793251694f654145547749454d4d5878786e466a30656b42466c713939222c226f776e6572223a22222c2274616773223a5b7b226e616d65223a2256486c775a51222c2276616c7565223a2256484a68626e4e6d5a5849227d2c7b226e616d65223a22513278705a573530222c2276616c7565223a2251584a44623235755a574e30227d2c7b226e616d65223a22513278705a5735304c565a6c636e4e70623234222c2276616c7565223a224d5334774c6a49227d5d2c22746172676574223a226b796977315934796c7279475652777454617473472d494e3965773838474d6c592d795f4c473346784741222c227175616e74697479223a2231303030303030303030222c2264617461223a22222c22646174615f73697a65223a2230222c22646174615f726f6f74223a22222c22726577617264223a2239313037353734333836222c227369676e6174757265223a22227d",
    signType: KeystoneArweaveSDK.SignType.Transaction,
    saltLen: KeystoneArweaveSDK.SaltLen.Zero,
    masterFingerprint: 'F23F9FD2',
    origin: 'arweave wallet'
}

export const Arweave = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.arweave.generateSignRequest(arweaveTransaction);

    return <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>;
}

export const ArweaveScanner = () => {
    const keystoneSDK = new KeystoneSDK();

    const onSucceed = ({cbor, type}) => {
        console.log(type, cbor);
        const signature = keystoneSDK.arweave.parseAccount(new UR(Buffer.from(cbor, "hex"), type))
        console.log("signature: ", signature);
    }
    const onError = (errorMessage) => {
        console.log("error: ", errorMessage);
    }

    return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.ArweaveCryptoAccount]} />
}
