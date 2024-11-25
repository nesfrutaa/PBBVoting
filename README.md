# Big Brother Voting DApp

This is a decentralized voting application built on Ethereum, allowing users to vote for their favorite contestants in a secure, transparent, and decentralized manner using MetaMask.

---

## Features

- **Connect MetaMask Wallet**: Allows users to connect their Ethereum wallet.
- **View Contestants**: Displays a list of contestants with their current vote counts.
- **Vote for Contestants**: Users can cast a vote for their favorite contestant, and the results are updated in real-time.
- **Ethereum Smart Contract**: All votes are recorded on the blockchain, ensuring transparency and security.

---

## Getting Started

### Prerequisites

1. [MetaMask](https://metamask.io/) browser extension installed.
2. Node.js and npm installed on your local machine.
3. Ethereum test network setup (e.g., Hardhat, Ganache).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/big-brother-voting-dapp.git
   cd big-brother-voting-dapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Deploy the smart contract to your local or test Ethereum network and update the `contractAddress` in the code.

---

## How It Works

1. **Connect Wallet**: Users are prompted to connect their MetaMask wallet.
2. **Smart Contract Interaction**:
   - Fetch the list of contestants and their vote counts from the blockchain.
   - Submit a transaction to cast a vote for a specific contestant.
3. **Real-Time Updates**: The app listens to blockchain events to update the vote counts dynamically.

---

## Code Overview

### Frontend

- **React**: Manages the UI and user interactions.
- **Ethers.js**: Communicates with the Ethereum blockchain and smart contract.
- **CSS-in-JS**: Styling is embedded directly into the components.

### Smart Contract

- The `BigBrotherVoting` contract handles:
  - Storing contestant data.
  - Recording votes securely.
  - Fetching contestant details.

---

## Directory Structure

```plaintext
.
├── pages/
│   └── index.js          # Main entry point for the application
├── artifacts/            # Compiled smart contract artifacts
│   └── contracts/
│       └── BigBrotherVoting.sol/
├── public/               # Public assets
├── styles/               # Global styles
└── package.json          # Dependency configuration
```

---

## Usage

1. **Start the DApp**: Open [http://localhost:3000](http://localhost:3000) in your browser.
2. **Vote**: Connect your MetaMask wallet and vote for your favorite contestant.

---

## Example Smart Contract Address

- Update the `contractAddress` in the code with the address of your deployed `BigBrotherVoting` contract:
  ```javascript
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
  ```

---

## Dependencies

- **React**: ^18.x
- **Next.js**: ^13.x
- **Ethers.js**: ^6.x

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [MetaMask](https://metamask.io/)
- [Ethers.js](https://docs.ethers.io/)
- [Ethereum](https://ethereum.org/)

--- 

Happy Voting! 🎉
