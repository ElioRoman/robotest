"use client";
import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [
      { id: 1, name: "Bob" },
      { id: 2, name: "Tom" },
    ],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    editItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
  },
});

export const { addItem, editItem } = itemsSlice.actions;
export default itemsSlice.reducer;
