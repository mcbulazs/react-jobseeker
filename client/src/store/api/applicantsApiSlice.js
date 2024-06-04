import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3030/";
export const applicantsApiSlice = createApi({
	reducerPath: "applicantsApi",
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		applyForJob: builder.mutation({
			query: (jobId) => ({
				url: `applicants`,
				method: "POST",
				body: { jobId },
			}),
		}),
		deleteApplication: builder.mutation({
			query: (jobId) => ({
				url: `applicants?jobId=${jobId}`,
				method: "DELETE",
			}),
		}),
		applicantsForJob: builder.query({
			query: (jobId) => ({
				url: `applicants?jobId=${jobId}`,
				method: "GET",
			}),
		}),
		jobsForApplicant: builder.query({
			query: (userId) => ({
				url: `applicants?userId=${userId}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useApplyForJobMutation,
	useDeleteApplicationMutation,
	useApplicantsForJobQuery,
	useJobsForApplicantQuery,
} = applicantsApiSlice;
