import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseconfig";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/notauthenticated");
    }
  }, [auth, navigate]);

  return (
    <div className="flex">
      <div className="w-[50%] p-[30px] h-[100vh] flex flex-col justify-center items-center gap-10">
        <h2 className="text-4xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[50px]">
          Welcome to your Dashboard
        </h2>

        <h2 className="text-lg bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[50px]">
          (I refer to this page as a dashboard but this is really minimalistically minimalist)
        </h2>
      </div>

      <div className="w-[50%] p-[80px] flex flex-col justify-center items-center gap-10">
        <div className="border-4 border-gray-700 w-full h-full rounded-3xl">
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
