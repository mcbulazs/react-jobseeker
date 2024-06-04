import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import React, { useState } from "react";
const defaultValues = {
	company: "",
	title: "",
	startYear: 0,
	endYear: 0,
};
const ExperienceDialog = ({
	open,
	handleClose,
	values = defaultValues,
	onSubmit,
}) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				component: "form",
				onSubmit: (event) => {
					event.preventDefault();
					const formData = new FormData(event.currentTarget);
					const formJson = Object.fromEntries(formData.entries());
					onSubmit(formJson);
					handleClose();
				},
			}}
		>
			<DialogTitle>
				{values.companyName ? "Modify" : "Add"} experience
			</DialogTitle>
			<DialogContent className="flex gap-2">
				<input
					type="text"
					name="company"
					placeholder="Munkahely neve"
					defaultValue={values.company}
					className="w-full p-2 my-2 border border-gray-300 rounded"
				/>
				<input
					type="text"
					name="title"
					placeholder="Munkakör"
					defaultValue={values.title}
					className="w-full p-2 my-2 border border-gray-300 rounded"
				/>
				<input
					type="number"
					name="startYear"
					placeholder="Kezdés éve"
					defaultValue={values.startYear}
					className="w-full p-2 my-2 border border-gray-300 rounded"
				/>
				<input
					type="number"
					name="endYear"
					placeholder="Befejezés éve"
					defaultValue={values.endYear}
					className="w-full p-2 my-2 border border-gray-300 rounded"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button type="submit">Accept</Button>
			</DialogActions>
		</Dialog>
	);
};
export default ExperienceDialog;
