import { Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const Navigation = ({ web3Handler, account }) => {
  const [hasBackground, setHasBackground] = useState(false);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const minScrollToShowBackground = 50;
    setHasBackground(scrollY > minScrollToShowBackground);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={` fixed top-0 left-0 right-0 py-4 w-full z-50 ${
        hasBackground ? "bg-gray-900" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4 cursor-pointer">
            <span className="text-white text-xl font-bold">
              NFT Marketplace
            </span>
          </div>
          <Nav.Link
            className="text-white hover:scale-110  hover:bg-black/50 hover:rounded-none"
            as={Link}
            to="/"
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            className="text-white hover:scale-110  hover:bg-black/50 hover:rounded-none"
            to="/create"
          >
            Create Your NFT
          </Nav.Link>
          <Nav.Link
            as={Link}
            className="text-white hover:scale-110  hover:bg-black/50 hover:rounded-none"
            to="/my-listed-items"
          >
            Your Listed NFTs
          </Nav.Link>
          <Nav.Link
            as={Link}
            className="text-white hover:scale-110  hover:bg-black/50 hover:rounded-none"
            to="/my-purchases"
          >
            Your Purchased NFTs
          </Nav.Link>
        </div>
        <div>
          {account ? (
            <a
              href={`https://etherscan.io/address/${account}`}
              target="_blank"
              className="button nav-button btn-sm mx-4"
            >
              <Button variant="outline-light" disabled>
                Connected
              </Button>
            </a>
          ) : (
            <Button onClick={web3Handler} variant="outline-light">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
