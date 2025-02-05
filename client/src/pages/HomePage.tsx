import React from "react";
import FriendList from "../components/FriendList";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Equilibrium</h1>
      <p>Your financial assistant</p>
      <FriendList />
    </div>
  );
};

export default HomePage;
