import React, {useState} from "react"
import KeystoneSDK, {UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"

let tronSignRequest = {
    requestId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    signData: '0a0207902208e1b9de559665c6714080c49789bb2c5aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a15418dfec1cde1fe6a9ec38a16c7d67073e3020851c0121541a614f803b6fd780986a42c78ec9c7f77e6ded13c2244a9059cbb0000000000000000000000009c0279f1bda9fc40a85f1b53c306602864533e7300000000000000000000000000000000000000000000000000000000000f424070c0b6e087bb2c90018094ebdc03',
    path: "m/44'/195'/0'/0/0",
    xfp: 'F23F9FD2',
    tokenInfo: {
        name: 'TRON_USDT',
        symbol: 'USDT',
        decimals: 6
    }
}

export const Tron = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.tron.generateSignRequest(tronSignRequest);
    const [isScan, setIsScan] = useState(false);

    return <>
        <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>
        <button onClick={() => {
            setIsScan(!isScan);
        }}>Scan Keystone</button>
        {isScan && <TronScanner />}
    </>
}

export const TronScanner = () => {
    const keystoneSDK = new KeystoneSDK();

    const onSucceed = ({type, cbor}) => {
        console.log(type, cbor)
        const signature = keystoneSDK.tron.parseSignature(new UR(Buffer.from(cbor, "hex"), type))
        console.log("signature: ", signature);
    }
    const onError = (errorMessage) => {
        console.log("error: ",errorMessage);
    }

    return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.TronSignature]} options={{
        width: 170,
        height: 100,
        blur: false
    }} />
}
