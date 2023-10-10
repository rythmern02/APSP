// @ts-nocheck
import React, { useState, useEffect } from "react";
import { 
  Contract,
  ContractRead,
  toUnits,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from 'ethers';
const PostCard = ({ post, isValidator, onValidatePost }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mb-4">
      {/* Card Header */}
      <div className="px-6 py-4 bg-gray-800 bg-opacity-70 text-white">
        <h2 className="text-xl font-semibold">{post.name}</h2>
        <p className="text-gray-400">{post.date}</p>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <p className="text-gray-700">{post.content}</p>
      </div>
      <img src={`https://ipfs.io/ipfs/${post.image} `} alt={post.title} />
      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-200">
        {isValidator && !post.validated && (
          <button
            onClick={() => onValidatePost(post.id)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md mr-2"
          >
            Validate Post
          </button>
        )}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mr-2">
          Upvote
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md mr-2">
          Reward
        </button>
        <hr />
        <span className="text-gray-700">Funds Given: {post.fundsGiven}</span>
      </div>
    </div>
  );
};

const PostPage = ({ contract }) => {
  const { contractEther } = useContract(
    "0xF626153200273Bee3f6e82616dc1a11e800fA4DE"
  );

  const [posts, setPosts] = useState([]);
  const isValidator = true; // Replace with your validator check logic

  const handleValidatePost = async (postId) => {
    try {
      // Perform validation logic here using your contract functions
      // For example, if you have a 'validatePost' function in your contract:
      // await contractEther.validatePost(postId);
      // Update the post's 'validated' property in the state or API

      // After validation, you may want to fetch updated post data
      Evifetcher();
    } catch (error) {
      console.error("Error validating post:", error);
    }
  };
  
  let index = contract.call("counter");
  const Evifetcher = async () => {
    const indexAsInt = parseInt(ethers.utils.formatUnits( (await index), 0)) ;
    const fetchedPosts = [];
    for (let i = 3; i < indexAsInt+1; i++) {
      try {
        const Evi = await contract.call("getEvidenceDetails", [i])
        const post = {
          id: i,
          name: Evi.name, // Replace with the actual property names from your contract
          content: Evi.description,
          image: Evi.ipfsHash,
          voteCount: Evi.voteCount,
          validated: Evi.validation, // Adjust as per your contract structure
          // fundsGiven: Evi.data.fundsGiven,
        };
        fetchedPosts.push(post);
      } catch (error) {
        console.error("Error fetching evidence details:", error);
      }
    }
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    Evifetcher();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-semibold mb-4">Post Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isValidator={isValidator}
            onValidatePost={handleValidatePost}
          />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
