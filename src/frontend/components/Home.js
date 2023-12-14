import { useState, useEffect } from "react";
import nftImg from "./assets/nfteth.jpeg";
import item1 from "./assets/item1.jpeg";
import item2 from "./assets/etheth.jpeg";
import item3 from "./assets/it3.jpeg";
import item4 from "./assets/it4.jpeg";
import image from "./assets/img1.jpeg";
import { Button, Nav } from "react-bootstrap";
import { GrInstagram, GrTwitch, GrTwitter } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = ({ marketplace, nft, account, web3Handler }) => {
  const [loading, setLoading] = useState(true);
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
    loadMarketplaceItems();
  }, []);
  return (
    <>
      <div className="px-8 flex justify-center items-center relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:px-8 lg:px-20">
          <div className="flex flex-col justify-center text-left -mt-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl  text-white font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-400">
                Data{" "}
              </span>
              is your
              <br />
              inexhaustible
              <br />
              asset
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Confirm data to trade, earn, and win crypto assets in a
              decentralized privacy-preserving network
            </p>
            <div className="bg-blue-500 hover:scale-110 hover:transition-transform font-bold bg-gradient-to-r from-blue-700 to-green-400 text-white py-2  h-11 text-center w-1/2 px-4 rounded cursor-pointer hover:bg-blue-600">
              <div>
                {account ? (
                  <a
                    href={`https://etherscan.io/address/${account}`}
                    target="_blank"
                  >
                    <p className=" text-white">Connected</p>
                  </a>
                ) : (
                  <Button onClick={web3Handler} variant="outline-light">
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block  h-4/6  mt-14 relative">
            <img
              src={nftImg}
              alt="NFT"
              className="rounded-lg h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
      <div className="relative py-4 -mt-10 px-8 rounded-lg shadow-lg">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Create your NFT List Which makes your data Worth
          </h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex items-center justify-center h-full">
            <div className="bg-none border-3 border-blue-700 text-white py-2 w-2/6 px-6 rounded-none cursor-pointer hover:bg-blue-700">
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

      <div className="relative w-full h-1/2 overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover opacity-60  sm:min-h-screen"
          alt="About"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-left p-1  w-3/4">
            <h1 className="text-4xl  md:text-4xl font-sembold  tracking-wider mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h1>
            <div className="mb-8">
              <p className="text-lg">See your NFTs List</p>
            </div>
            {/* Add your CTA button or link here */}
            <Nav.Link
              as={Link}
              to="/my-listed-items"
              className="bg-none border-3 border-blue-500 w-1/6 font-semibold text-white py-2 px-6 rounded-none hover:bg-blue-500 transition duration-300"
            >
              Explore NFTs
            </Nav.Link>
          </div>
        </div>
      </div>
      <div className="bg-none text-white p-4 flex flex-row justify-between items-center">
        <div className="text-2xl font-bold">NFT Marketplace</div>
        <div className="space-x-4">
          <a href="/" className=" hover:text-white hover:scale-110">
            Home
          </a>
          <a href="about" className=" hover:text-white hover:scale-110">
            About
          </a>
          <a href="help" className=" hover:text-white hover:scale-110">
            Help
          </a>
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
