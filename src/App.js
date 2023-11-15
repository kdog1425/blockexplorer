import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ObjectTable from './ObjectTable';
import TxDetails from './TxDetails';
import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);
const queryClient = new QueryClient();

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockDetails, setBlockDetails] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getBlockDetails() {
      setBlockDetails(await alchemy.core.getBlock());
    }
    getBlockNumber()
    getBlockDetails()

  }, []);

  return( 
    <QueryClientProvider client={queryClient}>
      <Router>
      <Route path="/" exact render={() => 
         <div className="BlockDetails">
          <div style={BlockNumber}>Block Number: {blockNumber}</div>
          <ObjectTable data={blockDetails}/>
        </div>}
      />    
      <Route path="/tx/:txId" exact render={() =>  
        <div className="TxDetails">
          <TxDetails alchemy={alchemy}/>
        </div>}
      />
      
      </Router>
    </QueryClientProvider>
  )
}

const BlockNumber = {
  background: '#282c34', // Dark background similar to many terminals
  color: '#61dafb', // Contrasting text color
  fontSize: '1.5em',
  padding: 20,
  textAlign: 'center',
}


export default App;
