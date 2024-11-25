import { useState, useEffect } from "react";
import { ethers } from "ethers";
import bigBrother_abi from "../artifacts/contracts/BigBrotherVoting.sol/BigBrotherVoting.json";

export default function HomePage() {
  // State variables to manage wallet, account, contract, and voting data
  const [ethWallet, setEthWallet] = useState(undefined); 
  const [account, setAccount] = useState(undefined); 
  const [bigBrother, setBigBrother] = useState(undefined); 
  const [hasVoted, setHasVoted] = useState(false); 
  const [contestantVotes, setContestantVotes] = useState([0, 0, 0]); 

  // Hardcoded contestants for display
  const contestants = [
    { name: "Fyang", likes: 0 },
    { name: "Alyssa", likes: 0 },
    { name: "Hong Lao Shi", likes: 0 }
  ];

  // Ethereum contract details
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Address of the deployed contract
  const bigBrotherABI = bigBrother_abi.abi; // Contract ABI

  // Initialize the wallet by checking if Ethereum is available in the browser
  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum); // Sets MetaMask as the Ethereum wallet
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account); // Updates state with the fetched account
    }
  };

  // Fetch the latest vote counts from the contract
  const updateVotes = async () => {
    if (bigBrother) {
      try {
        const contestantList = await bigBrother.getContestants(); 
        const votes = contestantList.map(contestant => contestant.likes.toNumber()); 
        setContestantVotes(votes); 
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    }
  };

  // Updates the account state and logs the connected account
  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  // Connects the user's MetaMask account
  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" }); 
    handleAccount(accounts); 
    getBigBrotherContract(); 
  };

  // Initializes the smart contract instance
  const getBigBrotherContract = () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethWallet); 
      const signer = provider.getSigner(); 
      const bigBrotherContract = new ethers.Contract(contractAddress, bigBrotherABI, signer); 
      setBigBrother(bigBrotherContract); 
    } catch (error) {
      console.error("Error initializing contract:", error);
    }
  };

  // Sends a vote for a contestant to the smart contract
  const likeContestant = async (contestantId) => {
    if (bigBrother) {
      try {
        let tx = await bigBrother.likeContestant(contestantId); // Calls the contract function to like a contestant
        await tx.wait(); // Waits for the transaction to be mined
        await updateVotes(); // Refreshes vote counts after the transaction
        alert("Vote successful!");
      } catch (error) {
        console.error("Error liking contestant:", error);
        alert("Error: " + error.message);
      }
    }
  };

  // Runs once on component mount to initialize the wallet
  useEffect(() => {
    getWallet();
  }, []);

  // Updates vote counts whenever the contract instance changes
  useEffect(() => {
    if (bigBrother) {
      updateVotes();
    }
  }, [bigBrother]);

  // Displays appropriate UI based on user connection and vote states
  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this app.</p>; // Prompts user to install MetaMask
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>; // Button to connect wallet
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <div className="contestants">
          {contestants.map((contestant, index) => (
            <div key={index} className="contestant-card">
              <h3>{contestant.name}</h3>
              <p className="vote-count">Total Votes: {contestantVotes[index]}</p>
              <button
                onClick={() => likeContestant(index)} // Voting button for each contestant
                className="like-button"
              >
                ❤️ Vote for {contestant.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Main UI structure
  return (
    <main className="container">
      <header>
        <h1>Big Brother Voting</h1>
        <p>Vote for your favorite contestant!</p>
      </header>
      {initUser()} {/* Renders user interaction UI */}
      {/* CSS styles for the UI */}
      <style jsx>{`
        .container {
          text-align: center;
          padding: 20px;
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
        }
        header {
          margin-bottom: 40px;
        }
        .contestants {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .contestant-card {
          border: 2px solid #ff4b6e;
          padding: 20px;
          border-radius: 12px;
          background-color: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        .contestant-card:hover {
          transform: translateY(-5px);
        }
        .contestant-card h3 {
          color: #333;
          margin-bottom: 15px;
          font-size: 1.5em;
        }
        .vote-count {
          font-size: 1.2em;
          font-weight: bold;
          color: #ff4b6e;
          margin: 10px 0;
        }
        .like-button {
          background-color: #ff4b6e;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1.1em;
          transition: all 0.3s;
        }
        .like-button:hover {
          background-color: #ff2d55;
          transform: scale(1.05);
        }
        .like-button:active {
          transform: scale(0.95);
        }
      `}</style>
    </main>
  );
}
