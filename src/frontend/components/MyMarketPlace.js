import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";

export const MyMarketPlace = ({ marketplace, nft, account, web3Handler }) => {
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
    <div className=" mt-16">
      {items.length > 0 ? (
        <div className="px-5 container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <img
                    className="w-full h-48 object-cover mb-4"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="text-secondary">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => buyMarketItem(item)}
                      className="bg-primary text-white py-2 px-4 rounded-lg"
                    >
                      Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main className="p-4 ">
          <h2 className="text-2xl text-white font-semibold">
            No listed assets
          </h2>
        </main>
      )}
    </div>
  );
};
