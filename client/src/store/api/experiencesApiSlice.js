import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3030/";
export const experiencesApiSlice = createApi({
	reducerPath: "experiencesApi",
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
		addExperience: builder.mutation({
			query: (experiencesData) => ({
				url: `experiences`,
				method: "POST",
				body: experiencesData,
			}),
		}),
		getUserExperiences: builder.query({
			query: () => ({
				url: `experiences`,
				method: "GET",
			}),
		}),
		modifyExperience: builder.mutation({
			query: (experiencesData) => ({
				url: `experiences/${experiencesData.id}`,
				method: "PATCH",
				body: experiencesData,
			}),
		}),
		deleteExperience: builder.mutation({
			query: (id) => ({
				url: `experiences/${id}`,
				method: "DELETE",
			}),
		}),
		deleteAllExperiences: builder.mutation({
			query: () => ({
				url: `experiences`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useAddExperienceMutation,
	useGetUserExperiencesQuery,
	useDeleteAllExperiencesMutation,
	useDeleteExperienceMutation,
	useModifyExperienceMutation,
} = experiencesApiSlice;
