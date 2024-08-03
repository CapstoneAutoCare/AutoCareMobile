import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../app/Booking/slice";
import centerReducer from "../app/Center/slice";
import vehicleReducer from "../app/Vehicle/slice";
import sparePartReducer from "../app/SparePart/slice";
import customerCareReducer from "../app/CustomerCare/slice";
import userSlice from "../features/userSlice";
import requestsReducer from "../app/CusCare/requestsSlice";
import requestDetailReducer from "../app/CusCare/requestDetailSlice";
import homepageReducer from "../app/CusCare/homepageSlice";
import taskReducer from "../app/Technician/taskSlice";
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
    center: centerReducer,
    vehicle: vehicleReducer,
    customerCare: customerCareReducer,
    sparePart: sparePartReducer,
    requests: requestsReducer,
    requestDetail: requestDetailReducer,
    homepage: homepageReducer,
    tasks: taskReducer,
  },
});
