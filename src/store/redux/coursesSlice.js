import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, addData, editData, deleteData } from "../../services/api";

// Async Thunk for Get Data
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData();
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async Thunk for Add Data
export const addCourseAsync = createAsyncThunk(
  "courses/addCourseAsync",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await addData(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async Thunk for Edit Data
export const updateCourseAsync = createAsyncThunk(
  "courses/updateCourseAsync",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await editData(id, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async Thunk for Delete Data
export const deleteCourseAsync = createAsyncThunk(
  "courses/deleteCourseAsync",
  async (id, { rejectWithValue }) => {
    try {
      await deleteData(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial State: State awal berupa array kosong yang nantinya akan diisi dengan data API
const initialState = [];

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // Reducer untuk menangani data hasil dari API dan menyimpannya ke dalam state global
    setCourses: (state, action) => {
      return action.payload;
    },
    addCourse: (state, action) => {
      state.push(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.findIndex(
        (c) => String(c.id) === String(action.payload.id)
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteCourse: (state, action) => {
      return state.filter((c) => String(c.id) !== String(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addCourseAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateCourseAsync.fulfilled, (state, action) => {
        const index = state.findIndex(
          (c) => String(c.id) === String(action.payload.id)
        );
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteCourseAsync.fulfilled, (state, action) => {
        return state.filter((c) => String(c.id) !== String(action.payload));
      });
  },
});

export const { setCourses, addCourse, updateCourse, deleteCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;
