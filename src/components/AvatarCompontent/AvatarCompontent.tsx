import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from "../../auth/useAuth";

export default function AvatarComponent() {
	const { user } = useAuth();

	return (
		<div className="flex flex-row items-center gap-x-4">
			<FaRegCircleUser className="h-8 w-8" />
			<p>
				{user?.name ?? "Usuário"}
			</p>
		</div>
	);
}
