import {AnimatedQRScanner} from "@keystonehq/animated-qr"
import {useState} from "react";

export const KeystoneBytes = () => {
  const [result, setResult] = useState("")

  const onSucceed = ({type, cbor}) => {
    setResult(cbor);
    console.log("bytes: ", cbor);
  }

  const onError = (errorMessage) => {
    console.log("error: ", errorMessage);
  }

  return (
    <>
      <AnimatedQRScanner
        handleScan={onSucceed}
        handleError={onError}
        urTypes={["bytes"]}
        options={{
          width: 400,
          height: 300
        }}
      />
      {
        !!result && <p style={{maxWidth: 800, wordBreak: "break-word", textAlign: "left"}}>{result}</p>
      }
    </>
  )
}
