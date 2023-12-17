import { Form, Input, Modal } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface Props {
  shouldShowModal: boolean;
  onSubmit: (token: String) => void;
  onCancel: () => void;
}

const AuthModal = ({ shouldShowModal, onSubmit, onCancel }: Props) => {
  const [form] = Form.useForm();

  const onFormSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values.token);
    });
  };

  return (
    <Modal
      title="Github Authentication Token"
      centered
      okText="Save"
      cancelText="Cancel"
      open={shouldShowModal}
      onOk={onFormSubmit}
      onCancel={onCancel}
    >
      <Form form={form} name="auth_form" initialValues={{ token: "" }}>
        <Form.Item
          name="token"
          label="token"
          rules={[
            {
              required: true,
              message: "Please provide your github access token",
            },
          ]}
        >
          <Input.Password
            placeholder="Github Token"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthModal;