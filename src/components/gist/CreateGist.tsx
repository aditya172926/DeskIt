import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GistInput, NewGistResponse } from "../../types";
import { invoke } from "@tauri-apps/api/tauri";
import { getErrorMessage } from "../../helper";

const CreateGist = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const onFinish = async (values: GistInput) => {
    const { description, files, isPublic } = values;
    const gist = {
      description,
      public: !!isPublic,
      files: files.reduce(
        (accumulator, { filename, content }) =>
          Object.assign(accumulator, { [filename]: content }),
        {}
      ),
    };
    console.log(gist);

    try {
      const response: NewGistResponse = await invoke("create_new_gist", {
        gist,
        token,
      });
      setTimeout(() => {
        navigate("/gists/private");
      }, 3000);
    } catch (error) {
    }
  };

  return (
    <>
    <><p>Create gist</p></>
      {/* <Card title="Create a new Gist">
        <Form name="gist" onFinish={onFinish} autoComplete="off">
          <Form.Item name="description">
            <Input placeholder="Gist description..." />
          </Form.Item>
          <Form.Item
            label="Make Gist Public"
            valuePropName="checked"
            name="isPublic"
          >
            <Switch />
          </Form.Item>
          <Form.List
            name="files"
            rules={[
              {
                validator: async (_, files) => {
                  if (!files || files.length < 1) {
                    return Promise.reject(
                      new Error("Atlease 1 file is required to create a Gist")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field) => (
                  <div key={field.key}>
                    <Form.Item
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.area !== curValues.area ||
                        prevValues.sights !== curValues.sights
                      }
                    >
                      {() => (
                        <div>
                          <Divider />
                          <Form.Item
                            {...field}
                            name={[field.name, "filename"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing Filename",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              placeholder="Filename including extension..."
                              style={{ width: "90%", marginRight: "5px" }}
                            />
                          </Form.Item>
                          <DeleteTwoTone
                            style={{
                              fontSize: "30px",
                              verticalAlign: "middle",
                            }}
                            twoToneColor="#eb2f96"
                            onClick={() => remove(field.name)}
                          />
                        </div>
                      )}
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "content"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Content",
                        },
                      ]}
                      noStyle
                    >
                      <Input.TextArea rows={20} placeholder="Gist content" />
                    </Form.Item>
                  </div>
                ))}
                <Form.Item wrapperCol={{ offset: 10 }}>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add File
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item wrapperCol={{offset: 10}}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
          </Form.Item>
        </Form>
      </Card> */}
    </>
  );
};

export default CreateGist;