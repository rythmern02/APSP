//


import {
  ThirdwebSDK,
  useContract,
  useContractWrite,
  walletConnect,
} from "@thirdweb-dev/react";
import React from "react";
import { useState } from "react";
import { Web3Storage } from "web3.storage";
import Buttonh from "../components/Buttonh";
import { ConnectWallet, useConnectionStatus } from "@thirdweb-dev/react";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDczM0NDMGY1MWE0RmI2MTAzOGU0MmZkMDc2NjU0QTJhZGU5ODFhN0QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTMyMzY0NjA2ODksIm5hbWUiOiJhc3BzIn0.eaDAzQl6fcgDRnZhqtkj-DUM6ZMXeferFhe-X6S5RhU";
const client = new Web3Storage({ token });

const UploadImage = () => {
  const [hash, setHash] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(null);
  const [fileUrl, updateFileUrl] = useState("");
  const { contract } = useContract(
    "0xF626153200273Bee3f6e82616dc1a11e800fA4DE"
  );
  const { mutateAsync: addEvidenceToMapping, isLoading } = useContractWrite(
    contract,
    "addEvidenceToMapping"
  );
  async function handleUpload(e) {
    const file = e.target.files[0];
    setFile(file);
  }
  async function handleTitle(e) {
    const title = e.target.value;
    setTitle(title);
  }
  async function handleDescription(e) {
    const description = e.target.value;
    setDescription(description);
  }

  const connectionStatus = useConnectionStatus();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!connectionStatus === "connected" || !file) {
      alert("Please upload a File");
    } else {
      try {
        const cid = await client.put([file]);
        const url = `https://ipfs.io/ipfs/${cid}/${file.name}`;
        const hash = `${cid}/${file.name}`;
        updateFileUrl(url);
        setHash(hash);
        try {
          const data = await addEvidenceToMapping({
            args: [title, hash, description],
          });
          console.info("contract call successs", data);
        } catch (err) {
          console.error("contract call failure", err);
        }
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
  }
  return (
    <div className="">
      <div className="md:w-1/2 sticky z-5  p-4">
        <Buttonh />
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-xl sm:mt-0 mt-8px w-full bg-gray-700 bg-opacity-70 text-white p-8 rounded-lg">
          <h1 className="text-2xl font-semibold mb-6">Submit Evidence</h1>
          <form className="space-y-4">
            {/* Evidence Title */}
            <div>
              <label className="block text-gray-400">Evidence Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Enter Evidence Title"
                onChange={handleTitle}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-400">Category</label>
              <select className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-400">
                <option>Select Category</option>
                <option>Cyber Attack</option>
                <option>Data Breach</option>
                <option>Malware</option>
                {/* Add more categories */}
              </select>
            </div>

            {/* Evidence Description */}
            <div>
              <label className="block text-gray-400">
                Evidence Description
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-400"
                rows="4"
                placeholder="Enter Evidence Description"
                onChange={handleDescription}
              ></textarea>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-gray-400">File Upload</label>
              <input
                type="file"
                className="text-gray-400 hidden"
                id="fileUpload"
                onChange={handleUpload}
                accept=".jpg, .jpeg, .png, .pdf, .mp4"
              />
              {fileUrl ? (
                <>
                  <p>Hash: {fileUrl}</p>{" "}
                  <img src={fileUrl} alt="Uploaded image" />
                </>
              ) : (
                ""
              )}
              <label
                htmlFor="fileUpload"
                className="bg-gray-800 text-white cursor-pointer w-full px-4 py-2 rounded-md flex items-center justify-between hover:bg-blue-600 transition duration-300"
              >
                {file?.name == null ? (
                  <span>Choose a file...</span>
                ) : (
                  <span> {file.name}</span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-blue-600 text-white w-full px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Submit Evidence
              </button>
            </div>
          </form>
        </div>
        <div className="fixed top-0 right-0 mr-4 mt-4">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
