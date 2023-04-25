import './App.css';
import {Bitcoin} from "./chains/Bitcoin";
import {Ethereum} from "./chains/Ethereum";
import {MultiAccounts} from "./wallet/MultiAccounts";
import {Solana} from "./chains/Solana";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<Ethereum />*/}
        {/*  <Bitcoin />*/}
        {/*  <MultiAccounts />*/}
          <Solana />
      </header>
    </div>
  );
}

export default App;
