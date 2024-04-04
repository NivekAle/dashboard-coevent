import { Outlet } from "react-router-dom";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import SidebarComponent from "../SidebarCompontent/SidebarCompontent";


export default function TemplateCompontent() {

	return (
		<div className="h-screen">
			<div className="grid grid-cols-12 h-full grid-rows-12 gap-0">
				<HeaderComponent />
				<div className="col-span-1 max-2xl:col-span-2 row-span-12">
					<SidebarComponent />
				</div>
				<div className="col-span-11 max-2xl:col-span-10 row-span-12 bg-slate-100 p-4 4 block min-h-max overflow-auto">
					<Outlet />
				</div>
			</div>
		</div>

	);

}