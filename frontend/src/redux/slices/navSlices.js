import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
  isBookingModalOpen: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    closeSidebar: (state) => {
      state.isCollapsed = true;
    },
    openBookingModal: (state) => {
      state.isBookingModalOpen = true;
    },
    closeBookingModal: (state) => {
      state.isBookingModalOpen = false;
    }
  },
});

export const { toggleSidebar, closeSidebar, openBookingModal, closeBookingModal } = navSlice.actions;

export default navSlice.reducer;
