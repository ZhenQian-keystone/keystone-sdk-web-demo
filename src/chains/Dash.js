import React, { useState } from "react";
import KeystoneSDK, { UR, URType } from "@keystonehq/keystone-sdk";
import { AnimatedQRCode, AnimatedQRScanner } from "@keystonehq/animated-qr";

const dashTransaction = {
  inputs: [
    {
      hash: "a59bcbaaae11ba5938434e2d4348243e5e392551156c4a3e88e7bdc0b2a8f663",
      index: 1,
      pubkey:
        "03cf51a0e4f926e50177d3a662eb5cc38728828cec249ef42582e77e5503675314",
      value: 18519750n,
      ownerKeyPath: "m/44'/5'/0'/0/0",
    },
  ],
  outputs: [
    {
      address: "XphpGezU3DUKHk87v2DoL4r7GhZUvCvvbm",
      value: 10000n,
      isChange: false,
      changeAddressPath: "",
    },
    {
      address: "XfmecwGwcPBR7pXTqrn26jTjNe8a4fvcSL",
      value: 18507500n,
      isChange: true,
      changeAddressPath: "M/44'/5'/0'/0/0",
    },
  ],
  fee: "2250",
};

const dashSignRequest = {
  requestId: "cc946be2-8e4c-42be-a321-56a53a8cf516",
  signData: dashTransaction,
  xfp: "F23F9FD2",
};

export const DigitalCash = () => {
  const keystoneSDK = new KeystoneSDK();
  const ur = keystoneSDK.dash.generateSignRequest(dashSignRequest);
  const [isScan, setIsScan] = useState(false);

  return (
    <>
      <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")} />
      <button
        onClick={() => {
          setIsScan(!isScan);
        }}
      >
        Scan Keystone
      </button>
      {isScan && <DigitalCashScanner />}
    </>
  );
};

export const DigitalCashScanner = () => {
  const keystoneSDK = new KeystoneSDK();

  const onSucceed = ({ type, cbor }) => {
    console.log(type, cbor);
    const signature = keystoneSDK.dash.parseSignResult(
      new UR(Buffer.from(cbor, "hex"), type)
    );
    console.log("signature: ", signature);
  };
  const onError = (errorMessage) => {
    console.log("error: ", errorMessage);
  };

  return (
    <AnimatedQRScanner
      handleScan={onSucceed}
      handleError={onError}
      urTypes={[URType.KeystoneSignResult]}
      options={{ width: 170, height: 100, blur: false }}
      onProgress={console.log}
    />
  );
};
