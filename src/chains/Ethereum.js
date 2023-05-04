import {useState} from "react";
import KeystoneSDK, {KeystoneEthereumSDK, UR, URType} from "@keystonehq/keystone-sdk"
import {AnimatedQRCode, AnimatedQRScanner} from "@keystonehq/animated-qr"

import { bufArrToArr } from '@ethereumjs/util'
import { RLP } from '@ethereumjs/rlp'
import { Transaction, FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
import { Hardfork, Chain, Common } from '@ethereumjs/common';

const common =  new Common({ chain: Chain.Ropsten, hardfork: Hardfork.London });

const legacyTransaction = () => {
    const txParams = {
        to: "0x31bA53Ca350975007B27CF43AcB4D9Bc3db2641c",
        gasLimit: 200000,
        gasPrice: 120000000000,
        data: "0x",
        nonce: 1,
        value: 1200000000000000000n,  // 1.2 ETH
    };
    const tx = Transaction.fromTxData(txParams, { common: common, freeze: false });
    const message = tx.getMessageToSign(false); // generate the unsigned transaction
    const serializedMessage = Buffer.from(RLP.encode(bufArrToArr(message))).toString("hex") // use this for the HW wallet input
    return serializedMessage;
}

const eip1559Transaction = () => {
    const txParams = {
        to: "0x31bA53Ca350975007B27CF43AcB4D9Bc3db2641c",
        gasLimit: 35552,
        maxPriorityFeePerGas: 75853,
        maxFeePerGas: 121212,
        data: "0x",
        nonce: 1,
        value: 1200000000000000000n,  // 1.2 ETH
    };
    const eip1559Tx = FeeMarketEIP1559Transaction.fromTxData(txParams, {common});
    const unsignedMessage = Buffer.from(eip1559Tx.getMessageToSign(false)).toString("hex");
    return unsignedMessage;
}

const personalMessage = () => {
    return "68656c6c6f" // hex string of the message "hello"
}

const typedData = () => {
    const data = {
        types: {
            EIP712Domain: [{name: 'name', type: 'string'}],
            Message: [{ name: 'data', type: 'string' }],
        },
        primaryType: 'Message',
        domain: {name: 'Keystone'},
        message: {data: 'Hello!'},
    }
    return Buffer.from(JSON.stringify(data), 'utf-8');
}


export const Ethereum = () => {
    const [isScanning, setIsScanning] = useState(false);

    const keystoneSDK = new KeystoneSDK();
    const ethSignRequest = {
        requestId: "6c3633c0-02c0-4313-9cd7-e25f4f296729",
        signData: typedData(),
        dataType: KeystoneEthereumSDK.DataType.typedData,
        path: "m/44'/60'/0'/0/0",
        xfp: "F23F9FD2",
        chainId: 1,
        origin: "MetaMask"
    }
    const ur = keystoneSDK.eth.generateSignRequest(ethSignRequest);

    const onSucceed = ({type, cbor}) => {
        // console.log("type: ", type);
        const signature = keystoneSDK.eth.parseSignature(new UR(Buffer.from(cbor, "hex"), type))
        console.log("signature: ", signature);
        setIsScanning(false);
    }

    const onError = (errorMessage) => {
        console.log("error: ",errorMessage);
        setIsScanning(false);
    }

    return (
        isScanning
            ? <AnimatedQRScanner
                handleScan={onSucceed}
                handleError={onError}
                urTypes={[URType.EthSignature]}
                options={{
                    width: 400,
                    height: 300
                }}
            />
            : (
                <>
                    <AnimatedQRCode
                        type={ur.type}
                        cbor={ur.cbor.toString("hex")}
                        options={{
                            capacity: 200,
                            interval: 300
                        }}
                    />
                    <button onClick={() => { setIsScanning(true) }}>Scan Keystone</button>
                </>
            )
    )
}
