import React, { useState } from 'react';
import MetaMaskSDK from "@metamask/sdk";

const MetaMask = () => {
  const [account, setAccount] = useState(null);

  const connectMetaMask = async () => {
    try {
      const MMSDK = new MetaMaskSDK({
        dappMetadata: {
          name: "Coba deh",
          url: window.location.href,
        },
        infuraAPIKey: import.meta.env.VITE_INFURA_API_KEY,
      });

      let ethereum = MMSDK.getProvider();

      if (!ethereum) {
        alert('MetaMask is not available. Please install MetaMask.');
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts", params: [] });
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      alert('Failed to connect to MetaMask');
    }
    console.log('MMSDK initialized:', MMSDK);
console.log('Ethereum provider:', ethereum);

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
