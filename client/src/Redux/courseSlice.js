import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance"; // Ensure this is correctly set up

const initialState = {
  coursesData: [],
  loading: false,
  error: null,
};

// function to get all courses
export const getAllCourses = createAsyncThunk(
  "courses/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/courses");

      toast.promise(res, {
        loading: "Loading courses data...",
        success: "Courses loaded successfully",
        error: "Failed to get courses",
      });

      const response = await res;
      console.log("Fetched Courses:", response.data.courses); // Debugging log
      return response.data.courses;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Error fetching courses:", errorMessage); // Debugging log
      return rejectWithValue(errorMessage);
    }
  }
);

// function to create a new course
export const createNewCourse = createAsyncThunk(
  "courses/create",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      const res = axiosInstance.post("/courses", formData);

      toast.promise(res, {
        loading: "Creating the course...",
        success: "Course created successfully",
        error: "Failed to create course",
      });

      const response = await res;
      console.log("Created Course:", response.data); // Debugging log
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Error creating course:", errorMessage); // Debugging log
      return rejectWithValue(errorMessage);
    }
  }
);

// function to delete the course
export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = axiosInstance.delete(`courses/${id}`);

      toast.promise(res, {
        loading: "Deleting the course...",
        success: "Course deleted successfully",
        error: "Failed to delete course",
      });

      const response = await res;
      console.log("Deleted Course:", response.data); // Debugging log
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Error deleting course:", errorMessage); // Debugging log
      return rejectWithValue(errorMessage);
    }
  }
);

// function to update the course details
export const updateCourse = createAsyncThunk(
  "courses/update",
  async (data, { rejectWithValue }) => {
    try {
      const res = axiosInstance.put(`/courses/${data.id}`, {
        title: data.title,
        category: data.category,
        createdBy: data.createdBy,
        description: data.description,
      });

      toast.promise(res, {
        loading: "Updating the course...",
        success: "Course updated successfully",
        error: "Failed to update course",
      });

      const response = await res;
      console.log("Updated Course:", response.data); // Debugging log
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Error updating course:", errorMessage); // Debugging log
      return rejectWithValue(errorMessage);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesData = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesData.push(action.payload);
      })
      .addCase(createNewCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesData = state.coursesData.filter(
          (course) => course._id !== action.meta.arg
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.coursesData.findIndex(
          (course) => course._id === action.payload._id
        );
        if (index !== -1) {
          state.coursesData[index] = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
