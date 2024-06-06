import './App.css'
import { Bitcoin } from './chains/Bitcoin'
import { Ethereum } from './chains/Ethereum'
import { MultiAccounts } from './wallet/MultiAccounts'
import { Cosmos } from './chains/Cosmos'
import { KeyDerivationCall } from './wallet/KeyDerivationCall'
import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { KeystoneBytes } from './chains/KeystoneBytes'
import { Account } from './wallet/Account'
import { HDKey } from './wallet/HDKey'
import ConnectKeystone from './pages/ConnectKeystone'

import { WalletContext } from './context/WalletContext'
import { StepContext } from './context/StepContext'
import SignTx from './pages/SignTx'

function App() {
	const [scanResult, setScanResult] = useState(null)
	const [currentStep, setCurrentStep] = useState('connect-wallet')
	return (
		<WalletContext.Provider value={{ scanResult, setScanResult }}>
			<StepContext.Provider value={{ currentStep, setCurrentStep }}>
				<div className="App">
					<div className="App">
						{currentStep === 'connect-wallet' && (
							<ConnectKeystone />
						)}
						{currentStep === 'sign-tx' && <SignTx />}
					</div>
				</div>
			</StepContext.Provider>
		</WalletContext.Provider>
	)
}

export default App
