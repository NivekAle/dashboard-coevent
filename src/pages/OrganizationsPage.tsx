import { Table, Checkbox, Select } from "antd";
import type { CheckboxProps } from 'antd';

import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

import DashboardHeadComponent from "../components/DashboardHeadCompontent/DashboardHeadCompontent";

export default function OrganizationsPage() {


	const onChangeInputCheckBox: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};

	const dataSource = [
		{
			key: '1',
			name: 'Mike',
			age: 32,
			address: '10 Downing Street',
		},
		{
			key: '2',
			name: 'John',
			age: 42,
			address: '10 Downing Street',
		},
	];

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
	];

	const handleChangeSelectElement = (value: string) => {
		console.log(`selected ${value}`);
	};

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

			<div className="grid grid-cols-12 gap-x-4">
				<div className="col-span-2">
					<div className="bg-white p-5 rounded-lg border-[1px] select-none">
						<h4 className="font-semibold text-xl mb-0">
							Filtrar
						</h4>
						<hr className="my-4" />
						<p className="mb-2 capitalize font-semibold text-sm">
							ordernar por:
						</p>
						<div className="flex flex-row gap-x-4">
							<div className="flex-1">
								<p className="text-xs mb-1">
									Nome
								</p>
								<Select
									defaultValue="lucy"
									className="w-full"
									onChange={handleChangeSelectElement}
									options={[
										{ value: 'A', label: 'A-z' },
										{ value: 'D', label: 'Z-a' },
									]}
								/>
							</div>
							<div className="flex-1">
								<p className="text-xs mb-1">
									Preço
								</p>
								<Select
									defaultValue="lucy"
									className="w-full"
									onChange={handleChangeSelectElement}
									options={[
										{ value: 'ASC', label: 'Maior' },
										{ value: 'DESC', label: 'Menor' },
										/* { value: 'disabled', label: 'Disabled', disabled: true }, */
									]}
								/>
							</div>
						</div>
						<hr className="my-4" />
						<p className="mb-2 capitalize font-semibold text-sm">
							status
						</p>
						<ul className="flex gap-y-3 flex-col pl-4">
							<li>
								<Checkbox onChange={onChangeInputCheckBox}>
									Em andamento
								</Checkbox>
							</li>
							<li>
								<Checkbox onChange={onChangeInputCheckBox}>
									Finalizados
								</Checkbox>
							</li>
							<li>
								<Checkbox onChange={onChangeInputCheckBox}>
									Previstos
								</Checkbox>
							</li>
						</ul>
					</div>
				</div>
				<div className="col-span-10">
					<div className="bg-white p-5 rounded-lg border-[1px]">
						<div className="flex flex-row justify-between items-center mb-4">
							<h4 className="font-semibold text-xl">
								Listagem
							</h4>
							<Link to={"/organizations/add"} className="flex flex-row gap-x-2 items-center py-3 px-6 text-center max-w-max bg-orange-500 text-white transition-colors rounded-lg active:bg-orange-100 active:text-orange-500 font-semibold text-xs">
								<MdAdd />
								Adicionar Organização
							</Link>
						</div>
						<Table dataSource={dataSource} columns={columns} />
					</div>
				</div>
			</div>
		</>
	);

}