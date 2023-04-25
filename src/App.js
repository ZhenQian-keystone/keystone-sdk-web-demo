import './App.css';
import {Bitcoin} from "./chains/Bitcoin";
import {Ethereum} from "./chains/Ethereum";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Ethereum />
      </header>
    </div>
  );
}

export default App;
