import KeystoneSDK, {UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"

let xrpTransaction = {
    TransactionType: "Payment",
    Amount: "10000000",
    Destination: "rHSW257ioNLCsyGNjWqk1RetxZmWYjkAFy",
    Flags: 2147483648,
    Account: "rEHsDJtuyLguLQdww4UDUfmBHWSd8EUvKg",
    Fee: "12",
    Sequence: 79991857,
    LastLedgerSequence: 80032220,
    SigningPubKey: "0263e0f578081132fd9e12829c67b9e68185d7f7a8bb37b78f98e976c3d9d163e6"
}

export const Xrp = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.xrp.generateSignRequest(xrpTransaction);

    return <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")}/>
}

export const XrpScanner = () => {
    const keystoneSDK = new KeystoneSDK();

    const onSucceed = ({cbor, type}) => {
        const signature = keystoneSDK.xrp.parseSignature(new UR(Buffer.from(cbor, "hex"), type))
        console.log("signature: ", signature);
    }
    const onError = (errorMessage) => {
        console.log("error: ",errorMessage);
    }

    return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.XrpAccount]} />
}
