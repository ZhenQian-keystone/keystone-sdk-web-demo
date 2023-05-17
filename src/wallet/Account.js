import KeystoneSDK, {UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRScanner} from "@keystonehq/animated-qr"

export const Account = () => {

  const onSucceed = ({type, cbor}) => {
    const account = KeystoneSDK.parseHDKey(new UR(Buffer.from(cbor, "hex"), type))
    console.log("account: ", account);
  }
  const onError = (errorMessage) => {
    console.log("error: ",errorMessage);
  }

  return <AnimatedQRScanner handleScan={onSucceed} handleError={onError} urTypes={[URType.CryptoHDKey]} />
}
