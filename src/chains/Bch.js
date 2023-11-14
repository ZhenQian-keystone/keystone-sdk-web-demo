import React, { useState } from "react";
import KeystoneSDK, { UR, URType } from "@keystonehq/keystone-sdk";
import { AnimatedQRCode, AnimatedQRScanner } from "@keystonehq/animated-qr";

const bchTransaction = {
  inputs: [
    {
      hash: "a59bcbaaae11ba5938434e2d4348243e5e392551156c4a3e88e7bdc0b2a8f663",
      index: 1,
      pubkey:
        "025ad49879cc8f1f91a210c6a2762fe4904ef0d4f17fd124b11b86135e4cb9143d",
      value: 18519750n,
      ownerKeyPath: "m/44'/145'/0'/0/0",
    },
  ],
  outputs: [
    {
      address: "qzrxqxsx0lfzyk4ht60a5hwwtr2xjvtxmu0qhkusnx",
      value: 10000n,
      isChange: false,
      changeAddressPath: "",
    },
    {
      address: "qpgw8p85ysnjutpsk6u490ytydmgdlmc6vzxu680su",
      value: 18507500n,
      isChange: true,
      changeAddressPath: "M/44'/145'/0'/0/0",
    },
  ],
  fee: "2250",
};

const bchSignRequest = {
  requestId: "cc946be2-8e4c-42be-a321-56a53a8cf516",
  signData: bchTransaction,
  xfp: "F23F9FD2",
};

export const BitcoinCash = () => {
  const keystoneSDK = new KeystoneSDK();
  const ur = keystoneSDK.bch.generateSignRequest(bchSignRequest);
  const [isScan, setIsScan] = useState(false);

  return <>
    <AnimatedQRCode type={ur.type} cbor={ur.cbor.toString("hex")} />
    <button
      onClick={() => {
        setIsScan(!isScan);
      }}
    >
      Scan Keystone
    </button>
    {isScan && <BitcoinCashScanner />}
  </>;
};

export const BitcoinCashScanner = () => {
  const keystoneSDK = new KeystoneSDK();

  const onSucceed = ({ type, cbor }) => {
    console.log(type, cbor);
    const signature = keystoneSDK.bch.parseSignResult(
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
      options={{
        width: 170,
        height: 100,
        blur: false,
      }}
      onProgress={console.log}
    />
  );
};
