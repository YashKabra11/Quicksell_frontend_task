import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allTickets: [],
  allUser: [],
  selectedData: [],
  user: null,
  message: null,
};

export const DataReducer = createReducer(initialState, {
  DATA_REQUEST: (state) => {
    state.loading = true;
  },
  DATA_SUCCESS: (state, action) => {
    state.loading = false;
    state.allTickets = action.payload.tickets;
    state.allUser = action.payload.users;
  },
  DATA_FAILURE: (state) => {
    state.loading = false;
    state.allTickets = [];
    state.allUser = [];
  },
});

export const SelectDataReducer = createReducer(initialState, {
  SELECT_DATA_REQUEST: (state) => {
    state.loading = true;
    state.selectedData = [];
    state.user = null;
    state.message = null;
  },
  SELECT_DATA_SUCCESS: (state, action) => {
    state.loading = false;
    state.selectedData = action.payload.selectedData;
    state.user = action.payload.user;
  },
  SELECT_DATA_FAILURE: (state, action) => {
    state.loading = false;
    state.selectedData = [];
    state.message = action.payload.message;
  },
});
