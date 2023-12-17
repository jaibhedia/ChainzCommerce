import { Button } from "react-bootstrap";

const Connect = ({ onConnect }) => {
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #231942  0%, #003049 100%)",
        color: "#fff",
      }}
    >
      <div className="text-center relative">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Your NFT Marketplace!
        </h1>
        <p className="text-gray-400 mb-4">
          Connect your Ethereum wallet to get started.
        </p>
        <div className="py-4">
          <Button onClick={onConnect} variant="outline-light">
            Connect Wallet
          </Button>
          <p className="mt-2">
            Don't have a wallet?{" "}
            <a
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Create one here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Connect;
