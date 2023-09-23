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

  // const onGenderChange = (value) => {
  //   switch (value) {
  //     case "string":
  //       form.setFieldsValue({
  //         note: "Hi, string!",
  //       });
  //       break;
  //     case "nested":
  //       form.setFieldsValue({
  //         note: "Hi, nested!",
  //       });
  //       break;
  //     case "number":
  //       form.setFieldsValue({
  //         note: "Hi number!",
  //       });
  //       break;
  //     default:
  //   }
  // };
  const onFinish = (values) => {
    console.log(values);
  };
  // const onReset = () => {
  //   form.resetFields();
  // };
  // const onFill = () => {
  //   form.setFieldsValue({
  //     note: "Hello world!",
  //     gender: "male",
  //   });
  // };

  // const [fields, setFields] = useState({
  //   name: "username",
  //   value: "Ant Design",
  // });

  // const [val, SetVal] = useState();
  // const [counter, setCounter] = useState(1);

  // useEffect(() => {
  //   const { first, gender } = JSON.stringify(form.getFieldsValue());

  //   const output = `${first}: ${gender}`;
  //   SetVal(output);
  //   console.log(output);
  //   console.log(counter);
  // }, [counter]);

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
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <Form.Item
                    name={[field.name, "first"]}
                    label={`${index} Student`}
                  >
                    <Input placeholder="Enter name" />
                  </Form.Item>
                  <Form.Item key={field.key} name={[field.name, "gender"]}>
                    <Select placeholder="type">
                      {["string", "number", "nested"].map((t) => (
                        <>
                          <Select.Option value={t} key={t}>
                            {t}
                          </Select.Option>
                        </>
                      ))}
                    </Select>
                  </Form.Item>
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
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>
                {JSON.stringify(convert(form.getFieldsValue().items), null, 2)}
              </pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
