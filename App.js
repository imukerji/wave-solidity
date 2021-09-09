import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import logo from './Aang.png';
import abi from "./utils/waveportal.json"

export default function App() {

  const [currAccount, setCurrentAccount] = React.useState("")
  const contractAddress = "0x5C4e8B04479203CdD25F68a82204A07929f19786"
  const contractABI = abi.abi

  const checkIfWalletIsConnected = () => {

    //checks if we have access to window.ethereum. When metamask is connected to the browser, there is an object called ethereum in the window, we need to check for that

    const {ethereum} = window;
    if (!ethereum){
      console.log("Make sure you are using metamask!")
      return
    } else {
      console.log("We have the ethereum object", ethereum)
    }
  

  ethereum.request({ method: 'eth_accounts'})
  .then(accounts => {
    if(accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account)
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found")
    }
  
    })
    }

    
    const connectWallet = () => {
      const {ethereum} = window;
      if(!ethereum) {
        alert("Get metamask!")
      }
    
      

      ethereum.request({method: 'eth_requestAccounts'})
      .then(accounts => {
        console.log("Connected", accounts[0])
        setCurrentAccount(accounts[0])
      })
      .catch(err => console.log(err));
    }
 //runs the function when the page loads.
 const wave = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const waverportalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await waverportalContract.getTotalWaves()
        console.log("Retrieved total wave count...", count.toNumber())

        const waveTxn = await waverportalContract.wave()
        console.log("Mining...", waveTxn.hash)
        await waveTxn.wait()
        console.log("Mined --", waveTxn.hash)

        count = await waverportalContract.getTotalWaves()
        console.log("Retrieved total wave count...", count.toNumber())
 }

 React.useEffect(() => {
   checkIfWalletIsConnected()

 }, [])
  
 

  return (


  
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey Hey!
        </div>

    <div className="photo"> 
    <img src={logo}  alt="logo" />;
    </div>
  

        <div className="bio">
        Ishika here! I'm currently diving into the world of web3 and film! Now that you are here, I'd love to connect with you! Wave at me by connecting your ethereum wallet!
        </div>

        {currAccount ? null : (
        <button className= "waveButtonTwo" onClick={connectWallet}>
        🤝 Connect Wallet
        </button>
        )}

        <button className="waveButton" onClick={wave}>
          👋  Wave at Me
        </button>


    <button className="about" type="button"
      onClick={(e) => {
      e.preventDefault();
      window.location.href='https://ishikamukerji.notion.site/Hey-I-m-Ishika-77dea9ebcf5f439cac519793e3eac9d0';
      }}> 👀  Learn More About Me</button>
        
        </div>
      </div>
  );
}
