import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3030/";
export const jobsApiSlice = createApi({
	reducerPath: "jobsApi",
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
		job: builder.query({
			query: (id) => ({
				url: `jobs/${id}`,
				method: "GET",
			}),
		}),
		allJobs: builder.query({
			query: () => ({
				url: `jobs`,
				method: "GET",
			}),
		}),
		
		jobsByUser: builder.query({
			query: (userId) => ({
				url: `jobs?userId=${userId}`,
				method: "GET",
			}),
		}),
		createJob: builder.mutation({
			query: (jobData) => ({
				url: `jobs`,
				method: "POST",
				body: jobData,
			}),
		}),
		modifyJob: builder.mutation({
			query: (jobData) => ({
				url: `jobs/${jobData.id}`,
				method: "PATCH",
				body: jobData,
			}),
		}),
		deleteJob: builder.mutation({
			query: (id) => ({
				url: `jobs/${id}`,
				method: "DELETE",
			}),
		}),
		deleteAllJobs: builder.mutation({
			query: () => ({
				url: `jobs`,
				method: "DELETE",
			}),
		}),
		jobsFiltered: builder.query({ //nem hasznalom mert nem lehet multichoice
			query: (props) => {
				const s = Object.keys(props).map((key) => {
					if (!props[key]) {
						return ''
					}     
					return `${key}=${props[key]}`
				})
				return ({
				url: `jobs?${s}`,
				method: "GET",
			})},
		}),
		jobsSkipLimit: builder.query({
			query: ({limit, skip}) => ({
				url: `jobs?$limit=${limit}&$skip=${skip}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useJobQuery,
	useJobsFilteredQuery,
	useCreateJobMutation,
	useJobsSkipLimitQuery,
	useJobsByUserQuery,
	useAllJobsQuery,
	useModifyJobMutation,
	useDeleteJobMutation,
	useDeleteAllJobsMutation,
} = jobsApiSlice;
