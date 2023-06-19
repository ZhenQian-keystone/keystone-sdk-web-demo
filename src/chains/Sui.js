import KeystoneSDK, { UR, URType } from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"
import { useCallback, useState } from 'react';

let suiSignRequest = {
    requestId: "7AFD5E09-9267-43FB-A02E-08C4A09417EC",
    intentMessage: "00000000000200201ff915a5e9e32fdbe0135535b6c69a00a9809aaf7f7c0275d3239ca79db20d6400081027000000000000020200010101000101020000010000ebe623e33b7307f1350f8934beb3fb16baef0fc1b3f1b92868eec3944093886901a2e3e42930675d9571a467eb5d4b22553c93ccb84e9097972e02c490b4e7a22ab73200000000000020176c4727433105da34209f04ac3f22e192a2573d7948cb2fabde7d13a7f4f149ebe623e33b7307f1350f8934beb3fb16baef0fc1b3f1b92868eec39440938869e803000000000000640000000000000000",
    accounts:[
        {
            path: "m/44'/784'/0'/0'/0'",
            xfp: 'f23f9fd2',
            address: '0xebe623e33b7307f1350f8934beb3fb16baef0fc1b3f1b92868eec39440938869'
        }
    ],
    origin: "Sui Wallet"
}

export const Sui = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.sui.generateSignRequest(suiSignRequest);
    const [isScan, setIsScan] = useState(false);

    const scan = useCallback(() => {
        setIsScan(!isScan);
    }, [isScan]);

    return <>
        <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>
        <button onClick={scan}>Scan Keystone</button>
        {isScan && <SuiScanner />}
    </>
}

export const SuiScanner = () => {
    const keystoneSDK = new KeystoneSDK();

    const onSucceed = ({type, cbor}) => {
        const signature = keystoneSDK.sui.parseSignature(new UR(Buffer.from(cbor, "hex"), type))
        console.log("signature: ", signature);
    }
    const onError = (errorMessage) => {
        console.log("error: ",errorMessage);
    }

    return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.SuiSignature]} options={{ width: 100 }} />
}
