import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WordObject } from "~/interfaces";

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    last300UsedWords: [] as WordObject[],
  },
  reducers: {
    saveWordInCache: (state, action: PayloadAction<WordObject>) => {
      if (state.last300UsedWords.length >= 300) {
        state.last300UsedWords.shift();
      }
      state.last300UsedWords.push(action.payload);
    },
    removeWordFromCache: (state, action: PayloadAction<string>) => {
      state.last300UsedWords = state.last300UsedWords.filter((word) => {
        return word.spelling !== action.payload;
      });
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = generalSlice.actions;
