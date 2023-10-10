// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Contract,
  ContractRead,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";

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
      <img src={post.image} alt={post.title} />

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
const PostPage = () => {
  const { contract } = useContract(
    "0xF626153200273Bee3f6e82616dc1a11e800fA4DE"
  );
  const [posts, setPosts] = useState([]);

  const isValidator = true; // Replace with your validator check logic

  const handleValidatePost = (postId) => {
    // Logic to validate the post with postId
    // Update the post's 'validated' property in the state or API
  };
  const evidenceIds = [1, 2, 3];
  const evidencePromises = evidenceIds.map((id) =>
    useContractRead(contract, "getEvidenceDetails", [id])
  );
  useEffect(() => {
    const fetchPosts = async () => {
        const evidenceData = await Promise.all(evidencePromises);
      setPosts(evidenceData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-semibold mb-4">Post Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <PostCard
            key={index}
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
