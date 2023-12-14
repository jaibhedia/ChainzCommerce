import axios from "axios";
import { useState } from "react";
import { ethers } from "ethers";
import { Row, Form, Button } from "react-bootstrap";
// import { create as ipfsHttpClient } from 'ipfs-http-client'
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Create = ({ marketplace, nft }) => {
  const [fileImg, setFile] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // const uploadToIPFS = async (event) => {
  //   event.preventDefault()
  //   const file = event.target.files[0]
  //   if (typeof file !== 'undefined') {
  //     try {
  //       const result = await client.add(file)
  //       console.log(result)
  //       setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
  //     } catch (error){
  //       console.log("ipfs image upload error: ", error)
  //     }
  //   }
  // }

  ////////////////////////////////////////////////////////

  const sendJSONtoIPFS = async (ImgHash) => {
    try {
      const resJSON = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: {
          name: name,
          description: desc,
          image: ImgHash,
        },
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
        },
      });

      // https://gateway.pinata.cloud/ipfs/QmZ6iZAhazHyakzynC4sxZ6r6cikJmS69mZaCoyburKuq

      const tokenURI = `https://gateway.pinata.cloud/ipfs/${resJSON.data.IpfsHash}`;
      console.log("Token URI", tokenURI);
      //mintNFT(tokenURI, currentAccount)   // pass the winner
      mintThenList(tokenURI);
    } catch (error) {
      console.log("JSON to IPFS: ");
      console.log(error);
    }
  };

  ////////////////////////////////////////////////////////

  const sendFileToIPFS = async (e) => {
    e.preventDefault();
    console.log("123");
    console.log(e);

    if (fileImg) {
      try {
        console.log("1234");
        const formData = new FormData();
        formData.append("file", fileImg);
        console.log(formData);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        sendJSONtoIPFS(ImgHash);
      } catch (error) {
        console.log("File to IPFS: ");
        console.log(error);
      }
    }
  };

  ////////////////////////////////////////////////////////
  // const createNFT = async () => {
  //   if (!image || !price || !name || !description) return
  //   try{
  //     sendJSONtoIPFS(image)
  //     // const result = await client.add(JSON.stringify({image, price, name, description}))
  //     // mintThenList(result)
  //   } catch(error) {
  //     console.log("ipfs uri upload error: ", error)
  //   }
  // }
  const mintThenList = async (uri) => {
    // const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    // mint nft
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
  };
  return (
    <div className="container mx-auto mt-20 min-h-screen relative">
      <main className="max-w-2xl mx-auto bg-none border-3 border-gray-500 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-white">Create Your NFT</h1>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-white text-lg">Upload NFT File</label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              className="form-input-lg mt-2 text-white border border-gray-300 p-2 w-full rounded-md"
              required
              type="file"
              name="file"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-left text-lg">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="form-input-lg mt-2 border border-gray-300 p-2 w-full rounded-md"
              required
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-white text-lg">
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="form-input-lg mt-2 border border-gray-300 p-2 w-full rounded-md"
              required
              placeholder="Description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-left text-white text-lg">
              Price in ETH
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              className="form-input-lg mt-2 border border-gray-300 p-2 w-full rounded-md"
              required
              type="number"
              placeholder="Price in ETH"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={sendFileToIPFS}
              className="bg-none border-3 border-blue-600 text-white py-3 px-8 rounded-none hover:bg-blue-600 transition duration-300"
            >
              Create & List Your NFT!
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
