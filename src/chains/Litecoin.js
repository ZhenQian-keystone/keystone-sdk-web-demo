import React, { useState } from "react";
import KeystoneSDK, { UR, URType } from "@keystonehq/keystone-sdk";
import { AnimatedQRCode, AnimatedQRScanner } from "@keystonehq/animated-qr";

const ltcTransaction = {
  inputs: [
    {
      hash: "a59bcbaaae11ba5938434e2d4348243e5e392551156c4a3e88e7bdc0b2a8f663",
      index: 1,
      utxo: {
        publicKey:
          "035684d200e10bc1a3e2bd7d59e58a07f2f19ef968725e18f1ed65e13396ab9466",
        value: 18519750n,
      },
      ownerKeyPath: "m/49'/2'/0'/0/0",
    },
  ],
  outputs: [
    {
      address: "MUfnaSqZjggTrHA2raCJ9kxpP2hM6zezKw",
      value: 10000n,
      isChange: false,
      changeAddressPath: "",
    },
    {
      address: "MK9aTexgpbRuMPqGpMERcjJ8hLJbAS31Nx",
      value: 18507500n,
      isChange: true,
      changeAddressPath: "M/49'/2'/0'/0/0",
    },
  ],
  fee: "2250",
};

const ltcSignRequest = {
  requestId: "cc946be2-8e4c-42be-a321-56a53a8cf516",
  signData: ltcTransaction,
  xfp: "F23F9FD2",
};

export const Litecoin = () => {
  const keystoneSDK = new KeystoneSDK();
  const ur = keystoneSDK.ltc.generateSignRequest(ltcSignRequest);
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
      {isScan && <LitecoinScanner />}
    </>
  );
};

export const LitecoinScanner = () => {
  const keystoneSDK = new KeystoneSDK();

  const onSucceed = ({ type, cbor }) => {
    console.log(type, cbor);
    const signature = keystoneSDK.ltc.parseSignResult(
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
