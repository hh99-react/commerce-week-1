// import React from "react";

import { useUser } from "@/store/UserContext";

const Home = () => {
  const { user } = useUser();
  console.log(user?.id);
  return <div className="mt-20 mx-auto px-[10%]">Home</div>;
};

export default Home;
