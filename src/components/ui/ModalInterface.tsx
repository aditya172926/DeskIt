import { Modal } from "antd";
import { ReactNode } from "react";
import { Nullable } from "../../types";

interface Props {
  title: string;
  centered: boolean;
  okText: string;
  cancelText?: string;
  onOk: () => void;
  onCancel?: () => void;
  open: boolean;
  detailLayout: Nullable<ReactNode>;
}

const ModalInterface = ({
  title,
  centered,
  okText,
  cancelText,
  onOk,
  onCancel,
  open,
  detailLayout,
}: Props) => {
  return (
    <Modal
      title={title}
      centered={centered}
      okText={okText}
      cancelText={cancelText ? cancelText : "Cancel"}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      {detailLayout}
    </Modal>
  );
};

export default ModalInterface;
