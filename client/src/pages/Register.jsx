import React, { useState } from "react";
import {
	useLoginMutation,
	useRegisterMutation,
} from "../store/api/userApiSlice";
import { useAddExperienceMutation } from "../store/api/experiencesApiSlice";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { parseExperience } from "../utils/utils";

const Register = () => {
	const [experience, setExperience] = useState({
		companyName: "",
		position: "",
		startYear: "",
		endYear: "",
	});
	const [experiences, setExperiences] = useState([]);
	const [user, setUser] = useState({
		email: "",
		fullname: "",
		password: "",
		role: "company",
	});

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const [registerMutate] = useRegisterMutation();
	const [loginMutate] = useLoginMutation();
	const [experiencesMutate] = useAddExperienceMutation();
	const registerUser = async () => {
		const registerResponse = await registerMutate(user);
		if (!registerResponse.data) {
			return;
		}
		const loginResponse = await loginMutate({
			email: user.email,
			password: user.password,
		}).unwrap();
		if (!loginResponse) {
			return;
		}
		dispatch(
			login({
				email: loginResponse.user.email,
				fullname: loginResponse.user.fullname,
				id: loginResponse.user.id,
				role: loginResponse.user.role,
				token: loginResponse.accessToken,
			}),
		);
		if (user.role === "company") {
			navigate("/");
		}

		var parsedObject = parseExperience(experiences);

		const experienceResponse = await experiencesMutate(parsedObject);
		navigate("/");
	};

	return (
		<div className="w-1/3 m-auto mt-10">
			<h1 className="text-center text-3xl font-bold">Register</h1>
			<form>
				<input
					type="email"
					name="email"
					placeholder="name@example.com"
					className="w-full p-2 my-2 border border-gray-300 rounded"
					onChange={(e) => setUser({ ...user, email: e.target.value })}
				/>
				<input
					type="text"
					name="fullname"
					placeholder="Full Name"
					className="w-full p-2 my-2 border border-gray-300 rounded"
					onChange={(e) => setUser({ ...user, fullname: e.target.value })}
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					className="w-full p-2 my-2 border border-gray-300 rounded"
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>
				<select
					name="role"
					className="w-full p-2 my-2 border border-gray-300 rounded"
					onChange={(e) => setUser({ ...user, role: e.target.value })}
					defaultValue="company"
				>
					<option value="company">Munkáltató</option>
					<option value="jobseeker">Munkavállaló</option>
				</select>
			</form>
			<hr className="mb-10" />
			{user?.role === "jobseeker" && (
				<div>
					{experiences &&
						experiences.map((exp, index) => (
							<div className="flex gap-2" key={index}>
								<input
									disabled
									value={exp.companyName}
									type="text"
									name="companyName"
									className="w-full p-2 my-2 border border-gray-300 rounded"
								/>
								<input
									disabled
									type="text"
									name="position"
									value={exp.position}
									className="w-full p-2 my-2 border border-gray-300 rounded"
								/>
								<input
									disabled
									type="number"
									name="startYear"
									value={exp.startYear}
									className="w-full p-2 my-2 border border-gray-300 rounded"
								/>
								<input
									disabled
									type="number"
									name="endYear"
									value={exp.endYear}
									className="w-full p-2 my-2 border border-gray-300 rounded"
								/>
								<button
									className="p-2 my-2 bg-red-500 text-white rounded"
									onClick={(e) => {
										let newExperiences = experiences;
										newExperiences.splice(index, 1);
										setExperiences([...newExperiences]);
									}}
								>
									x
								</button>
							</div>
						))}
					<form className="flex gap-2">
						<input
							type="text"
							name="companyName"
							placeholder="Munkahely neve"
							className="w-full p-2 my-2 border border-gray-300 rounded"
							onChange={(e) =>
								setExperience({ ...experience, companyName: e.target.value })
							}
						/>
						<input
							type="text"
							name="position"
							placeholder="Munkakör"
							className="w-full p-2 my-2 border border-gray-300 rounded"
							onChange={(e) =>
								setExperience({ ...experience, position: e.target.value })
							}
						/>
						<input
							type="number"
							name="startYear"
							placeholder="Kezdés éve"
							className="w-full p-2 my-2 border border-gray-300 rounded"
							onChange={(e) =>
								setExperience({ ...experience, startYear: e.target.value })
							}
						/>
						<input
							type="number"
							name="endYear"
							placeholder="Befejezés éve"
							className="w-full p-2 my-2 border border-gray-300 rounded"
							onChange={(e) =>
								setExperience({ ...experience, endYear: e.target.value })
							}
						/>
						<button
							type="reset"
							className="p-2 my-2 bg-emerald-500 text-white rounded hover:bg-emerald-700"
							onClick={(e) => {
								setExperiences([...experiences, experience]);
								setExperience({
									companyName: "",
									position: "",
									startYear: "",
									endYear: "",
								});
							}}
						>
							✓
						</button>
					</form>
				</div>
			)}
			<button
				type="submit"
				className="w-full p-2 my-2 bg-blue-500 text-white rounded mt-10 hover:bg-blue-700"
				onClick={registerUser}
			>
				Register
			</button>
		</div>
	);
};

export default Register;
