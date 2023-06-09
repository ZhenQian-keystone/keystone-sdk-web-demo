import KeystoneSDK, {Curve} from "@keystonehq/keystone-sdk";
import {AnimatedQRCode} from "@keystonehq/animated-qr";

export const KeyDerivationCall = () => {
    const schemas = [
        { path: "m/44'/0'/0'"},
        { path: "m/44'/501'/0'/0'/0'", curve: 1}
    ]
    const ur = KeystoneSDK.generateKeyDerivationCall({ schemas });
    return <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>
}
