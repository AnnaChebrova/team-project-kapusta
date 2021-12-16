import { createSlice } from "@reduxjs/toolkit";
import { addTransaction, deleteTransaction } from "./operations";
const initialState = {
  allTransactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: {
    [addTransaction.fulfilled](state, { payload }) {
      console.log(payload);
      state.allTransactions.push(payload.newTransaction);
      return state;
    },
    [deleteTransaction.fulfilled](state, { payload }) {
      state.allTransaction = [
        ...state.allTransactions.filter(
          (transaction) => transaction.id !== payload
        ),
      ];
    },
  },
});
export default transactionSlice.reducer;
