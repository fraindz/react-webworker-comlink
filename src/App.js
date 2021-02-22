import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Worker from './worker';
import { processData } from './processData';

// Create new instance
const instance = new Worker();

function App() {
  const [processingStatus, setProcessingStatus] = useState(false);
  const [itemSize, setItemSize] = useState(0);
  const [count, setCount] = useState(0);

  const onCount = () => {
    setCount(count + 1);
  };

  const onReset = () => {
    setItemSize(0);
    setCount(0);
  };

  const onClickWebWorker = async () => {
    const t0 = performance.now();
    setProcessingStatus(true);

    // Use a web worker to process the itemSize
    const newArrSize = await instance.processDataWithWebWorker(itemSize);

    setItemSize(newArrSize);
    setProcessingStatus(false);
    const t1 = performance.now();
    console.log(`Web worker took ${Math.floor(t1 - t0)} milliseconds.`);
  };

  const onClickMainThread = () => {
    const t0 = performance.now();
    setProcessingStatus(true);

    // Use main thread to process the itemSize
    const newArrSize = processData(itemSize);

    setItemSize(newArrSize);
    setProcessingStatus(false);
    const t1 = performance.now();
    console.log(`Main thread took ${Math.floor(t1 - t0)} milliseconds.`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <main>
        <p>
          Warning: Be careful before clicking "Click to process on main thread"  !
        </p>
        <p>Check console log for profiling details</p>

        <p>
          <button onClick={onCount}>Hit me when processing</button>
          Count: {count}
        </p>
        <div>
          <button onClick={onClickWebWorker} disabled={processingStatus}>
            web worker
          </button>
          <button onClick={onClickMainThread} disabled={processingStatus}>
            main thread
          </button>
        </div>
        <p>Processing status: {processingStatus ? 'PROCESSING' : 'IDLE'}</p>
        <p>Number of items: {itemSize}</p>
        <div>
          <button onClick={onReset} disabled={processingStatus}>
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
