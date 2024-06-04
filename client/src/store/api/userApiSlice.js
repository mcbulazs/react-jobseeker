import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3030/";

export const userApiSlice = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (registerData) => ({
				url: `users`,
				method: "POST",
				body: {
					email: registerData.email,
					password: registerData.password,
					fullname: registerData.fullname,
					role: registerData.role,
				},
			}),
		}),
		login: builder.mutation({
			query: (loginData) => ({
				url: `authentication`,
				method: "POST",
				body: {
					email: loginData.email,
					password: loginData.password,
					strategy: "local",
				},
			}),
		}),
		userinfo: builder.query({
			query: (userId) => ({
				url: `users/${userId}`,
				method: "GET",
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useUserinfoQuery } =
	userApiSlice;
