import DashboardHeadCompontent from "../components/DashboardHeadCompontent/DashboardHeadCompontent";
import { FormEvent } from "react";

export default function AddOrganizationPage() {

	const handleForm = (event: FormEvent) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		// Aqui você pode trabalhar com o objeto FormData, como enviar para o servidor ou fazer outras operações.

		// Exemplo de uso:
		for (const [name, value] of formData.entries()) {
			console.log(name, value);
		}
	}

	return (
		<>
			<DashboardHeadCompontent
				title="Adicionar uma Organização"
				description="Lembre que a organização precisa estar ciente deste cadastro e que recomendamos que o cadastro só ocorra se caso estaja havendo algum problema com o cadastro da organização."
				breadCrumb={
					{
						items: [
							{ label: "Organizações", link: "../organizations" }
						],
						currentPage: "Adicionar"
					}}
			/>

			<form onSubmit={handleForm}>
				<div className="grid grid-cols-12 gap-x-4 mb-4">
					<div className="col-span-6">
						<div className="bg-white py-6 px-8 rounded-lg border-[1px]">
							<div className="my-3">
								<label htmlFor="">
									<span className="block mb-1">
										name
									</span>
									<input type="text" name="name" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="name" />
								</label>
							</div>
							<div className="my-3">
								<label htmlFor="">
									<span className="block mb-1">
										email
									</span>
									<input type="text" name="email" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="email" />
								</label>
							</div>
							<div className="my-3">
								<label htmlFor="">
									<span className="block mb-1">
										cnpj
									</span>
									<input type="text" name="cnpj" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="cnpj" />
								</label>
							</div>
							<div className="my-3">
								<label htmlFor="">
									<span className="block mb-1">
										telephone
									</span>
									<input type="text" name="telephone" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="telephone" />
								</label>
							</div>
							<div className="my-3">
								<label htmlFor="">
									<span className="block mb-1">
										password
									</span>
									<input type="text" name="password" className="focus:border-orange-300 block w-full bg-slate-50 outline-none py-2 px-4 rounded-lg border-[1px] text-sm" placeholder="password" />
								</label>
							</div>
						</div>
					</div>
				</div>
				<button type="submit" className="flex flex-row gap-x-2 items-center py-3 px-6 text-center max-w-max bg-orange-500 text-white transition-colors rounded-lg active:bg-orange-100 active:text-orange-500 font-semibold text-xs">
					Adicionar Evento
				</button>
			</form>
		</>
	);
}