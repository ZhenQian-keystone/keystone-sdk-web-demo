import './App.css';
import {Bitcoin} from "./chains/Bitcoin";
import {Ethereum} from "./chains/Ethereum";
import {MultiAccounts} from "./wallet/MultiAccounts";
import {Solana} from "./chains/Solana";
import {Cosmos} from "./chains/Cosmos";
import {Aptos} from "./chains/Aptos";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<Ethereum />*/}
        {/*  <Bitcoin />*/}
        {/*  <MultiAccounts />*/}
        {/*  <Solana />*/}
        {/*  <Cosmos />*/}
          <Aptos />
      </header>
    </div>
  );
}

export default App;
