import KeystoneSDK, { KeystoneAptosSDK, UR, URType } from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"

let aptosSignRequest = {
    requestId: "17467482-2654-4058-972D-F436EFAEB38E",
    signData: "B5E97DB07FA0BD0E5598AA3643A9BC6F6693BDDC1A9FEC9E674A461EAA00B1931248CD3D5E09500ACB7082497DEC1B2690384C535F3882ED5D84392370AD0455000000000000000002000000000000000000000000000000000000000000000000000000000000000104636F696E087472616E73666572010700000000000000000000000000000000000000000000000000000000000000010A6170746F735F636F696E094170746F73436F696E0002201248CD3D5E09500ACB7082497DEC1B2690384C535F3882ED5D84392370AD04550880969800000000000A000000000000009600000000000000ACF63C640000000002",
    signType: KeystoneAptosSDK.SignType.SingleSign,
    accounts: [{
        path: "m/44'/637'/0'/0'/0'",
        xfp: "F23F9FD2"
    }],
    origin: "Petra"
}

export const Aptos = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.aptos.generateSignRequest(aptosSignRequest);

    return <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>
}

export const AptosScanner = () => {
    const keystoneSDK = new KeystoneSDK();

    const onSucceed = ({type, cbor}) => {
        const signature = keystoneSDK.aptos.parseSignature(new UR(Buffer.from(cbor, "hex"), type))
        console.log("signature: ", signature);
    }
    const onError = (errorMessage) => {
        console.log("error: ",errorMessage);
    }

    return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.AptosSignature]} />
}
