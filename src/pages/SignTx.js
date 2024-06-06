// SignTx.js
import React, { useContext, useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import { Bitcoin } from '../chains/Bitcoin'
import { Ethereum } from '../chains/Ethereum'
import { Cosmos } from '../chains/Cosmos'
import { WalletContext } from '../context/WalletContext'
const TabPanel = ({ children, value, index }) => {
	return (
		<div hidden={value !== index}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}

const SignTx = () => {
	const [chain, setChain] = useState(0)
	const { scanResult, setScanResult } = useContext(WalletContext)
	const handleChainChange = (event, newValue) => {
		setChain(newValue)
	}

	return (
		<div className="sign-tx-container">
			<h1 className="sign-tx-title">Sign Transaction</h1>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={chain} onChange={handleChainChange}>
					<Tab label="Bitcoin" />
					<Tab label="Ethereum" />
					<Tab label="Cosmos" />
				</Tabs>
			</Box>
			<TabPanel value={chain} index={0}>
				<Bitcoin masterFingerPrint={scanResult.masterFingerprint} />
			</TabPanel>
			<TabPanel value={chain} index={1}>
				<Ethereum masterFingerPrint={scanResult.masterFingerprint} />
			</TabPanel>
			<TabPanel value={chain} index={2}>
				<Cosmos masterFingerPrint={scanResult.masterFingerprint} />
			</TabPanel>
		</div>
	)
}

export default SignTx
