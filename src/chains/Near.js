import KeystoneSDK, {UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"

let nearTransaction = {
    requestId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    signData: ['4000000039666363303732306130313664336331653834396438366231366437313339653034336566633438616464316337386633396333643266303065653938633037009FCC0720A016D3C1E849D86B16D7139E043EFC48ADD1C78F39C3D2F00EE98C07823E0CA1957100004000000039666363303732306130313664336331653834396438366231366437313339653034336566633438616464316337386633396333643266303065653938633037F0787E1CB1C22A1C63C24A37E4C6C656DD3CB049E6B7C17F75D01F0859EFB7D80100000003000000A1EDCCCE1BC2D3000000000000'],
    path: "m/44'/397'/0'",
    xfp: 'F23F9FD2',
    origin: 'nearwallet'
}

export const Near = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.near.generateSignRequest(nearTransaction);

    return <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>
}

export const NearScanner = () => {
    const keystoneSDK = new KeystoneSDK();

    const onSucceed = ({cbor, type}) => {
        const signature = keystoneSDK.near.parseSignature(new UR(Buffer.from(cbor, "hex"), type))
        console.log("signature: ", signature);
    }
    const onError = (errorMessage) => {
        console.log("error: ", errorMessage);
    }

    return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.NearSignature]} />
}
