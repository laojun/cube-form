import { Form, Input, Select, Tooltip, Icon } from "antd";
import * as React from "react";

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const noop = a => a;
export const FormSelect = ({
  fixOut = noop,
  fixIn = noop,
  requiredCheck,
  extensionFix,
  trigger = "onChange"
}) =>
  React.memo(({ fieldConfig, form }: any) => {
    const {
      key,
      value,
      label,
      labelTip,
      dataSource,
      visible,
      disabled,
      componentProps,
      wrapperProps,
      registerRequiredCheck,
      valid
    } = fieldConfig;
    const handleChange = (...args) => {
      form.setFieldValue(key, fixOut(args[0]));
      (componentProps.onChange || noop)(...args);
    };
    registerRequiredCheck(requiredCheck);
    let _lable = label;
    if (labelTip) {
      _label = (
        <span>
          {label}&nbsp;
          <Tooltip title={labelTip}>
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      );
    }
    const source = dataSource.static;
    console.count("render select", key);
    return (
      <FormItem
        colon
        label={_label}
        hasFeedback
        className={visible ? "" : "hide"}
        validateStatus={valid[0]}
        help={valid[1]}
        {...wrapperProps}
      >
        <Select
          {...componentProps}
          disabled={disabled}
          value={fixIn(value)}
          onChange={handleChange}
        >
          {source.map(s => (
            <Option key={s.value} value={s.value}>
              {s.name}
            </Option>
          ))}
        </Select>
      </FormItem>
    );
  });

export const FormInput = ({
  fixOut = noop,
  fixIn = noop,
  extensionFix,
  requiredCheck,
  trigger = "onChange"
}) =>
  React.memo(({ fieldConfig, form }: any) => {
    const {
      key,
      value,
      label,
      visible,
      valid,
      disabled,
      registerRequiredCheck,
      componentProps,
      wrapperProps
    } = fieldConfig;
    registerRequiredCheck(requiredCheck);
    const handleChange = e => {
      form.setFieldValue(key, fixOut(e.target.value));
      (componentProps.onChange || noop)(e);
    };
    console.count("render input", key);
    return (
      <FormItem
        colon
        label={label}
        hasFeedback
        className={visible ? "" : "hide"}
        validateStatus={valid[0]}
        help={valid[1]}
        {...wrapperProps}
      >
        <Input
          {...componentProps}
          disabled={disabled}
          value={fixIn(value)}
          onChange={handleChange}
        />
      </FormItem>
    );
  });
