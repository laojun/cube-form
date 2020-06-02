import * as React from "react";
import { Form } from "./form";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./styles.css";

// test

export default function App() {
  const form = React.useRef();
  const initData = {
    name: "hello"
  };
  const [mode, setMode] = React.useState("create");
  return (
    <div className="App">
      <h2>
        <div>current mode: {mode}</div>
        <Button
          type="primary"
          onClick={() => setMode(pre => (pre === "create" ? "edit" : "create"))}
        >
          toggle mode
        </Button>
      </h2>

      <Form
        key={mode}
        value={mode === "edit" ? initData : undefined}
        formRef={form}
        fields={[
          {
            index: 0, // 顺序编号，在动态变化时确保顺序
            label: "名称", // 标签
            key: "name", // 字段名，唯一的key，支持嵌套
            type: "input",
            component: "input",
            rules: [
              {
                min: 2,
                msg: "more than 2"
              }
              // (v: string) => {
              //   return [v !== '', 'can not be empty'];
              // },
              // (v: string) => {
              //   return [v !== 'wrong', 'can not be wrong'];
              // },
            ],
            validateTrigger: ["onBlur"],
            componentProps: {
              // 透传给组件的prop
              placeholder: "输入wtf隐藏性别",
              onChange(e: any) {
                console.log("input change:", e.target.value);
              },
              onBlur() {
                console.log("input blur:");
              }
            },
            wrapperProps: {
              extra: "这是提示信息"
            },
            defaultValue: "default value", // 重置时不会清掉
            initialValue: "init value" // 仅在mount后set，重置会清掉
          },
          {
            index: 1, // 顺序编号，在动态变化时确保顺序
            label: "性别", // 标签
            key: "gender", // 字段名，唯一的key，支持嵌套
            dataSource: {
              static: [
                { name: "女", value: 0 },
                { name: "男", value: 1 },
                { name: "???", value: 2 }
              ],
              dynamic: {
                api: "/api/get-options",
                path: "data.list" // 接口中的列表路径，暂不考虑返回数据format的问题
              }
            },
            type: "select",
            component: "select",
            labelTip: "label 提示",
            rules: [
              {
                validator: (v: any) => {
                  return new Promise(re => {
                    setTimeout(() => {
                      re(["warning", "must be wtf"]);
                    }, 2000);
                  });
                },
                msg: "must be wtf"
              }
            ],
            fixData(v) {
              return String(v);
            },
            componentProps: {
              // 透传给组件的prop
              className: "ss"
            },
            wrapperProps: {
              extra: "当name为wtf或编辑模式时被移除"
            },
            removeWhen: [
              [
                {
                  // 第二级为and

                  field: "name",
                  operator: "=",
                  value: "wtf"
                }
              ],
              [
                {
                  mode: "edit"
                }
              ]
            ],
            defaultValue: 1 // 重置时不会清掉
          },
          {
            index: 2, // 顺序编号，在动态变化时确保顺序
            label: "密码", // 标签
            key: "pwd", // 字段名，唯一的key，支持嵌套
            type: "input",
            component: "input",
            // disabled: true,
            required: true
            // wrapperProps: {
            //   required: true,
            // },
          },
          {
            index: 3, // 顺序编号，在动态变化时确保顺序
            label: "确认密码", // 标签
            key: "pwd_confirm", // 字段名，唯一的key，支持嵌套
            type: "input",
            component: "input",
            rules: [
              { equalWith: "pwd", msg: "must be equal with password" }
              // (v: string, formData) => {
              //   return [v === formData.pwd, 'not equal with password'];
              // },
            ],
            validateTrigger: ["onBlur"],
            wrapperProps: {
              required: true
            }
          },
          {
            index: 4,
            label: "test.a",
            key: "test.a",
            type: "input",
            component: "input",
            wrapperProps: {
              extra: "创建模式下禁用"
            },
            disableWhen: [
              [
                {
                  mode: "create"
                }
              ]
            ]
          },
          {
            index: 5,
            label: "test.b",
            key: "test.b",
            type: "input",
            component: "input"
          }
        ]}
        onChange={vs => console.log("vs:", vs)}
      >
        ds
      </Form>
      <Button
        onClick={() => console.log("form.current:", form.current.getData())}
      >
        ok
      </Button>
      <Button onClick={() => form.current.reset()}>reset</Button>
      <Button
        onClick={() =>
          form.current.validate().then(s => console.log("validate result", s))
        }
      >
        validate
      </Button>
      <Button
        onClick={() =>
          console.log("name touched", form.current.isFieldTouched("name"))
        }
      >
        check name touched
      </Button>
    </div>
  );
}
