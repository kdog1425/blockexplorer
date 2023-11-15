import React, { useMemo } from 'react';
import ObjectTable from './ObjectTable';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';

const fetchData = async (alchemy, txId) => {
  // Replace the URL with your actual API endpoint
  const response = await alchemy.core.getTransaction(txId);
  if (!response) {
    throw new Error('Network response was not ok');
  }
  return response;
};

const TxDetails = ({ alchemy }) => {

  // Access the hex parameter from the route
  const {txId} = useParams();
  
  // Use the useQuery hook to fetch data
  const queryKey = useMemo(() => ['txId', txId], [txId]);
  console.log({txId})
  const { data: txDetails, isLoading, isError } = useQuery(queryKey, () => fetchData(alchemy, txId));

  if (isLoading) {
    return <div style={Loading}>Loading...</div>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }
  return (
    <>
       <nav style={Nav}>  
        <Link to="/" style={LinkStyle}>Back to Block Explorer</Link>
      </nav>
      <div style={TxId}>Transaction ID: {txId}</div>
      <ObjectTable data={txDetails} />
    </>
  );
};


const TxId = {
  background: '#282c34', // Dark background similar to many terminals
  color: '#61dafb', // Contrasting text color
  fontSize: '1.5em',
  padding: 20,
  textAlign: 'center',
}

const Nav = {
  background: '#282c34', // Dark background similar to many terminals
  fontSize: '1em',
  padding: 20,
  textAlign: 'right',
}

const Loading = {
  background: '#282c34', // Dark background similar to many terminals
  color: 'white',
  height: '2000px',
}

const LinkStyle = {
  color: 'white'
}


export default TxDetails;