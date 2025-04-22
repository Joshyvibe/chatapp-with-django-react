import React from "react";
import '../styles/Home.css';

const Home = () => {
  const users = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to ChitChat</h1>
        <p>Connect with your friends instantly!</p>
      </header>

    
    </div>
  );
};

export default Home;