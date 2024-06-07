import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { selectLoggedInUser } from "../store/authSlice/authSlice";
import {
	useCreateJobMutation,
	useModifyJobMutation,
} from "../store/api/jobsApiSlice";
import Slider from "@mui/material/Slider";

const defaultValues = {
	company: "",
	position: "",
	description: "",
	salaryFrom: 750000,
	salaryTo: 1500000,
	type: "full-time",
	city: "",
	homeOffice: false,
};
const InputJob = () => {
	let { state } = useLocation();
	const values = state?.job ?? defaultValues;
	const user = useSelector(selectLoggedInUser);
	const [job, setJob] = useState(values);

	const [createJobMutate] = useCreateJobMutation(values);
	const [modifyJobMutate] = useModifyJobMutation(values);
	const navigate = useNavigate();
	if (!user || user.role !== "company") {
		navigate("/");
	}

	const addJob = async () => {
		const response = await createJobMutate(job);
		navigate("/profile", { state: {} });
	};
	const modifyJob = async () => {
		const response = await modifyJobMutate(job);
		navigate("/profile", { state: {} });
	};

	return (
		<div className="">
			<h1 className="w-full flex px-10 items-center h-24 text-4xl font-bold shadow-md">
				Add Job
			</h1>
			<div className="w-2/3 m-auto shadow-md rounded-md p-10">
				<form>
					<label>Company name</label>
					<input
						type="text"
						name="company"
						placeholder="Company"
						className="w-full p-2 my-2 border border-gray-300 rounded"
						defaultValue={values.company}
						onChange={(e) => setJob({ ...job, company: e.target.value })}
					/>
					<label>Position</label>
					<input
						type="text"
						name="position"
						placeholder="Position"
						className="w-full p-2 my-2 border border-gray-300 rounded"
						defaultValue={values.position}
						onChange={(e) => setJob({ ...job, position: e.target.value })}
					/>
					<label>Description</label>
					<textarea
						name="description"
						placeholder="Description"
						className="w-full p-2 my-2 border border-gray-300 rounded"
						defaultValue={values.description}
						onChange={(e) => setJob({ ...job, description: e.target.value })}
					></textarea>
					<label>Salary</label>
					<Slider
						min={250000}
						max={2000000}
						marks={true}
						step={10000}
						getAriaLabel={() => "Salary range"}
						defaultValue={[values.salaryFrom, values.salaryTo]}
						valueLabelDisplay="auto"
						onChange={(e, value) =>
							setJob({ ...job, salaryFrom: value[0], salaryTo: value[1] })
						}
					/>
					<label>Type</label>
					<select
						name="type"
						className="w-full p-2 my-2 border border-gray-300 rounded"
						onChange={(e) => setJob({ ...job, type: e.target.value })}
						defaultValue={values.type}
					>
						<option value="full-time">Teljes munkaidő</option>
						<option value="part-time">Rész munkaidő</option>
						<option value="internship">Gyakornok</option>
					</select>
					<label>City</label>
					<input
						type="text"
						name="city"
						placeholder="City"
						className="w-full p-2 my-2 border border-gray-300 rounded"
						defaultValue={values.city}
						onChange={(e) => setJob({ ...job, city: e.target.value })}
					/>
					<div className="flex items-center gap-5">
						<label>Home office</label>
						<input
							type="checkbox"
							name="homeOffice"
							className="p-2 w-6 h-6 border border-gray-300 rounded"
							defaultValue={values.homeOffice ? "checked" : ""}
							onChange={(e) => setJob({ ...job, homeOffice: e.target.checked })}
						/>
					</div>
					<div className="flex items-center justify-end gap-5">
						{!state ? (
							<button
								type="reset"
								className="w-1/4 p-2 my-2 bg-red-500 text-white rounded"
							>
								Reset
							</button>
						) : (
							<button
								type="button"
								className="w-1/4 p-2 my-2 bg-red-500 text-white rounded"
								onClick={() => navigate("/profile")}
							>
								Cancel
							</button>
						)}
						<button
							type="button"
							className="w-1/4 p-2 my-2 bg-blue-500 text-white rounded"
							onClick={state ? modifyJob : addJob}
						>
							{state ? "Modify" : "Add"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default InputJob;
