import React, { useState } from "react";
import { useLoginMutation } from "../store/api/userApiSlice";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [loginMutate] = useLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loginUser = async () => {
		const loginResponse = await loginMutate({
			email: user.email,
			password: user.password,
		}).unwrap();
		if (!loginResponse.user) {
			return;
		}
		dispatch(
			login({
				email: loginResponse.user.email,
				fullname: loginResponse.user.fullname,
				role: loginResponse.user.role,
				id: loginResponse.user.id,
				token: loginResponse.accessToken,
			}),
		);
		navigate("/");
	};

	return (
		<div className="w-1/3 m-auto mt-10">
			<h1 className="text-center text-3xl font-bold">Login</h1>
			<form>
				<input
					type="email"
					name="email"
					placeholder="name@example.com"
					className="w-full p-2 my-2 border border-gray-300 rounded"
					onChange={(e) => setUser({ ...user, email: e.target.value })}
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					className="w-full p-2 my-2 border border-gray-300 rounded"
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>
				<button
					type="button"
					className="w-full p-2 my-2 bg-blue-500 text-white rounded mt-10 hover:bg-blue-700"
					onClick={loginUser}
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
