import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";
import { Signer, ethers } from "ethers";

function MyApp({ Component, pageProps }) {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const contractInitialization = async () => {
    try {
      const sdk = new ThirdwebSDK("mumbai", {
        clientId: "191944953df200a02ddb2ee0aee5eb15",
      });

      const contr = await sdk.getContract(
        "0xF626153200273Bee3f6e82616dc1a11e800fA4DE"
      );
      setContract(contr);
      setLoading(false); // Set loading to false after contract is initialized
    } catch (error) {
      console.error("Error initializing contract:", error);
    }
  };

  useEffect(() => {
    // Check if contract is already initialized, and if not, initialize it.
    if (!contract) {
      contractInitialization();
    }
  }, []);

  if (loading) {
    // You can render a loading indicator here until the contract is initialized
    return (
      <>
        <div className="🤚">
        <h2 className="text-3xl p-9 pt-32 font-extrabold text-orange-600">Loading....</h2>
          <div className="👉"></div>
          <div className="👉"></div>
          <div className="👉"></div>
          <div className="👉"></div>
          <div className="🌴"></div>
          <div className="👍"></div>
        </div>
      </>
    );
  }

  // Render the Component once the contract is initialized
  return (
    <ThirdwebProvider
      activeChain={ChainId.Mumbai}
      clientId="191944953df200a02ddb2ee0aee5eb15"
    >
      <Component {...pageProps} contract={contract} />
    </ThirdwebProvider>
  );
}

export default MyApp;
