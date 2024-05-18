import React from "react";
import Layout from "../Layout/Layout";
import homePageMainImage from "../Assets/Images/homePageMainImage.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Layout>
      <div className="pt-10 text- bg-blue-300 flex items-center justify-center gap-10 mx-16 h-[90vh]">
        {/* for platform details */}
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl text-red-600 font-semibold">
            Find out best{" "}
            <span className="text-red-600 font-bold">Online Courses</span>
          </h1>
          <p className="text-xl text-gray-600">
            We have a large library of courses taught by highly skilled and
            qualified faculities at a very affordable cost.
          </p>

          {/* for buttons */}
          <div className="space-x-6">
            <Link to={"/courses"}>
              <button className="bg-blue-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-blue-900 transition-all ease-in-out duration-300">
                Explore Courses
              </button>
            </Link>
            <Link to={"/contact"}>
            <button className="bg-blue-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-blue-900 transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* right section for image */}
        <div className="w-1/2 flex items-center justify-center">
          
          <img src={homePageMainImage} alt="home page " />
          
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
