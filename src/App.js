import React, { useCallback, useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import Paragraph from "antd/es/skeleton/Paragraph";
import Operation from "antd/es/transfer/operation";

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };

const App = () => {
  const [form] = Form.useForm();

  const [val, setVal] = useState("string");
  const handleChange = (value) => {
    if (value === "nested") {
      console.log("--nested--");
      setVal("nested");
      return (
        <>
          <NestedComponent />
        </>
      );
    }
  };

  const convert = (data) => {
    if (data === undefined) return data;
    console.log(JSON.stringify(data));

    const transformedArray = data?.map((item) => {
      const newObj = {};
      if (item === undefined) return newObj;
      newObj[item.first] = item.gender;
      return newObj;
    });

    const mergedObject = Object.assign({}, ...transformedArray);

    return mergedObject;
  };

  return (
    <>
      <Form
        form={form}
        initialValues={{
          items: [{}],
        }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 16,
                  }}
                >
                  <Form.Item
                    name={[field.name, "first"]}
                    label={`${index} Student`}
                  >
                    <Input placeholder="Enter name" />
                  </Form.Item>
                  <Form.Item key={field.key} name={[field.name, "gender"]}>
                    <Select
                      onChange={handleChange}
                      value="string"
                      placeholder="type"
                    >
                      {["string", "number", "nested"].map((t) => (
                        <>
                          <Select.Option value={t} key={t}>
                            {t}
                          </Select.Option>
                        </>
                      ))}
                    </Select>
                  </Form.Item>
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                  {val === "nested" ? (
                    <>
                      <NestedComponent field={field} />
                    </>
                  ) : (
                    <></>
                  )}
                  {/* Component */}
                  {/* <NestedComponent field={field} /> */}
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  block
                  onClick={() => {
                    add();
                  }}
                >
                  Add
                </Button>
                <Button htmlType="reset">Reset</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>
                {/* {JSON.stringify(convert(form.getFieldsValue().items), null, 2)} */}
                {JSON.stringify(form.getFieldsValue(), null, 2)}
              </pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default App;

const NestedComponent = ({ field }) => {
  return (
    <>
      <Form.Item label="List">
        <Form.List name={[field.name, "list"]}>
          {(subFields, subOpt) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 16,
              }}
            >
              {subFields.map((subField) => (
                <Space key={subField.key}>
                  <>
                    <Form.Item
                      noStyle
                      // name={[subField.name, "first"]}
                      name={[field.name, "nested"]}
                    >
                      <Input placeholder="first" />
                    </Form.Item>
                    <Form.Item>
                      {["string", "number"].map((t) => (
                        <>
                          <Select.Option value={t} key={t}>
                            {t}
                          </Select.Option>
                        </>
                      ))}
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </>
                </Space>
              ))}
              <Button type="dashed" onClick={() => subOpt.add()} block>
                + Add Sub Item
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>
    </>
  );
};

const SelectComponent = ({ field }) => {
  return (
    <>
      <Form.Item label="List">
        <Form.List name={[field.name, "list"]}>
          {(subFields, subOpt) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 16,
              }}
            >
              {subFields.map((subField) => (
                <Space key={subField.key}>
                  <>
                    <Form.Item
                      noStyle
                      // name={[subField.name, "first"]}
                      name={[field.name, "nested"]}
                    >
                      <Input placeholder="first" />
                    </Form.Item>
                    <Form.Item>
                      {["string", "number"].map((t) => (
                        <>
                          <Select.Option value={t} key={t}>
                            {t}
                          </Select.Option>
                        </>
                      ))}
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </>
                </Space>
              ))}
              <Button type="dashed" onClick={() => subOpt.add()} block>
                + Add Sub Item
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>
    </>
  );
};
