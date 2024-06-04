import { experiencesApiSlice } from "./api/experiencesApiSlice";
import { userApiSlice } from "./api/userApiSlice";
import { jobsApiSlice } from "./api/jobsApiSlice";
import { applicantsApiSlice } from "./api/applicantsApiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice/authSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[userApiSlice.reducerPath]: userApiSlice.reducer,
		[experiencesApiSlice.reducerPath]: experiencesApiSlice.reducer,
		[jobsApiSlice.reducerPath]: jobsApiSlice.reducer,
		[applicantsApiSlice.reducerPath]: applicantsApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(userApiSlice.middleware)
			.concat(experiencesApiSlice.middleware)
			.concat(jobsApiSlice.middleware)
			.concat(applicantsApiSlice.middleware),
});
