import React, { useState } from 'react';
import { Button, Modal, Select } from 'antd';


type ModalSelectOrganizationProps = {
	getOptionSelected: (id_option: number) => void;
};


export default function ModalSelectOrganization({ getOptionSelected }: ModalSelectOrganizationProps) {
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState('Content of the modal');
	const [option, setOption] = useState<number | null>(null);

	const showModal = () => {
		setOpen(true);
	};

	const handleOk = () => {
		setModalText('The modal will be closed after two seconds');
		setConfirmLoading(true);
		if (option) {
			getOptionSelected(option);
			setTimeout(() => {
				setOpen(false);
				setConfirmLoading(false);
			}, 2000);
		}
	};

	const handleCancel = () => {
		console.log('Clicked cancel button');
		setOpen(false);
	};

	/* Eventos do select */
	const onChange = (value: number) => {
		setOption(value);
		console.log(`selected ${value}`);
	};

	const onSearch = (value: string) => {
		console.log('search:', value);
	};


	return (
		<>
			<Button type='primary' onClick={showModal} className="h-auto text-xs font-semibold bg-slate-50 px-6 py-3 text-orange-600 hover:bg-orange-600 hover:text-white rounded-md">
				Vincular a uma organização
			</Button>

			<Modal
				title="Title"
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<p>
					Selecione a organização que é responsável pelo evento!
				</p>
				<Select
					className='my-3'
					showSearch
					placeholder="Select a person"
					optionFilterProp="label"
					onChange={onChange}
					onSearch={onSearch}
					options={[
						{
							value: 1,
							label: 'Cena 2k25',
						},
						{
							value: 2,
							label: 'Tomorrowland',
						},
						{
							value: 3,
							label: 'Brahma',
						},
					]}
				/>
			</Modal>
		</>
	);
}
