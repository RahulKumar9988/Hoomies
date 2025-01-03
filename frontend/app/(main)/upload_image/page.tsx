"use client";
import React, { useState } from "react";
import axios from "axios";
import Button_Silver from "@/components/Button_Silver";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select an image to upload.");
      return;
    }

    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("phone", phone);
    formData.append("price", price);

    const token = localStorage.getItem("token"); // Assuming the token is stored in local storage

    try {
      const response = await axios.post(
        "http://127.0.0.1:8787/api/v1/post/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`, // Include the token in the Authorization header
          },
        }
      );
      if (response.status === 200) {
        setUploadStatus("Image uploaded successfully!");
        console.log("Image uploaded successfully:", response.data);
      } else {
        setUploadStatus("Failed to upload image.");
        console.error("Error uploading image:", response.data);
      }
    } catch (error) {
      const err = error as any;
      if (err.response) {
        setUploadStatus(err.response.data.message || "Error uploading image.");
        console.error("Error uploading image:", err.response.data);
      } else {
        setUploadStatus(err.message || "Error uploading image.");
        console.error("Error uploading image:", err.message);
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="mt-20 md:mt-20 max-w-xs md:max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload Image</h2>
      <div className="space-y-4">
        {uploadStatus && (
          <p
            className={`text-sm font-medium mb-4 ${
              uploadStatus.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {uploadStatus}
          </p>
        )}

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone no
          </label>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="price"
            placeholder="Enter the price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="w-full ">
          <label className=" borderblock text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <div className="flex flex-col gap-2 md:flex-row justify-between">
            <input
              type="file"
              onChange={handleFileChange}
              className=" md:w-60  px-3 py-2 border text-black text-right border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
            />
            <button
            onClick={handleUpload}
            className="w-full md:w-auto px-6 py-2 bg-black text-white font-medium rounded-3xl hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 transition-colors"
          >
            {isLoading ? (
              <span>Loading...</span> // Show loading text or spinner here
            ) : (
              "Upload Details"
            )}
          </button>
          </div>
        </div>

        

        {/* Optionally, you can add a spinner for more visual feedback */}
        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="loader"></div> {/* Add a CSS spinner here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
