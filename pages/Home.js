import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="text-lg mb-8">Showcasing my projects and skills in web development.</p>
      <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">
        Explore My Projects
      </button>
    </div>
  );
};

export default Home