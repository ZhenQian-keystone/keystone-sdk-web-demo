## 0x1、Integrate with Keystone Wallet Tool

just clone this repo and run the following command in the terminal

## 0x2、Quick Start Guide

### 1.install dependencies

```bash
yarn
```

### 2.start demo

```bash
yarn start
```

### 3.use the following mnemonic to test

DONT SEND ANY ASSETS TO THIS ADDRESS . THIS IS JUST FOR TEST . IF YOU NEED CHANGE ANOTHER ACCOUNT, YOU SHOULD GET ACCOUNTINFO FROM HDKEY TAB OR MULTIACCOUNTS TAB IN THE PAGE

```bash
fatal price room ball promote bronze enlist lion horn then beyond dress
```

## 0x3、More Information

https://developers.keyst.one/#/integration/connect/multi-accounts
https://docs.ethers.org/v5/api/utils/transactions/#utils-serializeTransaction
https://docs.ethers.org/v5/api/providers/provider/#Provider--transaction-methods

## 0x4、ETH Tx Broadcast Demo

```javascript
// ethers v5.7
unsigned transaction
let unsignedTransaction = {
    to: '0xReceiverAddress',
    nonce: 0,
    gasLimit: ethers.utils.parseUnits('100000', 'wei'),
    gasPrice: ethers.utils.parseUnits('1', 'gwei'),
    data: '0x',
    value: ethers.utils.parseEther('0.1'),
    chainId: 1,
    type: 2, // EIP-1559 transaction
    maxPriorityFeePerGas: ethers.utils.parseUnits('1', 'gwei'),
    maxFeePerGas: ethers.utils.parseUnits('2', 'gwei'),
}

// siganature from keystone wallet
let signature_string =
    'e84478a0bdd6d217f218f36260242a9c179cd3ade8d8f13861f6e7e67ba73d6c0ff2c1a1edde0ca6589bce28dd62c2a5bbee9a49f41a285a8a5509e23845c63600'

// serialize tx use used  unsignedTransaction and signature_string to get signed transaction hex string
let signed_tx_hex_string = ethers.utils.serializeTransaction(
    unsignedTransaction,
    signature_string
)

// broadcast signed transaction
providers.sendTransaction(signed_tx_hex_string)
```
