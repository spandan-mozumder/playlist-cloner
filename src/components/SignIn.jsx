import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db, app } from "../services/firebaseconfig";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loggedEmail, setLoggedEmail] = useState("");

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    await signInUser(email, password);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logOutUser();
  };

  async function signInUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docSnap = await getDoc(doc(db, "users", user.uid));

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("User logged in:", userData);
        toast.success("You have successfully signed in with your credentials", {
          autoClose: 3000,
        });
        navigate("/dashboard");
      } else {
        console.error("No user data found in Firestore");
        toast.error(
          "No user data with the credentials entered is found in Firestore",
          {
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      toast.error("Error signing up: " + error.message, {
        autoClose: 3000,
      });
    }
  }

  async function logOutUser() {
    try {
      await signOut(auth);
      toast.success("Successfully logged out!", { autoClose: 3000 });
      setIsLoggedin(false);
      navigate("/signin");
    } catch (error) {
      toast.error("Error logging out: " + error.message, { autoClose: 3000 });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.email);
        setLoggedEmail(user.email);
        setIsLoggedin(true);
      } else {
        console.log("No user is signed in.");
        setIsLoggedin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-[#efeee8] flex flex-row h-[100vh] justify-center items-center">
      <ToastContainer />

      {isLoggedin ? (
        <div className="w-[50%] p-[30px] flex flex-col justify-center items-center gap-10">
          <h3 className="text-3xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[80px] text-center">
            Seems like you are already logged in with the email
          </h3>

          <h3 className="text-lg bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent text-center">
            {loggedEmail}
          </h3>

          <div className="flex flex-col items-center">
            <h3 className="text-lg bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent text-center">
              Want to log into another account? Log out now or continue to your
              dashboard
            </h3>

            <div>
              <button
                type="submit"
                className="px-[20px] py-[4px] mx-[30px] mt-[20px] rounded-full border-2 border-gray-600 bg-gray-600 text-[#efeee8] transition-all hover:bg-transparent hover:text-[#5b5b5b] shadow-md shadow-[#b1b1b1]"
                onClick={handleLogout}
              >
                Log Out
              </button>

              <Link to="/dashboard">
                <button
                  type="submit"
                  className="px-[20px] py-[4px] mx-[30px] mt-[20px] rounded-full border-2 border-gray-600 bg-gray-600 text-[#efeee8] transition-all hover:bg-transparent hover:text-[#5b5b5b] shadow-md shadow-[#b1b1b1]"
                >
                  To Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[50%] p-[30px] flex flex-col justify-center items-center gap-10">
          <div>
            <h3 className="text-3xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[50px] text-center">
              Welcome Back!
            </h3>
            <h3 className="text-3xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[50px] text-center">
              Enter your credentials to be guided to your account
            </h3>
          </div>

          <form onSubmit={handleSignin} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-2 w-[500px]">
              <label
                htmlFor="email"
                className="font-medium text-gray-700 text-xl"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 bg-[#efeee8]"
              />
            </div>

            <div className="grid grid-cols-1 gap-2 w-[500px]">
              <label
                htmlFor="password"
                className="text-gray-700 text-xl font-medium "
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 bg-[#efeee8]"
              />
            </div>

            <button
              type="submit"
              className="px-[20px] py-[4px] mx-[30px] mt-[20px] rounded-full border-2 border-gray-600 bg-gray-600 text-[#efeee8] transition-all hover:bg-transparent hover:text-[#5b5b5b] shadow-md shadow-[#b1b1b1]"
            >
              Log In!!
            </button>
          </form>

          <div>
            <p className="text-md bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold underline">
                Sign Up
              </Link>{" "}
              then.
            </p>
          </div>
        </div>
      )}

      <div className="h-[90vh] w-1 bg-gray-400"></div>

      <div className="w-[50%] flex flex-col gap-7 justify-center items-center">
        <h2 className="text-4xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[50px]">
          Glad to see that you have
        </h2>
        <h2 className="text-4xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[50px]">
          already signed up for your account
        </h2>
        <h2 className="text-5xl bg-gradient-to-r from-[#959490] from-10% to-gray-700 to-90% bg-clip-text text-transparent h-[60px]">
          Log In Now!!!
        </h2>
      </div>
    </div>
  );
};

export default SignIn;
