import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  search: string;
  category: string;
  typeFilter: "all" | "movie" | "series";
  isAdminAuthenticated: boolean;
}

const initialState: UIState = {
  search: "",
  category: "",
  typeFilter: "all",
  isAdminAuthenticated: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<"all" | "movie" | "series">) => {
      state.typeFilter = action.payload;
    },
    setAdminAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAdminAuthenticated = action.payload;
    },
    resetFilters: (state) => {
      state.search = "";
      state.category = "";
      state.typeFilter = "all";
    },
  },
});

export const { setSearch, setCategory, setTypeFilter, setAdminAuthenticated, resetFilters } =
  uiSlice.actions;

export default uiSlice.reducer;
