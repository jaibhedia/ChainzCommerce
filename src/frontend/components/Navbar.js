import { Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import logo from "./assets/logo.jpeg";

const Navigation = ({ web3Handler, account }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
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
      className={`fixed top-0 left-0 right-0 py-4 w-full z-50 ${
        hasBackground ? "bg-gray-900" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img src={logo} className="w-20 h-20 rounded-full" alt="logo" />
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
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

              <div className="md:ml-4">
                {account ? (
                  <a
                    href={`https://etherscan.io/address/${account}`}
                    target="_blank"
                    className="button nav-button btn-sm"
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
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-white"
            >
              {isOpen ? (
                <MdClose className="w-6 h-6  opacity-0" />
              ) : (
                <MdMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-80 md:hidden">
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-white">
              <MdClose className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col items-start space-y-4 p-4">
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

            <div className="md:ml-4">
              {account ? (
                <a
                  href={`https://etherscan.io/address/${account}`}
                  target="_blank"
                  className="button nav-button btn-sm"
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
        </div>
      )}
    </nav>
  );
};

export default Navigation;
