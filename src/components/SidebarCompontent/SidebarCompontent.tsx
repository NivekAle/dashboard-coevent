import { FaChartPie } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoBarChartSharp } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { useAuth } from "../../auth/useAuth";

export default function SidebarComponent() {

	const { logout } = useAuth();


	const handleSignOut = () => logout();

	const navItems = [
		{
			label: "Dashboard",
			link: "dashboard",
			icon: <FaChartPie className="w-6 h-6" fill="#f97316" />
		},
		{
			label: "Eventos",
			link: "events",
			icon: <IoTicket className="w-6 h-6" fill="#f97316" />

		},
		{
			label: "Organizações",
			link: "organizations",
			icon: <FaBuilding className="w-6 h-6" fill="#f97316" />
		},
		{
			label: "usuários",
			link: "users",
			icon: <FaUsers className="w-6 h-6" fill="#f97316" />
		},
		{
			label: "financeiro",
			link: "finances",
			icon: <IoBarChartSharp className="w-6 h-6" fill="#f97316" />
		},
	];

	return (
		<aside className="w-full h-full py-1 px-2">
			<div className="flex flex-col items-start justify-between h-full">
				<ul className="w-full m-0" id="dashboard-sidebar">
					{
						navItems.map((el) => (
							<li key={el.label}>
								<NavLink title={el.label} className="capitalize font-semibold text-zinc-700 p-4 hover:bg-slate-100 rounded-lg flex items-center gap-x-3 opacity-85 hover:opacity-100 transition-colors text-xs" to={el.link}>
									<span className="">
										{el.icon}
									</span>
									<span className="max-xl:text-[10px] max-w-20 text-ellipsis overflow-hidden">{el.label}</span>
								</NavLink>
							</li>
						))
					}
				</ul>
				<button onClick={() => handleSignOut()} className="text-center w-full py-3 hover:bg-red-500 hover:text-white transition-colors rounded-lg active:bg-red-100 active:text-red-500 font-semibold text-red-500 text-xs flex items-center justify-center gap-x-2">
					Logout
					<IoIosLogOut className="w-5 h-5" />
				</button>
			</div>
		</aside>
	);

}