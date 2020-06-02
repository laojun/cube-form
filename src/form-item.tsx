import { Form, Input, Select, Tooltip, Icon } from "antd";
import * as React from "react";
import { getData } from "./utils";

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const noop = a => a;

const PureFormSelect = (props: any) => {
  const {
    fieldConfig,
    form,
    fixOut,
    fixIn,
    requiredCheck,
    extensionFix,
    trigger
  } = props;
  const [options, setOptions] = React.useState([] as any[]);
  const [loading, setLoading] = React.useState(false);
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

  React.useEffect(() => {
    if (dataSource.static) {
      setOptions(dataSource.static);
    } else if (dataSource.dynamic) {
      setLoading(true);
      getData(dataSource.dynamic).then((res: any[]) => {
        setLoading(false);
        setOptions(res);
      });
    }
  }, [dataSource]);

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
        loading={loading}
      >
        {options.map(s => (
          <Option key={s.value} value={s.value}>
            {s.name}
          </Option>
        ))}
      </Select>
    </FormItem>
  );
};

export const FormSelect = ({
  fixOut = noop,
  fixIn = noop,
  requiredCheck,
  extensionFix,
  trigger = "onChange"
}: any) => {
  return React.memo((props: any) => (
    <PureFormSelect
      fixOut={fixOut}
      fixIn={fixIn}
      requiredCheck={requiredCheck}
      extensionFix={extensionFix}
      trigger={trigger}
      {...props}
    />
  ));
};

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
