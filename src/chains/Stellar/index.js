import KeystoneSDK, {
	KeystoneStellarSDK,
	UR,
	URType,
} from '@keystonehq/keystone-sdk'
import { AnimatedQRCode, AnimatedQRScanner } from '@keystonehq/animated-qr'

let stellarTransaction = {
	requestId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
	signData:
		'7ac33997544e3175d266bd022439b22cdb16508c01163f26e5cb2a3e1045a979000000020000000096e8c54780e871fabf106cb5b047149e72b04aa5e069a158b2d0e7a68ab50d4f00002710031494870000000a00000001000000000000000000000000664ed303000000000000000100000000000000060000000155534443000000003b9911380efe988ba0a8900eb1cfe44f366f7dbe946bed077240f7f624df15c57fffffffffffffff00000000',
	dataType: KeystoneStellarSDK.DataType.Transaction,
	path: "m/44'/148'/0'",
	xfp: 'd5950b24',
	origin: 'xbull wallet',
}

let stellarTransactionHash = {
	requestId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
	signData:
		'e3bff0cb003cf867acfd117fb514dfaf7a8dd5dddf6e68cc71f553de5046ae2b',
	dataType: KeystoneStellarSDK.DataType.TransactionHash,
	path: "m/44'/148'/0'",
	xfp: 'd5950b24',
	origin: 'xbull wallet',
}

export const Stellar = () => {
	const keystoneSDK = new KeystoneSDK()
	const ur = keystoneSDK.stellar.generateSignRequest(stellarTransaction)
	// const ur = keystoneSDK.stellar.generateSignRequest(stellarTransactionHash);

	return (
		<>
			<AnimatedQRCode
				type={ur.type}
				cbor={ur.cbor.toString('hex')}
				options={{
					capacity: 200,
				}}
			/>
			<StellarScanner />
		</>
	)
}

export const StellarScanner = () => {
	const keystoneSDK = new KeystoneSDK()

	const onSucceed = (ur) => {
		const { cbor } = ur
		ur.cbor = Buffer.from(cbor, 'hex')
		const signatureResponse = keystoneSDK.stellar.parseSignature(ur)
		console.log(
			'signatureResponse: ',
			signatureResponse.requestId,
			signatureResponse.signature
		)
	}
	const onError = (errorMessage) => {
		console.log('error: ', errorMessage)
	}

	return (
		<AnimatedQRScanner
			options={{ width: 100 }}
			handleScan={onSucceed}
			handleError={onError}
			urTypes={[URType.StellarSignature]}
		/>
	)
}
