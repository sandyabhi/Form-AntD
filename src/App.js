import React, { useCallback, useEffect, useState } from "react";
import {
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
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

  // const convert = (data) => {
  //   if (data === undefined) return data;
  //   const transformedArray = data?.map((item) => {
  //     const result = {};

  //     // Add the "first" property as the key and "gender" property as the value
  //     result[item?.first] = item?.gender;

  //     // Check if there's a "list" property with a nested object
  //     if (item?.list && item?.list?.length > 0) {
  //       result[item?.first] = item?.list[0]?.nested;
  //     }

  //     return result;
  //   });
  //   return transformedArray;
  //   console.log(transformedArray);
  // };

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
    <div
      style={{
        margin: "20px",
        width: "600px",
      }}
    >
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Form.Item
                      name={[field.name, "first"]}
                      // label={`${index} s`}
                    >
                      <Input placeholder="Field name" />
                    </Form.Item>

                    <Form.Item key={field.key} name={[field.name, "type"]}>
                      <Select
                        onChange={handleChange}
                        value="string"
                        placeholder="Field Type"
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
                    {/* <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  /> */}
                    <Form.Item>
                      <Button
                        htmlType="reset"
                        type="primary"
                        style={{ backgroundColor: "orangered" }}
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(field.name)}
                      >
                        Remove
                      </Button>
                    </Form.Item>
                  </div>
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
                  type="primary"
                  block
                  onClick={() => {
                    add();
                  }}
                  icon={<PlusOutlined />}
                >
                  Add Item
                </Button>
                {/* <Button htmlType="reset">Reset</Button> */}
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
    </div>
  );
};

export default App;

const NestedComponent = ({ field }) => {
  return (
    <div
      style={{
        width: "100%",
        marginLeft: "55px",
      }}
    >
      <Form.Item label="List">
        <Form.List name={[field.name, "list"]}>
          {(subFields, subOpt) => (
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 16 }}
            >
              {subFields.map((subField) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Space
                    key={subField.key}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Form.Item noStyle name={[subField.name, "first"]}>
                      <Input placeholder="first" />
                    </Form.Item>
                    <Form.Item key={field.key} name={[subField.name, "type"]}>
                      <Select value="string" placeholder="type">
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
                        subOpt.remove(subField.name);
                      }}
                    />
                  </Space>
                </div>
              ))}
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => subOpt.add()}
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
// const NestedComponent = ({ field }) => {
//   return (
//     <>
//       <Form.Item label="List">
//         <Form.List name={[field.name, "list"]}>
//           {(subFields, subOpt) => (
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 rowGap: 16,
//               }}
//             >
//               {subFields.map((subField) => (
//                 <Space key={subField.key}>
//                   <>
//                     <Form.Item
//                       noStyle
//                       // name={[subField.name, "first"]}
//                       name={[field.name, "first"]}
//                     >
//                       <Input placeholder="first" />
//                     </Form.Item>
//                     <Form.Item name={[field.name, "gender"]}>
//                       {["string", "number"].map((t) => (
//                         <>
//                           <Select.Option value={t} key={t}>
//                             {t}
//                           </Select.Option>
//                         </>
//                       ))}
//                     </Form.Item>
//                     <CloseOutlined
//                       onClick={() => {
//                         subOpt.remove(subField.name);
//                       }}
//                     />
//                   </>
//                 </Space>
//               ))}
//               <Button type="dashed" onClick={() => subOpt.add()} block>
//                 + Add Sub Item
//               </Button>
//             </div>
//           )}
//         </Form.List>
//       </Form.Item>
//     </>
//   );
// };

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
