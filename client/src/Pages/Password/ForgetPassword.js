import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { forgetPassword } from "../../Redux/authSlice";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  // Removed unused navigate function
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");

  // function to handle submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking for the empty field
    if (!email) {
      toast.error("All fields are mandatory");
      return;
    }

    // email validation using regex
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      toast.error("Invalid email id");
      return;
    }

    // calling the api from auth slice
    const res = await dispatch(forgetPassword(email));

    // You can use 'res' to handle any additional logic or to display a success message
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success("Verification link sent to your email");
    } else {
      toast.error("Failed to send verification link. Please try again.");
    }

    // clearing the input fields
    setEmail("");
  };

  return (
    <Layout>
      {/* forget password container */}
      <div className="flex items-center justify-center h-[100vh]">
        {/* forget password card */}
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-lg p-4 text-black w-80 h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-red-800 text-3xl font-bold">Forget Password</h1>

          <p className="text-center text-[20px]">
            Enter your registered email, we will send you a verification link on
            your registered email from which you can reset your password
          </p>

          <div className="flex flex-col gap-1">
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your registered email"
              className="rounded-2xl px-2 py-1 border"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <button
            className="w-full bg-blue-500 text-black hover:bg-red-800 hover:text-white transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Get Verification Link   
          </button>

          <p className="text-center text-[17px]">
            Already have an account?{" "}
            <Link to={"/login"} className="link text-[17px] text-[#f000b8]  cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
