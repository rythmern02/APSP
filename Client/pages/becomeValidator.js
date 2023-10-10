import { Web3Button } from "@thirdweb-dev/react";
import { ConnectWallet, useAddress, walletConnect } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiUserCheck,
  FiPhone,
  FiGlobe,
  FiInfo,
} from "react-icons/fi";

const ValidatorForm = ({ contract }) => {
  const [formData, setFormData] = useState({
    profilePic: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    bio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePic: file,
    });
  };
  const walletAddress = useAddress();
  console.log(walletAddress);
  // const walletAddress = useAddress();
  if (!walletAddress) {
    return <div>Please connect your wallet to proceed.</div>;
  }
  console.log(typeof walletAddress);
  const address = ethers.utils.getAddress(walletAddress);
  console.log(address);
  console.log(typeof address);

  const submit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-900 text-white p-8">
      <ConnectWallet />
      <h1 className="text-3xl font-semibold mb-4">Become a Validator</h1>
      <form className="space-y-4" onSubmit={submit}>
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <label className="text-gray-400">
            <FiUser size={20} className="mr-2" />
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleFileUpload}
            className="text-gray-400 bg-gray-700 px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Username */}
        <div>
          <label className="text-gray-400">
            <FiUser size={20} className="mr-2" />
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter Username"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="text-gray-400">
            <FiUser size={20} className="mr-2" />
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter First Name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-gray-400">
            <FiUserCheck size={20} className="mr-2" />
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter Last Name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-400">
            <FiMail size={20} className="mr-2" />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter Email"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-gray-400">
            <FiPhone size={20} className="mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter Phone Number"
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-gray-400">
            <FiGlobe size={20} className="mr-2" />
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter Country"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="text-gray-400">
            <FiInfo size={20} className="mr-2" />
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="bg-gray-700 text-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            rows="4"
            placeholder="Write a short bio..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <Web3Button
            contractAddress="0xF626153200273Bee3f6e82616dc1a11e800fA4DE"
            action={async (contract) => {
              try {
                const data = await contract.call("registerAsValidator", [
                  formData.firstName,
                  formData.bio,
                  address,
                ]);
                console.log("Transaction data:", data);
                alert("Transaction data:", data);
              } catch (error) {
                alert("The user is already a Validator !");
              }
            }}
          >
            registerAsValidator
          </Web3Button>
        </div>
      </form>
    </div>
  );
};

export default ValidatorForm;
