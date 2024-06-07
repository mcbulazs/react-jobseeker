import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/react.svg";
import { selectLoggedInUser, logout } from "../store/authSlice/authSlice";

const Layout = () => {
	const user = useSelector(selectLoggedInUser);
	const dispatch = useDispatch();
	return (
		<>
			<nav className="p-3 flex items-center gap-10 bg-gray-700 text-white font-bold">
				<NavLink to="/">
					<img src={Logo} />
				</NavLink>
				{!user && <NavLink to="register">Regisztráció</NavLink>}
				{!user && <NavLink to="login">Bejelentkezés</NavLink>}
				{user && user.role == "company" && (
					<NavLink to="inputjob">Állás hozzáadása</NavLink>
				)}
				{user && <NavLink to="profile">Profilom</NavLink>}
				{user && (
					<NavLink to="/" onClick={() => dispatch(logout())}>
						Kijelentkezés
					</NavLink>
				)}
			</nav>
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
