import KeystoneSDK, {UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRScanner} from "@keystonehq/animated-qr"

export const MultiAccounts = () => {

    const onSucceed = ({type, cbor}) => {
        const multiAccounts = KeystoneSDK.parseMultiAccounts(new UR(Buffer.from(cbor, "hex"), type))
        console.log("multiAccounts: ", multiAccounts);
    }
    const onError = (errorMessage) => {
        console.log("error: ",errorMessage);
    }

    return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.CryptoMultiAccounts]} />
}
