import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardHeadComponent from "../../components/DashboardHeadCompontent/DashboardHeadCompontent";


export default function OrganizationDetailsPage() {

	const { id } = useParams(); // Obtém o ID do parâmetro dinâmico da URL

	useEffect(() => {

		console.log(id);

	}, []);

	return (
		<>

			<DashboardHeadComponent
				title="Organizações"
				description="Visualize abaixo todas as organizações registradas no sistema."
				breadCrumb={
					{
						items: [
							{ label: "Organizações", link: "organizations" }
						],
					}}
			/>

		</>
	);
}