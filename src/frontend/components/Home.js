import { useState, useEffect, useRef } from "react";
import nftImg from "./assets/nfteth.jpeg";
import item1 from "./assets/item1.jpeg";
import item2 from "./assets/etheth.jpeg";
import item3 from "./assets/it3.jpeg";
import item4 from "./assets/it4.jpeg";
import logo from "./assets/logo.jpeg";
import additionalItem from "./assets/item1.jpeg";
import additionalItem2 from "./assets/it4.jpeg";
import additionalItem3 from "./assets/it3.jpeg";
import { Button, Nav } from "react-bootstrap";
import { GrInstagram, GrTwitch, GrTwitter } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles/style.css";

const Home = ({ marketplace, nft, account, web3Handler }) => {
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const [items, setItems] = useState([]);
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    setLoading(false);
    setItems(items);
  };

  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    loadMarketplaceItems();
  };
  useEffect(() => {
    const section = sectionRef.current;
    section.classList.add("fade-in");
  }, []);
  useEffect(() => {
    loadMarketplaceItems();
  }, []);
  return (
    <>
      <section ref={sectionRef} className="py-6" id="null">
        <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
          <div className=" mx-auto mt-10 grid grid-cols-1 pt-10 max-w-2xl lg:max-w-full lg:mx-0 md:grid-cols-2 gap-x-8 gap-y-16 sm:mt-16 space-x-4 ">
            <div className="md:order-1 sm:px-4">
              <div className="text-left md:text-left">
                <p className="text-3xl text-white leading-relaxed sm:text-left">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-400">
                    Data{" "}
                  </span>
                  is your inexhaustible asset
                </p>
                <p className="text-sm md:text-lg text-gray-600 mb-4">
                  Confirm data to trade, earn, and win crypto assets in a
                  decentralized privacy-preserving network
                </p>
                <div className="bg-blue-500 hover:scale-110 hover:transition-transform font-bold bg-gradient-to-r from-blue-700 to-green-400 text-white py-2 h-11 text-center w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-4 rounded cursor-pointer hover:bg-blue-600">
                  <div>
                    {account ? (
                      <a
                        href={`https://etherscan.io/address/${account}`}
                        target="_blank"
                      >
                        <p className="text-white">Connected</p>
                      </a>
                    ) : (
                      <Button onClick={web3Handler} variant="outline-light">
                        Connect Wallet
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 text-left">
                <h3 className="text-2xl text-white font-bold mb-4">
                  Why Choose Our NFT Marketplace?
                </h3>
                <ul className="text-gray-400">
                  <li className="flex items-center mb-2">
                    <span className="mr-2">&#10003;</span> Decentralized and
                    Secure Transactions
                  </li>
                  <li className="flex items-center mb-2">
                    <span className="mr-2">&#10003;</span> Wide Range of NFT
                    Options to Explore
                  </li>
                  <li className="flex items-center mb-2">
                    <span className="mr-2">&#10003;</span> Earn Rewards for
                    Trading Your NFTs
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:order-2 lg:w-full lg:h-2/3 sm:w-1/2  sm:mx-auto">
              <img
                src={nftImg}
                alt="about"
                className="object-cover w-full h-full rounded-md shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="my-9">
        <div className="relative px-8 rounded-lg shadow-lg">
          <div className="max-w-2xl mx-auto fade-in-section">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Create your NFT List Which makes your data Worth
            </h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex flex-col items-center justify-center">
              <div className="bg-none border-3 border-blue-700 text-white py-2 w-full md:w-2/3 lg:w-1/2 px-6 rounded-none cursor-pointer hover:bg-blue-700">
                <Nav.Link
                  as={Link}
                  to="/create"
                  className="text-center text-white"
                >
                  Create your NFT
                </Nav.Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        <div className="bg-none border-3 border-gray-500 p-4 rounded-md relative hover:scale-105 hover:transition-transform cursor-pointer">
          <img src={item1} alt="item1" />
          <p className=" text-gray-300  tracking-wide">
            Total supply <br />
            <span className="font-semibold text-white text-xl tracking-wide">
              255,080,266
            </span>
          </p>
        </div>
        <div className="bg-none border-3 border-gray-500 p-4 rounded-md hover:scale-105 hover:transition-transform cursor-pointer">
          <img src={item2} alt="item2" />
          <p className="text-gray-300">
            Market Cap <br />
            <span className="font-semibold text-white text-xl tracking-wide">
              332,372,544
            </span>
          </p>
        </div>
        <div className="bg-none border-3 border-gray-500 p-4 rounded-md hover:scale-105 hover:transition-transform cursor-pointer">
          <img src={item3} alt="item3" />

          <p className="text-gray-300">
            TVL <br />
            <span className="font-semibold text-white text-xl tracking-wide">
              $4.20b
            </span>
          </p>
        </div>
        <div className="bg-none border-3 border-gray-500 p-4 rounded-md hover:scale-105 hover:transition-transform cursor-pointer">
          <img src={item4} alt="item4" />
          <p className="text-gray-300">
            Price <br />
            <span className="font-semibold text-white text-xl tracking-wide">
              $2.52m
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        <div className="bg-none border-3 border-gray-500 p-4 rounded-md cursor-pointer">
          <img src={additionalItem} alt="additionalItem" />
          <p className="text-gray-300">
            Exclusive Collections <br />
            <span className="font-semibold text-white text-xl tracking-wide">
              Discover limited edition NFT collections.
            </span>
          </p>
        </div>

        <div className="bg-none border-3 border-gray-500 p-4 rounded-md cursor-pointer">
          <img src={additionalItem2} alt="additionalItem2" />
          <p className="text-gray-300">
            Community Engagement <br />
            <span className="font-semibold text-white text-xl tracking-wide">
              Connect with other NFT enthusiasts and creators.
            </span>
          </p>
        </div>

        <div className="bg-none border-3 border-gray-500 p-4 rounded-md cursor-pointer">
          <img src={additionalItem3} alt="additionalItem3" />
          <p className="text-gray-300">
            Governance Features <br />
            <span className="font-semibold text-white text-xl tracking-wide">
              Participate in platform decisions with governance.
            </span>
          </p>
        </div>
      </div>

      <div className="bg-none text-white p-4 flex flex-row justify-between items-center">
        <div className="flex-shrink-0">
          <img src={logo} className="w-20 h-20 rounded-full" alt="logo" />
        </div>

        <div className=" flex flex-row space-x-4">
          <Nav.Link
            as={Link}
            to="/"
            className=" hover:text-white text-white  hover:scale-110"
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/"
            href="about"
            className=" hover:text-white text-white  hover:scale-110"
          >
            About
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/"
            href="help"
            className=" hover:text-white text-white  hover:scale-110"
          >
            Help
          </Nav.Link>
        </div>
        <div className="flex flex-row space-x-4 ">
          <a href="#" className="text-xl hover:text-white hover:scale-110">
            <GrTwitter />
          </a>
          <a href="#" className="text-xl hover:text-white hover:scale-110">
            <FaFacebook />
          </a>
          <a href="#" className="text-xl hover:text-white hover:scale-110">
            <GrInstagram />
          </a>
        </div>
      </div>
    </>
  );
};
export default Home;
