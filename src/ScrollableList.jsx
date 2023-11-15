import React from 'react';

import { Link } from 'react-router-dom';


const ScrollableList = ({ items }) => {
  return (
    <div style={{ overflowY: 'scroll', height: '300px', border: '1px solid #ccc' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {items.map((txId, index) => (
          <li key={index} style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
            <Link style={{color: 'white'}} to={`/tx/${txId}`}>{txId}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollableList;