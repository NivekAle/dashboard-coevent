import DashboardHeadComponent from "../components/DashboardHeadCompontent/DashboardHeadCompontent";


export default function UsersPage() {

	return (
		<>

			<DashboardHeadComponent
				title="Usuários"
				description="Abaixo estão listados os usuários que estão cadastrados no nossos sistema."
				breadCrumb={
					{
						items: [
							{ label: "Usuários", link: "users" },
						],
					}}
			/>

		</>
	);

}