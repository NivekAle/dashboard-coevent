import { FaBell } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { NavLink } from "react-router-dom";
import AvatarCompontent from "../AvatarCompontent/AvatarCompontent";

export default function HeaderComponent() {
	return (
		<div className="col-span-12 py-1 px-4">
			<div className="grid grid-cols-12 items-center h-full">
				<div className="col-span-1 max-[1880px]:col-span-2 max-2xl:col-span-2 h-max row-span-1">
					<strong className="font-bold text-3xl">
						LOGO
					</strong>
				</div>
				<div className="col-span-11 max-[1880px]:col-span-10 max-2xl:col-span-10 h-max row-span-1">
					<div className="flex flex-row items-center justify-between">
						<div className="py-2 px-4 bg-slate-100 rounded-lg w-max">
							<input type="text" placeholder="Search..." className="bg-transparent placeholder:text-slate-400 focus:outline-none font-normal" />
						</div>
						<div className="flex flex-row gap-x-4 items-center">
							<ul className="flex flex-row gap-x-4">
								<li>
									<FaBell className="w-5 h-5" />
								</li>
								<li>
									<NavLink to={"../my-settings"}>
										<IoMdSettings className="w-5 h-5" />
									</NavLink>
								</li>
							</ul>
							<hr className="h-9 w-[.4px] bg-slate-400 block box-border" />
							<AvatarCompontent />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}