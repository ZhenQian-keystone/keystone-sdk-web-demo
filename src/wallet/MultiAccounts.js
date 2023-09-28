import KeystoneSDK, {UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRScanner} from "@keystonehq/animated-qr"

export const MultiAccounts = () => {

    const onSucceed = ({type, cbor}) => {
        const multiAccounts = new KeystoneSDK().parseMultiAccounts(new UR(Buffer.from(cbor, "hex"), type))
        console.log("multiAccounts: ", multiAccounts);
    }
    const onError = (errorMessage) => {
        console.log("error: ", errorMessage);
    }

    const onCameraStatus = (isCameraReady, error) => {
        if (!isCameraReady) {
            if(error === "NO_WEBCAM_FOUND"){
                console.log("No camera");
            } else if(error === "NO_WEBCAM_ACCESS"){
                console.log("No camera permission");
            }
        } else {
            console.log("Camera ready");
        }
    }

    const onProgress = (progress) => {
        console.log("scan progress: ", progress);
    }

    return (
        <AnimatedQRScanner
            handleScan={onSucceed}
            handleError={onError}
            urTypes={[URType.CryptoMultiAccounts]}
            onProgress={onProgress}
            videoLoaded={onCameraStatus}
        />
    )
}
