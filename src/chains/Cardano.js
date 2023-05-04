import KeystoneSDK, { UR } from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"

let cardanoSignRequest = {
    uuidString: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    signData: Buffer.from("84a400828258204e3a6e7fdcb0d0efa17bf79c13aed2b4cb9baf37fb1aa2e39553d5bd720c5c99038258204e3a6e7fdcb0d0efa17bf79c13aed2b4cb9baf37fb1aa2e39553d5bd720c5c99040182a200581d6179df4c75f7616d7d1fd39cbc1a6ea6b40a0d7b89fea62fc0909b6c370119c350a200581d61c9b0c9761fd1dc0404abd55efc895026628b5035ac623c614fbad0310119c35002198ecb0300a0f5f6", "hex"),
    utxos: [
        {
            transactionHash:
                "4e3a6e7fdcb0d0efa17bf79c13aed2b4cb9baf37fb1aa2e39553d5bd720c5c99",
            index: 3,
            amount: 10000000,
            xfp: "73c5da0a",
            hdPath: "m/1852'/1815'/0'/0/0",
            address:
                "addr1qy8ac7qqy0vtulyl7wntmsxc6wex80gvcyjy33qffrhm7sh927ysx5sftuw0dlft05dz3c7revpf7jx0xnlcjz3g69mq4afdhv",
        },
        {
            transactionHash:
                "4e3a6e7fdcb0d0efa17bf79c13aed2b4cb9baf37fb1aa2e39553d5bd720c5c99",
            index: 4,
            amount: 18020000,
            xfp: "73c5da0a",
            hdPath: "m/1852'/1815'/0'/0/1",
            address:
                "addr1qyz85693g4fr8c55mfyxhae8j2u04pydxrgqr73vmwpx3azv4dgkyrgylj5yl2m0jlpdpeswyyzjs0vhwvnl6xg9f7ssrxkz90",
        },
    ],
    certKeys: [],
    origin: "cardano-wallet"
}

export const Cardano = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.cardano.generateSignRequest(cardanoSignRequest);

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

    return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={["aptos-signature"]} />
}
