import KeystoneSDK, {UR} from "@keystonehq/keystone-sdk"
import {AnimatedQRScanner} from "@keystonehq/animated-qr"

export const MultiAccounts = () => {
    const keystoneSDK = new KeystoneSDK()

    const onSucceed = ({type, cbor}) => {
        const multiAccounts = keystoneSDK.parseMultiAccounts(new UR(Buffer.from(cbor, "hex"), type))
        console.log("multiAccounts: ", multiAccounts);
    }
    const onError = (errorMessage) => {
        console.log("error: ",errorMessage);
    }

    return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={["crypto-multi-accounts"]} />
}
