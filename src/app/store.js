import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../app/Booking/slice";
import sparePartReducer from "../app/SparePart/slice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });
  },
  reducer: {
    booking: bookingReducer,
    sparePart: sparePartReducer,
  },
});
