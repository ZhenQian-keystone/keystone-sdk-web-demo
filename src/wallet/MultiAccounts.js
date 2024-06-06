import KeystoneSDK, { UR, URType } from '@keystonehq/keystone-sdk'
import { AnimatedQRScanner } from '@keystonehq/animated-qr'
import { useState } from 'react'
import { Progress } from 'antd'
export const MultiAccounts = () => {
	const [accounts, setAccounts] = useState([])
	const [isScanning, setIsScanning] = useState(false)
	const [progress, setProgress] = useState(0)
	const onSucceed = ({ type, cbor }) => {
		const multiAccounts = new KeystoneSDK().parseMultiAccounts(
			new UR(Buffer.from(cbor, 'hex'), type)
		)
		console.log('multiAccounts: ', multiAccounts)
		setAccounts(multiAccounts)
		setIsScanning(false)

		// save to the local file
		const element = document.createElement('a')
		const file = new Blob([JSON.stringify(multiAccounts, undefined, 2)], {
			type: 'text/plain',
		})
		element.href = URL.createObjectURL(file)
		element.download = 'multiAccounts.txt'
		document.body.appendChild(element)
		element.click()

		// reset the progress
		setProgress(0)
	}
	const onError = (errorMessage) => {
		console.log('error: ', errorMessage)
		alert('error: ', errorMessage)
		setIsScanning(false)

		// reset the progress
		setProgress(0)
	}

	const onCameraStatus = (isCameraReady, error) => {
		if (!isCameraReady) {
			if (error === 'NO_WEBCAM_FOUND') {
				console.log('No camera')
			} else if (error === 'NO_WEBCAM_ACCESS') {
				console.log('No camera permission')
			}
		} else {
			console.log('Camera ready')
		}
	}

	const onProgress = (progress) => {
		console.log('scan progress: ', progress)
		setProgress(progress)
	}

	return (
		<>
			<p> Scan dynamic qrcodes to get multi AccountInfos </p>
			{progress > 0 && isScanning && (
				<Progress
					percent={progress >= 100 ? 100 : progress}
					showInfo={false}
					size="default"
					strokeColor="#00FF00"
				/>
			)}
			{isScanning ? (
				<AnimatedQRScanner
					handleScan={onSucceed}
					handleError={onError}
					urTypes={[URType.CryptoMultiAccounts]}
					onProgress={onProgress}
					videoLoaded={onCameraStatus}
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

			<pre> {JSON.stringify(accounts, undefined, 2)} </pre>
		</>
	)
}
