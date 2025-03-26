import { Table, Checkbox, Select, Space } from "antd";
import type { CheckboxProps, TableProps } from 'antd';

import { MdAdd } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

import DashboardHeadComponent from "../../components/DashboardHeadCompontent/DashboardHeadCompontent";
import { useEffect, useState } from "react";
import { organizationApi } from "../../api/OrganizationApi";
import Column from "antd/es/table/Column";

type DataSourceProps = {
	key: React.Key,
	id: number,
	name: string;
	email: string;
	telefone: string;
};

export default function OrganizationsPage() {

	const [dataSource, setDataSource] = useState<DataSourceProps[]>();

	useEffect(() => {

		async function getAllOrganizations() {
			const response = await organizationApi.getAll();
			setDataSource(response);
			console.log(response);
		}

		getAllOrganizations();

	}, []);


	const onChangeInputCheckBox: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};

	/* const dataSource = [
		{
			key: '1',
			name: 'Mike',
			telefone: 32,
			email: '10 Downing Street',
		},
		{
			key: '2',
			name: 'John',
			telefone: 42,
			email: '10 Downing Street',
		},
	]; */

	/* const dataSource = [
		{}
	]; */

	const columns: TableProps<DataSourceProps>['columns'] = [
		{
			title: 'Nome',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Telefone',
			dataIndex: 'telephone',
			key: 'telephone',
		},
		{
			title: "Ações",
			dataIndex: "actions",
			key: "actions",
			render: (_, { id }) => (
				<NavLink to={id.toString()}>
					Veja mais
				</NavLink>
			),
		}

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
						<Table dataSource={dataSource} columns={columns} >
							<Column
								title="Action"
								key="action"
								render={(_: any, record: DataSourceProps) => (
									<Space size="middle">
										<a>Invite {record.email}</a>
										<a>Delete</a>
									</Space>
								)}
							/>
						</Table>
					</div>
				</div>
			</div>
		</>
	);

}