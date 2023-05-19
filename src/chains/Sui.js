import KeystoneSDK, {KeystoneSuiSDK, UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"

let suiSignRequest = {
    requestId: "7AFD5E09-9267-43FB-A02E-08C4A09417EC",
    signData: "000002002086ac6179ca6ad9a7b1ccb47202d06ae09a131e66309944922af9c73d3c203b66000810270000000000000202000101010001010200000100000e4d9313fb5b3f166bb6f2aea587edbe21fb1c094472ccd002f34b9d0633c71901d833a8eabc697a0b2e23740aca7be9b0b9e1560a39d2f390cf2534e94429f91ced0c00000000000020190ca0d64215ac63f50dbffa47563404182304e0c10ea30b5e4d671b7173a34c0e4d9313fb5b3f166bb6f2aea587edbe21fb1c094472ccd002f34b9d0633c719e803000000000000640000000000000000",
    signType: KeystoneSuiSDK.SignType.Single,
    accounts:[
        {
            path: "m/44'/784'/0'/0'/0'",
            xfp: '78230804',
            address: '0e4d9313fb5b3f166bb6f2aea587edbe21fb1c094472ccd002f34b9d0633c719'
        }
    ],
    origin: "Sui Wallet"
}

export const Sui = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.sui.generateSignRequest(suiSignRequest);

    return <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>
}

// export const SuiScanner = () => {
//     const keystoneSDK = new KeystoneSDK();
//
//     const onSucceed = ({type, cbor}) => {
//         const signature = keystoneSDK.sui.parseSignature(new UR(Buffer.from(cbor, "hex"), type))
//         console.log("signature: ", signature);
//     }
//     const onError = (errorMessage) => {
//         console.log("error: ",errorMessage);
//     }
//
//     return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.SuiSignature]} />
// }
