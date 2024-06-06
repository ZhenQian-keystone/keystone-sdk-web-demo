import { useState } from 'react'
import KeystoneSDK, {
	KeystoneEthereumSDK,
	UR,
	URType,
} from '@keystonehq/keystone-sdk'
import { AnimatedQRCode, AnimatedQRScanner } from '@keystonehq/animated-qr'

import { bufArrToArr } from '@ethereumjs/util'
import { RLP } from '@ethereumjs/rlp'
import { Transaction, FeeMarketEIP1559Transaction } from '@ethereumjs/tx'
import { Hardfork, Chain, Common } from '@ethereumjs/common'

const common = new Common({ chain: Chain.Mainnet, hardfork: Hardfork.London })

const legacyTransaction = () => {
	const txParams = {
		to: '0x31bA53Ca350975007B27CF43AcB4D9Bc3db2641c',
		gasLimit: 200000,
		gasPrice: 120000000000,
		data: '0x',
		nonce: 1,
		value: 1200000000000000000n, // 1.2 ETH
	}
	const tx = Transaction.fromTxData(txParams, {
		common: common,
		freeze: false,
	})
	const message = tx.getMessageToSign(false) // generate the unsigned transaction
	const serializedMessage = Buffer.from(
		RLP.encode(bufArrToArr(message))
	).toString('hex') // use this for the HW wallet input
	return serializedMessage
}

const eip1559Transaction = () => {
	const txParams = {
		to: '0x31bA53Ca350975007B27CF43AcB4D9Bc3db2641c',
		gasLimit: 35552,
		maxPriorityFeePerGas: 75853,
		maxFeePerGas: 121212,
		data: '0x',
		nonce: 1,
		value: 1200000000000000000n, // 1.2 ETH
	}
	const eip1559Tx = FeeMarketEIP1559Transaction.fromTxData(txParams, {
		common,
	})
	const unsignedMessage = Buffer.from(
		eip1559Tx.getMessageToSign(false)
	).toString('hex')
	return unsignedMessage
}

const personalMessage = () => {
	return '68656c6c6f' // hex string of the message "hello"
}

const typedData = () => {
	const data = {
		types: {
			EIP712Domain: [
				{
					name: 'name',
					type: 'string',
				},
				{
					name: 'version',
					type: 'string',
				},
				{
					name: 'chainId',
					type: 'uint256',
				},
				{
					name: 'verifyingContract',
					type: 'address',
				},
			],
			Message: [{ name: 'data', type: 'string' }],
		},
		primaryType: 'Message',
		domain: {
			name: 'example.metamask.io',
			version: '1',
			chainId: '1',
			verifyingContract: '0x0000000000000000000000000000000000000000',
		},
		message: { data: 'Hello!' },
	}
	return Buffer.from(JSON.stringify(data), 'utf-8')
}

const getTxBytype = (typeName, masterFingerprint) => {
	const typed_data_sign_request = {
		requestId: '6c3633c0-02c0-4313-9cd7-e25f4f296729',
		signData: typedData(),
		dataType: KeystoneEthereumSDK.DataType.typedData,
		path: "m/44'/60'/0'/0/0",
		xfp: masterFingerprint,
		chainId: 1,
		origin: 'THORWallet',
	}

	const eip1559_transfer_sign_request = {
		requestId: '6c3633c0-02c0-4313-9cd7-e25f4f296729',
		signData: eip1559Transaction(),
		dataType: KeystoneEthereumSDK.DataType.typedTransaction,
		path: "m/44'/60'/0'/0/0",
		xfp: masterFingerprint,
		origin: 'THORWallet',
	}

	const legacy_tansfer_sign_request = {
		requestId: '6c3633c0-02c0-4313-9cd7-e25f4f296729',
		signData: legacyTransaction(),
		dataType: KeystoneEthereumSDK.DataType.transaction,
		path: "m/44'/60'/0'/0/0",
		xfp: masterFingerprint,
		chainId: 1,
		origin: 'THORWallet',
	}

	const personal_sign_request = {
		requestId: '6c3633c0-02c0-4313-9cd7-e25f4f296729',
		signData: personalMessage(),
		dataType: KeystoneEthereumSDK.DataType.personalMessage,
		path: "m/44'/60'/0'/0/0",
		xfp: masterFingerprint,
		chainId: 1,
		origin: 'THORWallet',
	}

	switch (typeName) {
		case 'typedData':
			return typed_data_sign_request
		case 'eip1559':
			return eip1559_transfer_sign_request
		case 'legacy':
			return legacy_tansfer_sign_request
		case 'personal':
			return personal_sign_request
		default:
			return typed_data_sign_request
	}
}

const qrCodeComponent = (
	isScanning,
	ur,
	onSucceed,
	onError,
	setIsScanning,
	signature
) => {
	return isScanning ? (
		<AnimatedQRScanner
			handleScan={onSucceed}
			handleError={onError}
			urTypes={[URType.EthSignature]}
			options={{
				width: 400,
				height: 300,
			}}
		/>
	) : (
		<>
			<AnimatedQRCode
				type={ur.type}
				cbor={ur.cbor.toString('hex')}
				options={{
					capacity: 200,
					interval: 300,
				}}
			/>
			<button
				onClick={() => {
					setIsScanning(true)
				}}
			>
				Scan Keystone
			</button>

			<p>signature: </p>
			<p>{JSON.stringify(signature)}</p>
		</>
	)
}

export const Ethereum = () => {
	const [isScanning, setIsScanning] = useState(false)
	const [signature, setSignature] = useState('')
	const [type, setType] = useState('typedData')
	const types = ['typedData', 'eip1559', 'legacy', 'personal']

	const [masterFingerprint, setMasterFingerprint] = useState('d5950b24')

	const ethSignRequest = getTxBytype(type, masterFingerprint)

	const keystoneSDK = new KeystoneSDK()

	const ur = keystoneSDK.eth.generateSignRequest(ethSignRequest)

	const onSucceed = ({ type, cbor }) => {
		// console.log("type: ", type);
		const signature = keystoneSDK.eth.parseSignature(
			new UR(Buffer.from(cbor, 'hex'), type)
		)
		console.log('signature: ', signature)
		setSignature(signature)
		setIsScanning(false)
	}

	// input master fainger print component
	const inputMasterFingerprint = () => {
		return (
			<div>
				<label>Set your Master Fingerprint: </label>
				<input
					type="text"
					value={masterFingerprint}
					onChange={(e) => {
						setMasterFingerprint(e.target.value.trim())
					}}
				/>
			</div>
		)
	}

	const onError = (errorMessage) => {
		console.log('error: ', errorMessage)
		setIsScanning(false)
	}

	return (
		<>
			{inputMasterFingerprint()}
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<label style={{ marginRight: '1em' }}>
					{' '}
					Select the type of transaction to sign{' '}
				</label>
				<select
					value={type}
					onChange={(e) => {
						setType(e.target.value)
					}}
				>
					{types.map((t) => (
						<option key={t} value={t}>
							{t}
						</option>
					))}
				</select>
			</div>

			{qrCodeComponent(
				isScanning,
				ur,
				onSucceed,
				onError,
				setIsScanning,
				signature
			)}
		</>
	)
}
