import KeystoneSDK, { UR, URType } from '@keystonehq/keystone-sdk'
import { AnimatedQRScanner } from '@keystonehq/animated-qr'
import { useState } from 'react'

export const HDKey = () => {
	const [accounts, setAccounts] = useState([])
	const [isScanning, setIsScanning] = useState(false)
	const onSucceed = ({ type, cbor }) => {
		const account = new KeystoneSDK().parseHDKey(
			new UR(Buffer.from(cbor, 'hex'), type)
		)
		console.log('account: ', account)
		setIsScanning(false)
		setAccounts([account])

		// save to the local file
		const element = document.createElement('a')
		const file = new Blob([JSON.stringify(account, undefined, 2)], {
			type: 'text/plain',
		})
		element.href = URL.createObjectURL(file)
		element.download = 'accounts.txt'
		document.body.appendChild(element)
		element.click()
	}
	const onError = (errorMessage) => {
		console.log('error: ', errorMessage)
		alert('error: ', errorMessage)
		setIsScanning(false)
	}

	return (
		<>
			<p> Scan static qrcode to get AccountInfo </p>
			<p> eg: click MetaMask and scan the qrcode </p>
			{isScanning ? (
				<AnimatedQRScanner
					handleScan={onSucceed}
					handleError={onError}
					urTypes={[URType.CryptoHDKey]}
				/>
			) : (
				<button
					onClick={() => {
						setIsScanning(true)
					}}
				>
					Scan Keystone
				</button>
			)}

			{/* list all accounts */}
			{accounts.map((account, index) => (
				<div key={index}>
					<p> Account {index + 1} </p>
					<pre> {JSON.stringify(account, undefined, 2)} </pre>
				</div>
			))}
		</>
	)
}
