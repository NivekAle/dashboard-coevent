import { Modal } from "antd";

type ActiveOrganizationModalProps = {
	isModalOpen: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	orgName: string | null;
};

export default function ActiveOrganizationModal({
	isModalOpen,
	handleOk,
	handleCancel,
	orgName
}: ActiveOrganizationModalProps) {
	return (
		<Modal
			title="Confirmar Ativação"
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			okText="Sim, ativar"
			cancelText="Cancelar"
		>
			<p>
				Você tem certeza que deseja ativar a organização <strong>{orgName}</strong>
				?
			</p>
		</Modal >
	);
}
