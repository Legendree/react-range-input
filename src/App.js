import React from 'react';

import './App.css';
import { RangeInput } from './components/RangeInput';

export const App = () => {
  return (
    <div className='App'>
      <div className='some_random_container'>
        <RangeInput />
      </div>
    </div>
  );
};

export default App;
