import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../app/Booking/slice";
import sparePartReducer from "../app/SparePart/slice";
import userSlice from "../features/userSlice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });
  },
  reducer: {
    user: userSlice,
    booking: bookingReducer,
    sparePart: sparePartReducer,
  },
});
