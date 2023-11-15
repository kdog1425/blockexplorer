import React from 'react';
import ScrollableList from './ScrollableList';

const ObjectTable = ({ data }) => {
  if (!data){
    return null
  }
  const keys = Object.keys(data);

  return (
    <table style={{margin: '0 auto', width: '100%', borderCollapse: 'collapse', fontFamily: 'Roboto, sans-serif' }}>
      <tbody>
        {keys.map((key, index) => (
          <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
          <td style={tableCellStyle}>{key}</td>
          <td style={tableCellStyle}>{key === 'transactions' ? <ScrollableList items={data[key]}/> : JSON.stringify(data[key])}</td>
        </tr>
        ))}
      </tbody>
    </table>
  );
};


  
  const evenRowStyle = {
    background: '#353b45', // Slightly lighter than the header background
  };
  
  const oddRowStyle = {
    background: '#2f3640', // Slightly darker than the header background
  };
  
  const tableCellStyle = {
    padding: '20px',
    border: '1px solid #444', // Dark border for cells,
    color: '#61dafb',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.2em',
    maxWidth: 1000,
    wordWrap: 'break-word',
    
  };
  

export default ObjectTable;