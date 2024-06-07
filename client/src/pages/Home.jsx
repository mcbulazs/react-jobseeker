import JobView from "../pages/JobView";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
	useAllJobsQuery,
	useJobsSkipLimitQuery,
} from "../store/api/jobsApiSlice";
import Filter from "../components/home/Filter";

const defaultValues = {
	salaryFrom: null,
	salaryTo: null,
	type: [],
	city: null,
	homeOffice: null,
	search: null,
};
const PAGE_SIZE = 10;
const Home = () => {
	const [filter, setFilter] = useState(defaultValues);
	const [filterOpen, setFilterOpen] = useState(false);
	const [filteredJobs, setFilteredJobs] = useState(null);

	const [hasMore, setHasMore] = useState(true);
	const [isFetching, setIsFetching] = useState(false);
	const [page, setPage] = useState(0);

	const [jobs, setJobs] = useState([]);
	const { data, error, isLoading } = useJobsSkipLimitQuery({
		limit: PAGE_SIZE,
		skip: page * PAGE_SIZE,
	});

	useEffect(() => {
		if (data?.data) {
			setJobs((prevJobs) => [...prevJobs, ...data.data]);
			if (data.data.length < PAGE_SIZE) {
				setHasMore(false);
			}
			setIsFetching(false);
		}
	}, [data]);

	const handleScroll = useCallback(() => {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight ||
			isLoading ||
			!hasMore ||
			isFetching
		) {
			return;
		}
		setIsFetching(true);
		setPage((prevPage) => prevPage + 1);
	}, [isLoading, hasMore, isFetching]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);
	const filterJobs = useCallback(() => {
		setFilteredJobs(
			jobs.filter((job) => {
				if (
					filter.search &&
					!job.company.toLowerCase().includes(filter.search.toLowerCase()) &&
					!job.position.toLowerCase().includes(filter.search.toLowerCase())
				) {
					return false;
				}
				if (filter.salaryFrom && job.salaryFrom < filter.salaryFrom) {
					return false;
				}
				if (filter.salaryTo && job.salaryTo > filter.salaryTo) {
					return false;
				}
				if (filter.type.length && !filter.type.includes(job.type)) {
					return false;
				}
				if (filter.city && !job.city.includes(filter.city)) {
					return false;
				}
				if (
					filter.homeOffice !== null &&
					job.homeOffice !== filter.homeOffice
				) {
					return false;
				}
				return true;
			}),
		);
	}, [filter, jobs]);

	useEffect(() => {
		filterJobs();
	}, [jobs, filter]);

	return (
		<div className="">
			<h1 className="w-full flex px-10 items-center h-24 text-4xl font-bold shadow-md">
				Főoldal
			</h1>
			<div className="w-3/5 m-auto shadow-md rounded-md p-10">
				<h2 className="text-2xl font-bold">Böngészés állások között:</h2>
				<div className="flex mx-5 my-5 gap-2 justify-center flex-wrap">
					<input
						type="text"
						placeholder="Keresés"
						className="p-2 border border-gray-300 rounded w-2/3 min-w-24"
						onChange={(e) =>
							setFilter({
								...filter,
								search: e.target.value === "" ? null : e.target.value,
							})
						}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								filterJobs();
							}
						}}
					/>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => filterJobs()}
					>
						{String.fromCodePoint("0x1F50E")} Keresés
					</button>
					<div className="relative">
						<button
							onClick={() => setFilterOpen(!filterOpen)}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							{String.fromCodePoint("0x29E8")} Szűrők
						</button>
						<Filter
							filter={filter}
							setFilter={setFilter}
							filterOpen={filterOpen}
						/>
					</div>
				</div>
				<div>
					{filteredJobs?.map((job) => (
						<Link to={`/jobs/${job.id}`} key={job.id}>
							<div className="flex justify-between p-3 my-2 gap-2 border border-gray-300 rounded">
								<div className="flex flex-col justify-between">
									<p className="font-bold">{job.position}</p>
									<p className="text-gray-400">{job.city}</p>
								</div>
								<div className="flex flex-col justify-between">
									<p className="">
										{job.salaryFrom} - {job.salaryTo} Ft
									</p>
									<p className="text-gray-400">{job.type}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
