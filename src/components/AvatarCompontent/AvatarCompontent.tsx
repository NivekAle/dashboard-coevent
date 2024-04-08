import { FaRegCircleUser } from "react-icons/fa6";

export default function AvatarCompontent() {

	return (
		<div className="flex flex-row items-center gap-x-4">
			<FaRegCircleUser className="h-8 w-8" />
			<p>
				Admin
			</p>
		</div>
	);

}