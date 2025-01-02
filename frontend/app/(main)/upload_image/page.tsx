"use client";
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [phone, setPhone] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('phone', phone);

    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage

    try {
      const response = await axios.post('http://127.0.0.1:8787/api/v1/post/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      if (response.status === 200) {
        console.log('Image uploaded successfully:', response.data);
      } else {
        console.error('Error uploading image:', response.data);
      }
    } catch (error) {
      const err = error as any;
      if (err.response) {
        console.error('Error uploading image:', err.response.data);
      } else {
        console.error('Error uploading image:', err.message);
      }
    }
  };

  return (
    <div className="mt-20 md:mt-20 max-w-xs md:max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload Image</h2>
      <div className="space-y-4">
        
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
            Author Email
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
         
        <button
          onClick={handleUpload}
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
