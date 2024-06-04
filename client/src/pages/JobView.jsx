import { useParams } from "react-router-dom";
import { useJobQuery } from "../store/api/jobsApiSlice";
import { getJobTypeString } from "../utils/utils";
import { selectLoggedInUser } from "../store/authSlice/authSlice";
import { useSelector } from "react-redux";
import { useApplyForJobMutation } from "../store/api/applicantsApiSlice";

const JobView = () => {
	const { jobId } = useParams();
	const user = useSelector(selectLoggedInUser);
	const result = useJobQuery(jobId);
	const [applyForJobMutate] = useApplyForJobMutation();
	if (result.isLoading) {
		return <div>Loading...</div>;
	}
	const job = result.data;
	console.log(job);
	const applyForJob = async () => {
		const response = await applyForJobMutate(parseInt(jobId));
	};
	return (
		<div>
			<div className="w-full flex px-10  items-center justify-between h-24 shadow-md">
				<div className="flex items-center gap-10">
					<h1 className="text-3xl font-bold">{job.position}</h1>
					{job.homeOffice != 0 && (
						<span className="text-emerald-700 font-bold rounded-full bg-emerald-200 px-2">
							{String.fromCodePoint("0x1F3E0")} Home Office
						</span>
					)}
				</div>
				<div className="flex flex-col">
					<span className="text-right font-bold">
						{job.salaryFrom} - {job.salaryTo} $
					</span>
					<span className="text-gray-400">{getJobTypeString(job.type)}</span>
				</div>
			</div>
			<table className="w-2/3 m-auto mt-10 shadow-md rounded-md">
				<tbody>
					<tr>
						<td colSpan="2">
							<div className="m-auto p-5 flex justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl">Állás részletei</h2>
									{user?.role == "jobseeker" && (
										<span className="text-gray-400">
											Megtetszett a lehetőség? Jelentkezz!
										</span>
									)}
								</div>
								{user?.role == "jobseeker" && (
									<button
										className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 h-10"
										onClick={() => applyForJob()}
									>
										Jelentkezés
									</button>
								)}
							</div>
						</td>
					</tr>
					<tr className="py-2 bg-gray-100">
						<td className="w-1/3 p-5">Cég neve</td>
						<td className="w-2/3 p-5 font-bold">{job.company}</td>
					</tr>
					<tr className="py-2">
						<td className="p-5">Pozíció</td>
						<td className="p-5 font-bold">{job.position}</td>
					</tr>
					<tr className="py-2 bg-gray-100">
						<td className="p-5">Leírás</td>
						<td className="p-5 font-bold break-all">{job.description}</td>
					</tr>
					<tr className="py-2">
						<td className="p-5">Fizetési sáv</td>
						<td className="p-5 font-bold">
							{job.salaryFrom} - {job.salaryTo}$
						</td>
					</tr>
					<tr className="py-2 bg-gray-100">
						<td className="p-5">Foglalkoztatás típusa</td>
						<td className="p-5 font-bold">{getJobTypeString(job.type)}</td>
					</tr>
					<tr className="py-2">
						<td className="p-5">Település</td>
						<td className="p-5 font-bold">{job.city}</td>
					</tr>
					<tr className="py-2 bg-gray-100">
						<td className="p-5">Home Office</td>
						<td className="p-5 font-bold">
							{job.homeOffice ? "Van" : "Nincs"}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
export default JobView;
