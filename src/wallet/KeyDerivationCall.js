import KeystoneSDK from "@keystonehq/keystone-sdk";
import {AnimatedQRCode} from "@keystonehq/animated-qr";

export const KeyDerivationCall = () => {
    const paths = ["m/44'/60'/0'", "m/44'/501'/0'"];
    const ur = KeystoneSDK.generateKeyDerivationCall({ paths });
    return <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>
}
