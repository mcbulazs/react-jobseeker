export const getStatusString = (status) => {
	switch (status) {
		case "jobseeker":
			return "Munkakereső";
		case "company":
			return "Munkáltató";
		default:
			return "Ismeretlen";
	}
};
export const getJobTypeString = (jobType) => {
	switch (jobType) {
		case "full-time":
			return "Teljes munkaidő";
		case "part-time":
			return "Rész munkaidő";
		case "internship":
			return "Gyakornok";
		default:
			return "Ismeretlen";
	}
};
export const parseExperience = (experiences) => {
	return experiences.map((exp) => {
		return {
			company: exp.company,
			title: exp.title,
			interval: exp.startYear + "-" + exp.endYear,
		};
	});
};
