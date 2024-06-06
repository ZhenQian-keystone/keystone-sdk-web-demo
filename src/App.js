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

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return value === index ? (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box
					flex
					justifyContent={'space-between'}
					width={'300px'}
					height={'300px'}
					mt={6}
				>
					<Box display={'inline-block'}>{children}</Box>
				</Box>
			)}
		</div>
	) : (
		<></>
	)
}

function App() {
	const [chain, setChain] = useState(0)
	const [walletAction, setWalletAction] = useState(0)
	const handleChainChange = (_, newValue) => {
		setChain(newValue)
	}
	const handleWalletActionChange = (_, newValue) => {
		setWalletAction(newValue)
	}

	return (
		<div className="App">
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={chain} onChange={handleChainChange}>
					<Tab label="Bitcoin" />
					<Tab label="Ethereum" />
					<Tab label="Cosmos" />
				</Tabs>
			</Box>
			<TabPanel value={chain} index={0}>
				<Bitcoin />
			</TabPanel>
			<TabPanel value={chain} index={1}>
				<Ethereum />
			</TabPanel>
			<TabPanel value={chain} index={2}>
				<Cosmos />
			</TabPanel>

			{/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={walletAction}
					onChange={handleWalletActionChange}
					aria-label="basic tabs example"
				>
					<Tab label="Key Call" />
					<Tab label="Account" />
					<Tab label="HDKey" />
					<Tab label="MultiAccounts" />
					<Tab label="Keystone" />
				</Tabs>
			</Box>
			<TabPanel value={walletAction} index={0}>
				<KeyDerivationCall />
			</TabPanel>
			<TabPanel value={walletAction} index={1}>
				<Account />
			</TabPanel>
			<TabPanel value={walletAction} index={2}>
				<HDKey />
			</TabPanel>
			<TabPanel value={walletAction} index={3}>
				<MultiAccounts />
			</TabPanel>
			<TabPanel value={chain} index={4}>
				<KeystoneBytes />
			</TabPanel> */}
		</div>
	)
}

export default App
