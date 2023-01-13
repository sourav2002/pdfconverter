import { createSlice } from "@reduxjs/toolkit";
import {
  createEntry,
  getAllEntries,
  getEntryByName,
  searchByName,
  getEntryByToken,
  updateNumberByToken,
} from "./EntryThunkAPI";

const entrySlice = createSlice({
  name: "entry",
  initialState: {
    entries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.entries.push(action.payload);
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(getAllEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEntryByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEntryByName.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(getEntryByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchByName.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(searchByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEntryByToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEntryByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(getEntryByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateNumberByToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNumberByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = state.entries.map((entry) =>
          entry.token === action.payload.token ? action.payload : entry
        );
      })
      .addCase(updateNumberByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = entrySlice.actions;

export default entrySlice.reducer;
