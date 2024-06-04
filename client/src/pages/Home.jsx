import JobView from "../pages/JobView";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<Link to="/jobs/19">Job 1</Link>
		</div>
	);
};

export default Home;
