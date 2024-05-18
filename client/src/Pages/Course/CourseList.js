import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";
import { getAllCourses } from "../../Redux/courseSlice";

const Courses = () => {
  const dispatch = useDispatch();
  const { coursesData, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <Layout>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-red-500 text-center text-3xl font-semibold">
          Explore the courses made by{" "}
          <span className="font-bold text-red-500">Industry Experts</span>
        </h1>

        {loading && <p className="text-center">Loading courses...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="mb-10 flex flex-wrap gap-14">
          {coursesData?.map((element) => (
            <CourseCard key={element._id} data={element} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
