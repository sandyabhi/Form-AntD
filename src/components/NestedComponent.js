import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";

export const NestedForm = ({ field }) => {
  return (
    <div
      style={{
        width: "100%",
        marginLeft: "30px",
        paddingLeft: "20px",
        marginBottom: "15px",
        borderRadius: "5px",
        borderLeft: "solid 5px grey",
      }}
    >
      <Form.Item>
        <Form.List name={[field.name, "list"]}>
          {(subFields, { add, remove }) => (
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 16 }}
            >
              {subFields.map((subField) => (
                <div
                  key={subField.key}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Item name={[subField.name, "first"]}>
                    <Input placeholder="Field Name" />
                  </Form.Item>
                  <Form.Item key={field.key} name={[subField.name, "type"]}>
                    <Select value="string" placeholder="Field Type">
                      {["string", "number", "nested"].map((selectedType) => (
                        <>
                          <Select.Option value={selectedType}>
                            {selectedType}
                          </Select.Option>
                        </>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="reset"
                      type="primary"
                      style={{ backgroundColor: "orangered" }}
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(subField.name)}
                    >
                      Remove
                    </Button>
                  </Form.Item>
                </div>
              ))}
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => add()}
                block
              >
                Add Sub Item
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>
    </div>
  );
};
