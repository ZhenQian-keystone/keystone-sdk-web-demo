# Stellar QR Code Integration with Keystone SDK

This README provides instructions on integrating the Keystone SDK for handling Stellar transactions through QR codes. This setup is particularly useful for Stellar-based web wallets that require secure and efficient transaction signing via QR codes.

## Prerequisites

Ensure the following packages are installed in your project:

* @keystonehq/keystone-sdk: ^0.6.0
* @keystonehq/animated-qr: ^0.8.6

You can install these dependencies using npm or yarn:

```bash
npm install @keystonehq/keystone-sdk @keystonehq/animated-qr

or

yarn add @keystonehq/keystone-sdk @keystonehq/animated-qr
```

## Setup

Import the necessary modules from the Keystone SDK and the animated QR code package:

```javascript
import KeystoneSDK, { KeystoneStellarSDK, UR, URType } from "@keystonehq/keystone-sdk";
import { AnimatedQRCode, AnimatedQRScanner } from "@keystonehq/animated-qr";
```

## Usage

### Connect Multiple Accounts

To enable the scanning of QR codes that contain multiple account details, you can use the AnimatedQRScanner component. Below is an example component that manages the scanning process, handles errors, and logs the multi-accounts data retrieved from the QR code.

```javascript
export const MultiAccounts = () => {
    // Initialize Keystone SDK
    const keystoneSDK = new KeystoneSDK();

    // Success handler: Decodes and logs the multi-account data
    const onSucceed = ({ type, cbor }) => {
        const multiAccounts = keystoneSDK.parseMultiAccounts(new UR(Buffer.from(cbor, "hex"), type));
        console.log("MultiAccounts: ", multiAccounts);
    };

    // Error handler: Logs any errors that occur during the scanning process
    const onError = (errorMessage) => {
        console.log("Error: ", errorMessage);
    };

    // Camera status handler: Provides feedback on the camera's availability and permission status
    const onCameraStatus = (isCameraReady, error) => {
        if (!isCameraReady) {
            if (error === "NO_WEBCAM_FOUND") {
                console.log("No webcam found");
            } else if (error === "NO_WEBCAM_ACCESS") {
                console.log("No webcam permission");
            }
        } else {
            console.log("Camera ready");
        }
    };

    // Progress handler: Logs the scanning progress
    const onProgress = (progress) => {
        console.log("Scan progress: ", progress);
    };

    return (
        <AnimatedQRScanner
            handleScan={onSucceed}
            handleError={onError}
            urTypes={[URType.CryptoMultiAccounts]}
            onProgress={onProgress}
            videoLoaded={onCameraStatus}
        />
    );
};
```

To integrate the MultiAccounts component into your application, simply include it in the relevant part of your user interface. Ensure that the user has guidance on positioning the QR code within the camera frame and information on the scanning progress.

### Generating QR Codes for Stellar Transactions

Define the transaction details. signData should be the transaction data that needs to be signed:

```javascript
let stellarTransaction = {
    requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    signData: "7ac33997544e3175d266bd022439b22cdb16508c01163f26e5cb2a3e1045a979000...",
    dataType: KeystoneStellarSDK.DataType.Transaction,
    path: "m/44'/148'/0'",
    xfp: "1250B6BC",
    origin: 'xbull wallet'
};

// For large transactions, use the transaction hash instead:
let stellarTransactionHash = {
    requestId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    signData: "e3bff0cb003cf867acfd117fb514dfaf7a8dd5dddf6e68cc71f553de5046ae2b",
    dataType: KeystoneStellarSDK.DataType.TransactionHash,
    path: "m/44'/148'/0'",
    xfp: "1250B6BC",
    origin: 'xbull wallet'
};
```

Generate a sign request using the KeystoneSDK to be encoded into an animated QR code:

```javascript
export const Stellar = () => {
    const keystoneSDK = new KeystoneSDK();
    const ur = keystoneSDK.stellar.generateSignRequest(stellarTransaction);

    return <>
        <AnimatedQRCode
            type={ur.type}
            cbor={ur.cbor.toString("hex")}
            options={{
                capacity: 200,
            }}
        />
        <StellarScanner />
    </>;
}
```
### Scanning QR Codes for Stellar Signatures

Set up a QR code scanner:

```javascript
export const StellarScanner = () => {
    const keystoneSDK = new KeystoneSDK();

    const onSucceed = (ur) => {
        const { cbor, type } = ur;
        const parsedUR = new UR(Buffer.from(cbor, "hex"), type);
        const signatureResponse = keystoneSDK.stellar.parseSignature(parsedUR)
        console.log("Signature Response: ", signatureResponse.requestId, signatureResponse.signature);
    }

    const onError = (errorMessage) => {
        console.log("Error: ", errorMessage);
    }

    return <AnimatedQRScanner options={{ width: 100 }} handleScan={onSucceed} handleError={onError} urTypes={[URType.StellarSignature]} />
}
```