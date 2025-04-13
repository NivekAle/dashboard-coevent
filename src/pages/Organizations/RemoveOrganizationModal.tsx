import { Modal } from "antd";

type RemoveOrganizationModalProps = {
	isModalOpen: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	orgName: string | null;
};

export default function RemoveOrganizationModal({
	isModalOpen,
	handleOk,
	handleCancel,
	orgName
}: RemoveOrganizationModalProps) {
	return (
		<Modal
			title="Confirmar Desativação"
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			okText="Sim, desativar"
			cancelText="Cancelar"
		>
			<p>
				Você tem certeza que deseja remover a organização <strong>{orgName}</strong>
				?
			</p>
		</Modal >
	);
}
