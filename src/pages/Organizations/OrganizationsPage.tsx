import { Table, Checkbox, Select, Space } from "antd";
import type { CheckboxProps, TableProps } from 'antd';

import { MdAdd } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import DashboardHeadComponent from "../../components/DashboardHeadCompontent/DashboardHeadCompontent";
import { useEffect, useState } from "react";
import { organizationApi } from "../../api/OrganizationApi";
import Column from "antd/es/table/Column";
import TelephoneFormat from "../../utils/TelephoneFormat";
import RemoveOrganizationModal from "./RemoveOrganizationModal";

type DataSourceProps = {
	key: React.Key,
	id: number,
	name: string;
	email: string;
	telefone: string;
	status: boolean,
};

export default function OrganizationsPage() {

	/* Modal Remove */
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
	const [selectedOrgName, setSeletectedOrgName] = useState<string | null>(null);

	const showModal = (id: number, name: string) => {
		setSelectedOrgId(id);
		setSeletectedOrgName(name);
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedOrgId(null);
	};

	const handleOk = async () => {
		if (selectedOrgId !== null) {
			await organizationApi.remove(selectedOrgId);
			await fetchOrganizations();
		}
		setIsModalOpen(false);
		setSelectedOrgId(null);
		setSeletectedOrgName(null);
	};


	const fetchOrganizations = async () => {
		const response = await organizationApi.getAll();
		setDataSource(response);
	};

	const [dataSource, setDataSource] = useState<DataSourceProps[]>();

	useEffect(() => {
		fetchOrganizations();
	}, []);


	const onChangeInputCheckBox: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};

	const columns: TableProps<DataSourceProps>['columns'] = [
		{
			title: 'Nome',
			dataIndex: 'name',
			key: 'name',
			render: (_, { id, name }) => (
				<NavLink to={id.toString()} className="capitalize">
					{name}
				</NavLink>
			)
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
			render: (text) => TelephoneFormat(text)
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (_, { status }) => (
				<>
					{
						status ?
							<span className="ml-4 block w-2 h-2 bg-green-400 rounded-full outline outline-4 outline-green-200"></span> :
							<span className="ml-4 block w-2 h-2 bg-red-400 rounded-full outline outline-4 outline-red-200"></span>
					}
				</>
			)
		},
		{
			title: "Ações",
			dataIndex: "actions",
			key: "actions",
			render: (_, { id, name }) => (
				<Space>
					<button type="button" onClick={() => showModal(id, name)} className="bg-slate-100 p-2 hover:bg-orange-100 rounded-md hover:text-orange-400">
						<DeleteOutlined className="text-xl" />
					</button>
					<NavLink to={"edit/" + id.toString()} className="bg-slate-100 p-2 hover:bg-orange-100 rounded-md hover:text-orange-400">
						<EditOutlined className="text-xl" />
					</NavLink>
				</Space>
			),
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

			<RemoveOrganizationModal
				isModalOpen={isModalOpen}
				handleOk={handleOk}
				handleCancel={handleCancel}
				orgName={selectedOrgName}
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
								<MdAdd className="text-lg" />
								Adicionar Organização
							</Link>
						</div>
						<Table dataSource={dataSource} columns={columns} >
							<Column
								title="Action"
								key="action"
							/>
						</Table>
					</div>
				</div>
			</div>
		</>
	);

}