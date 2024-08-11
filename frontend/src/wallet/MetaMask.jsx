import React, { useState, useEffect } from 'react';
import MetaMaskSDK from "@metamask/sdk";

const MetaMask = () => {
  const [account, setAccount] = useState(null);
  const [ethereum, setEthereum] = useState(null);

  useEffect(() => {
    const sdk = new MetaMaskSDK({
      dappMetadata: {
        name: "Coba deh",
        url: window.location.href,
      },
      infuraAPIKey: import.meta.env.VITE_INFURA_API_KEY,
    });

    let eth = sdk.getProvider();

    if (!eth && window.ethereum) {
      console.warn('MetaMaskSDK: Falling back to window.ethereum');
      eth = window.ethereum;
    }

    if (!eth) {
      alert('MetaMask is not available. Please install MetaMask.');
      return;
    }

    setEthereum(eth);
    console.log('MMSDK initialized:', sdk);
    console.log('Ethereum provider:', eth);
  }, []);

  const connectMetaMask = async () => {
    try {
      if (!ethereum) {
        alert('MetaMask is not available. Please install MetaMask.');
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts", params: [] });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Failed to connect to MetaMask:', error);
      alert('Failed to connect to MetaMask');
    }
  };

  return (
    <div>
      <h1>MetaMask SDK Example</h1>
      {!account ? (
        <button onClick={connectMetaMask}>Connect to MetaMask</button>
      ) : (
        <p>Connected account: {account}</p>
      )}
    </div>
  );
};

export default MetaMask;
