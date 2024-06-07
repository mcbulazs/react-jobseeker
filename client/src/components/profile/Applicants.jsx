import { useApplicantsForJobQuery } from "../../store/api/applicantsApiSlice";
const Applicants = ({ jobId }) => {
	const applicants = useApplicantsForJobQuery(jobId);
	if (applicants.isLoading) {
		return <div>Loading...</div>;
	}
	console.log(applicants);
	return (
		<div className="m-10">
			<table className="w-2/3 m-auto mt-10 shadow-md rounded-md">
				<thead>
					<tr className="bg-gray-200">
						<th>Név</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{applicants.data?.map((applicant) => (
						<tr key={applicant.user.id} className="hover:bg-gray-100">
							<td className="text-center">{applicant.user.fullname}</td>
							<td className="text-center">{applicant.user.email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default Applicants;
