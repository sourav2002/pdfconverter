import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// -------------- CREATE ------------

export const createEntry = createAsyncThunk("entry/createEntry",async (entryData, thunkAPI) => {
      try {
        const response = await axios.post(
          "https://entrytopdf.onrender.com/entry",
          entryData
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  // ----------------------- GET ALL ENTRIES  ---------------------


export const getAllEntries = createAsyncThunk("entry/getAllEntries", async () => {
  try {
    const response = axios.get(`https://entrytopdf.onrender.com/entry`);
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
});

  // ----------------------- GET ALL ENTRIES BY NAME  ---------------------

export const getEntryByName = createAsyncThunk(
  "entry/getEntryByName",
  async (name, thunkAPI) => { 
    try {
      const response = await axios.get(
        `https://entrytopdf.onrender.com/entry/name/${name}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


  // ----------------------- SEARCH BY NAME ---------------------


export const searchByName = createAsyncThunk(
  "entry/searchByName",
  async (name, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://entrytopdf.onrender.com/entry/search/${name}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

  // ----------------------- GET ALL ENTRIES BY TOKEN ---------------------


export const getEntryByToken = createAsyncThunk(
  "entry/getEntryByToken",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://entrytopdf.onrender.com/entry/token/${token}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateNumberByToken = createAsyncThunk(
  "posts/updateNumberByToken",
  async (EntryData, thunkAPI) => {
    try {
      const token = EntryData.token;
      const response = await axios.patch(
        `https://entrytopdf.onrender.com/entry/token/${token}`,
        EntryData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
