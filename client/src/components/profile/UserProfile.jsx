import React, { useState } from "react";
import {
	useGetUserExperiencesQuery,
	useDeleteExperienceMutation,
	useModifyExperienceMutation,
	useAddExperienceMutation,
} from "../../store/api/experiencesApiSlice";
import { getStatusString } from "../../utils/utils";
import ExperienceDialog from "./ExperienceDialog";
import { parseExperience } from "../../utils/utils";

const UserProfile = ({ user }) => {
	const experiences = useGetUserExperiencesQuery();
	const [dialogOptions, setDialogOptions] = useState({
		open: false,
		type: "add",
		experience: {
			id: "",
			company: "",
			title: "",
			interval: "",
		},
	});
	const [hovered, setHovered] = useState(-1);
	const [deleteExperienceMutate] = useDeleteExperienceMutation();
	const [modifyExperienceMutate] = useModifyExperienceMutation();
	const [addExperienceMutate] = useAddExperienceMutation();

	const addExperience = async (experience) => {
		const response = await addExperienceMutate(parseExperience([experience]));
		experiences.refetch();
	};

	const deleteExperience = async (id) => {
		const response = await deleteExperienceMutate(id);
		experiences.refetch();
	};
	const modifyExperience = async (experience) => {
		const modifiedExperience = {
			...parseExperience([experience])[0],
			id: experience.id,
		};
		const response = await modifyExperienceMutate(modifiedExperience);
		experiences.refetch();
	};

	if (experiences.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-2/3 m-auto mt-10 shadow-md rounded-md p-10 min-w-fit">
			<h2 className="text-3xl font-bold">Személyes Adatok</h2>
			<p>Adataid és tapasztalataid egy helyen</p>
			<table className="w-full mt-5">
				<tbody>
					<tr className="bg-gray-100">
						<td className="p-2 w-5/12">Név</td>
						<td className="p-2 w-5/12" colSpan="2">
							{user.fullname}
						</td>
					</tr>
					<tr>
						<td className="p-2">E-mail</td>
						<td className="p-2" colSpan="2">
							{user.email}
						</td>
					</tr>
					<tr className="bg-gray-100">
						<td className="p-2">Státusz</td>
						<td className="p-2" colSpan="2">
							{getStatusString(user.role)}
						</td>
					</tr>
					<tr>
						<td className="p-2 font-bold">Tapasztalatok</td>
						<td className="p-2" colSpan="2">
							<button
								className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-700"
								onClick={() =>
									setDialogOptions({ open: true, type: "add", experience: {} })
								}
							>
								Új tapasztalat
							</button>
						</td>
					</tr>
					{experiences.data.data.map((exp, index) => {
						return (
							<tr
								key={exp.id}
								className={`${index % 2 == 0 && "bg-gray-100"} py-2 h-12`}
								onMouseEnter={() => setHovered(index)}
								onMouseLeave={() => setHovered(-1)}
							>
								<td className="px-2">{exp.company}</td>
								<td className="px-2">
									{exp.interval} {exp.title}
								</td>
								<td className="px-2 w-1/6">
									{hovered === index ? (
										<div className="flex justify-end w-full p-1 gap-1">
											<button
												type="button"
												className="bg-blue-500 text-white p-1 rounded hover:bg-blue-700"
												onClick={() =>
													setDialogOptions({
														open: true,
														type: "modify",
														experience: exp,
													})
												}
											>
												{"\u270E"}
											</button>
											<button
												type="button"
												className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
												onClick={() => deleteExperience(exp.id)}
											>
												{"\u2716"}
											</button>
										</div>
									) : (
										""
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{/*New experience*/}
			<ExperienceDialog
				open={dialogOptions.open}
				handleClose={() => setDialogOptions({ ...dialogOptions, open: false })}
				values={{
					company: dialogOptions.experience.company ?? "",
					title: dialogOptions.experience.title ?? "",
					startYear: dialogOptions.experience.interval?.split("-")[0] ?? "",
					endYear: dialogOptions.experience.interval?.split("-")[1] ?? "",
				}}
				onSubmit={(experience) => {
					if (dialogOptions.type === "add") {
						addExperience(experience);
					} else if (dialogOptions.type === "modify") {
						experience.id = dialogOptions.experience.id;
						modifyExperience(experience);
					}
					setDialogOptions({ ...dialogOptions, open: false });
				}}
			/>
		</div>
	);
};

export default UserProfile;
