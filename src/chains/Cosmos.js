import { useState } from 'react'
import KeystoneSDK, {
	KeystoneCosmosSDK,
	URType,
	UR,
} from '@keystonehq/keystone-sdk'
import { AnimatedQRCode, AnimatedQRScanner } from '@keystonehq/animated-qr'

export const Cosmos = () => {
	const [isScanning, setIsScanning] = useState(false)
	const [signature, setSignature] = useState('')
	let cosmosSignRequest = {
		requestId: '7AFD5E09-9267-43FB-A02E-08C4A09417EC',
		signData:
			'7B226163636F756E745F6E756D626572223A22323930353536222C22636861696E5F6964223A226F736D6F2D746573742D34222C22666565223A7B22616D6F756E74223A5B7B22616D6F756E74223A2231303032222C2264656E6F6D223A22756F736D6F227D5D2C22676173223A22313030313936227D2C226D656D6F223A22222C226D736773223A5B7B2274797065223A22636F736D6F732D73646B2F4D736753656E64222C2276616C7565223A7B22616D6F756E74223A5B7B22616D6F756E74223A223132303030303030222C2264656E6F6D223A22756F736D6F227D5D2C2266726F6D5F61646472657373223A226F736D6F31667334396A7867797A30306C78363436336534767A767838353667756C64756C6A7A6174366D222C22746F5F61646472657373223A226F736D6F31667334396A7867797A30306C78363436336534767A767838353667756C64756C6A7A6174366D227D7D5D2C2273657175656E6365223A2230227D',
		dataType: KeystoneCosmosSDK.DataType.amino,
		accounts: [
			{
				path: "m/44'/118'/0'/0/0",
				xfp: '1250b6bc',
				address: '4c2a59190413dff36aba8e6ac130c7a691cfb79f',
			},
		],
	}

	const keystoneSDK = new KeystoneSDK()
	const ur = keystoneSDK.cosmos.generateSignRequest(cosmosSignRequest)

	const onSucceed = ({ type, cbor }) => {
		const signature = keystoneSDK.cosmos.parseSignature(
			new UR(Buffer.from(cbor, 'hex'), type)
		)
		console.log('cosmos signature: ', signature)
		setSignature(signature)
		setIsScanning(false)
	}

	const onError = (errorMessage) => {
		console.log('error: ', errorMessage)
		setSignature('cannot decode the signature from the QR code')
		setIsScanning(false)
	}

	return isScanning ? (
		<AnimatedQRScanner
			handleScan={onSucceed}
			handleError={onError}
			urTypes={[URType.CosmosSignature]}
			options={{
				width: 400,
				height: 300,
			}}
		/>
	) : (
		<>
			<AnimatedQRCode type={ur.type} cbor={ur.cbor.toString('hex')} />
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
