import {Form, Input, Modal} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface Props {
    shouldShowModal: boolean;
    onSubmit: (token: String) => void;
    onCancel: () => void;
}

const AuthModal = ({shouldShowModal, onSubmit, onCancel}: Props) => {
    console.log(shouldShowModal, onCancel, onSubmit);
}