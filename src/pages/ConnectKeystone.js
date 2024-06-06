import React, { useContext } from 'react'
import './ConnectKeystone.css'
import { MultiAccounts } from '../wallet/MultiAccounts'
import { WalletContext } from '../context/WalletContext'
import { StepContext } from '../context/StepContext'
import Confetti from '../components/Confetti'
const ConnectKeystone = () => {
	const { scanResult, setScanResult } = useContext(WalletContext)
	const { currentStep, setCurrentStep } = useContext(StepContext)
	// 扫码完成后的回调函数
	const handleScanSuccess = (result) => {
		console.log('result: ', result)
		setScanResult(result)
	}

	return (
		<div className="connect-wallet-container">
			<Confetti />
			<h1 className="connect-wallet-title">Connect Keystone Wallet</h1>
			<div className="connect-wallet-content">
				<p className="connect-wallet-description">
					Please connect Keystone wallet to access the application.
				</p>

				{!scanResult && (
					<div className="multi-accounts-container">
						<MultiAccounts onScanSuccess={handleScanSuccess} />
					</div>
				)}

				{scanResult && (
					<>
						<div className="scan-result">
							<h3>Scan Result:</h3>
							<p>
								Master Fingerprint:{' '}
								{scanResult.masterFingerprint}
							</p>
						</div>
					</>
				)}
				{scanResult && (
					<button
						className="next-page-button"
						onClick={() => setCurrentStep('sign-tx')}
					>
						Next Page
					</button>
				)}
			</div>
		</div>
	)
}

export default ConnectKeystone
