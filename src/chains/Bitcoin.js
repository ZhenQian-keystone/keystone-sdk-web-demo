import {useState} from "react";
import KeystoneSDK, {UR} from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"

export const Bitcoin = () => {
    const [isScanning, setIsScanning] = useState(false);

    const psbtHex = "70736274ff0100710200000001a6e52d0cf7bec16c454dc590966906f2f711d2ffb720bf141b41fd0cd3146a220000000000ffffffff02809698000000000016001473071357788c861241e6e991cc1f7933aa87444440ff100500000000160014d98f4c248e06e54d08bafdc213912aca80c0a34a000000000001011f00e1f505000000001600147ced797aa1e84df81e4b9dc8a46b8db7f4abae9122060341d94247fabfc265035f0a51bcfaca3b65709a7876698769a336b4142faa4bad18f23f9fd254000080000000800000008000000000000000000000220203ab7173024786ba14179c33db3b7bdf630039c24089409637323b560a4b1d025618f23f9fd2540000800000008000000080010000000000000000";
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.btc.generatePSBT(Buffer.from(psbtHex, "hex"));

    const onSucceed = ({type, cbor}) => {
        const psbt = keystoneSDK.btc.parsePSBT(new UR(Buffer.from(cbor, "hex"), type))
        console.log("psbt: ", psbt);
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
                urTypes={["crypto-psbt"]}
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
