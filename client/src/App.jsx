import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import InputJob from "./pages/InputJob";
import JobView from "./pages/JobView";
import { selectLoggedInUser } from "./store/authSlice/authSlice";
import { useSelector } from "react-redux";

function App() {
	const user = useSelector(selectLoggedInUser);
	return (
		//<div>asd</div>;
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path="profile" element={<Profile />} />
					<Route path="inputjob" element={<InputJob />} />
					<Route path="jobs/:jobId" element={<JobView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
