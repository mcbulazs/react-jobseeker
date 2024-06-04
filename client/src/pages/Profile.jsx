import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../store/authSlice/authSlice";
import UserProfile from "../components/profile/UserProfile";
import CompanyProfile from "../components/profile/CompanyProfile";

const Profile = () => {
	const user = useSelector(selectLoggedInUser);
	if (user === null) {
		return <div>Not logged in</div>;
	}

	return (
		<div>
			<h1 className="w-full flex px-10 items-center h-24 text-4xl font-bold shadow-md">
				Profil
			</h1>
			<div className="w-2/3 m-auto">
				{user.role === "company" ? (
					<CompanyProfile user={user} />
				) : (
					<UserProfile user={user} />
				)}
			</div>{" "}
		</div>
	);
};

export default Profile;
