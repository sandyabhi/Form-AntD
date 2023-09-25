import React, { useState } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Typography } from "antd";
import "./App.css";
import { NestedForm } from "./components/NestedComponent";

const App = () => {
  const [form] = Form.useForm();

  const [val, setVal] = useState("string");
  const handleChange = (value) => {
    if (value === "nested") {
      console.log("--nested--");
      setVal("nested");
    }
  };

  const convert = (data) => {
    const outputObject = {};
    console.log(data);
    data?.items?.forEach((item) => {
      const key = item?.first;
      const value = {};

      if (item?.type === "nested") {
        item?.list?.forEach((nestedItem) => {
          value[nestedItem?.first] = nestedItem?.type;
        });
        outputObject[key] = value;
      } else {
        if (item?.first === undefined && item?.type === undefined)
          outputObject[""] = "";
        else if (item?.type === undefined) outputObject[key] = "";
        else outputObject[key] = item?.type;
      }

      console.log(outputObject);
    });

    return outputObject;
  };

  return (
    <div className="container">
      <Form
        form={form}
        initialValues={{
          items: [{}],
        }}
      >
        <div
          style={{
            margin: "20px",
            width: "500px",
            paddingLeft: "20px",
            marginBottom: "15px",
            borderRadius: "5px",
            borderLeft: "solid 5px grey",
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
                      <Form.Item name={[field.name, "first"]}>
                        <Input placeholder="Field Name" />
                      </Form.Item>

                      <Form.Item key={field.key} name={[field.name, "type"]}>
                        <Select
                          onChange={handleChange}
                          value="string"
                          placeholder="Field Type"
                        >
                          {["string", "number", "nested"].map((selectType) => (
                            <Select.Option value={selectType}>
                              {selectType}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item>
                        <Button
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
                        {/* <NestedComponent field={field} /> */}
                        <NestedForm field={field} />
                      </>
                    ) : (
                      <></>
                    )}
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
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        <Form.Item style={{ width: "650px" }} shouldUpdate>
          {() => (
            <Typography>
              <pre>
                {JSON.stringify(convert(form.getFieldsValue()), null, 2)}
              </pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
