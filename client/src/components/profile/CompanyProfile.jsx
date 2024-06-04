import { Link } from "react-router-dom";
import {
	useJobsByUserQuery,
	useDeleteJobMutation,
} from "../../store/api/jobsApiSlice";

const CompanyProfile = ({ user }) => {
	const [deleteJobMutate] = useDeleteJobMutation();
	const jobsByUserQuery = useJobsByUserQuery(user.id);
	if (jobsByUserQuery.isLoading) {
		return <div>Loading...</div>;
	}

	const data = jobsByUserQuery.data?.data;
	const jobs = data.map((job) => {
		return {
			...job,
			homeOffice: data?.homeOffice == 1,
		};
	});
	console.log(jobs);
	const deleteJob = async (id) => {
		const response = await deleteJobMutate(id);
		jobsByUserQuery.refetch();
	};
	return (
		<div className="flex justify-center flex-col">
			<div className="w-full m-auto mt-10 shadow-md rounded-md p-5 min-w-fit flex justify-between items-center">
				<h2 className="text-2xl font-bold">Állás hirdetéseid</h2>
				<button
					onClick={() => jobsByUserQuery.refetch()}
					className="bg-gray-500 h-10 text-white p-1 rounded hover:bg-blue-700 aspect-square text-xl"
				>
					{"\u21BB"}
				</button>
			</div>
			{jobs.map((job) => {
				return (
					<div
						key={job.id}
						className="bg-gray-100 flex border p-3 my-2 rounded-md"
					>
						<div className="w-1/2">
							<h2 className="text-2xl font-bold">{job.position}</h2>
							<div className="flex gap-5">
								<span className="text-gray-400">
									{String.fromCodePoint("0x1F4BC")}
									{job.type}
								</span>
								<span className="text-gray-400">
									<span className="rotate-180 inline-block">
										{String.fromCodePoint("0x1F322")}
									</span>
									{job.city}
								</span>
								<span className="text-gray-400">
									{String.fromCodePoint("0x1F4B0")}
									{job.salaryFrom} - {job.salaryTo}
								</span>
							</div>
						</div>
						<div className="w-1/2 flex gap-3 items-center justify-end">
							<Link
								className="border-2 p-2 rounded hover:bg-gray-200"
								to="/inputjob"
								state={{ job }}
							>
								{"\u270E"} Szerkesztés
							</Link>
							<Link
								className="border-2 p-2 rounded hover:bg-gray-200"
								to={`/jobs/${job.id}`}
							>
								{String.fromCodePoint("0x1F517")}
								Megtekintés
							</Link>
							<button
								className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
								onClick={() => deleteJob(job.id)}
							>
								Törlés
							</button>
						</div>
					</div>
				);
			})}
			<Link
				to="/inputjob"
				className="rounded-md bg-blue-500 text-white p-2 my-2 w-1/4 m-auto text-center hover:bg-blue-700"
			>
				Add Job
			</Link>
		</div>
	);
};

export default CompanyProfile;
