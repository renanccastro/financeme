import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Help,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons';
import { DatePicker } from 'material-ui-pickers';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import MaskedInput from 'react-text-mask';
import { formValueSelector, Field } from 'redux-form';
import { isEmptyOrNull } from './utils/objectUtils';

export const submitWithAction = ({ handleSubmit, onSubmit, action }) => () => {
  handleSubmit((values, dispatch, props) =>
    onSubmit(
      {
        ...values,
        action,
      },
      dispatch,
      props
    )
  )();
};

const createRender = render => props => {
  const {
    label,
    fullWidth,
    meta: { touched, error },
  } = props;
  return (
    <FormControl
      error={error && touched}
      fullWidth={fullWidth}
      style={{ marginTop: '5px', marginBottom: '5px', ...props.style }}
    >
      <InputLabel>{label}</InputLabel>
      {render({ error: !!error && touched, ...props })}
      {touched && error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
};

export const connectToFormFields = (formName, fields = []) =>
  connect(state =>
    fields.reduce((acc, field) => {
      acc[field] = formValueSelector(formName)(state, field);
      return acc;
    }, {})
  );

export const NumberField = props => {
  const {
    label,
    fullWidth,
    input,
    meta: { touched, error },
    min,
    disabled,
  } = props;
  return (
    <TextField
      {...input}
      disabled={disabled || false}
      fullWidth={fullWidth}
      label={label}
      inputProps={{ min }}
      helperText={touched && error}
      error={!!error && touched}
      type="number"
      style={{ marginTop: '5px', marginBottom: '5px', ...props.style }}
      margin="normal"
    />
  );
};
export const SwitchField = props => {
  const { label, input } = props;
  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="caption">{label}</Typography>
      <Switch {...input} checked={input.value} value={input.value.toString()} />
    </div>
  );
};

const TextMask = props => {
  const { inputRef, mask, placeholderChar = '\u2000', ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={mask}
      placeholderChar={placeholderChar}
      keepCharPositions
      guide={false}
    />
  );
};

export const RenderInput = createRender(
  ({
    input,
    error,
    tooltip,
    endAdornment,
    inputComponent,
    textMask,
    multiline,
    ...rest
  }) => (
    <Input
      {...input}
      {...rest}
      {...error}
      inputProps={{ ...rest.inputProps, mask: textMask, multiline }}
      inputComponent={inputComponent || (textMask && TextMask) || TextField}
      endAdornment={
        <Fragment>
          {endAdornment}
          {tooltip ? (
            <Tooltip title={tooltip} placement="right">
              <Help />
            </Tooltip>
          ) : null}
        </Fragment>
      }
    />
  )
);

function NumberFormatCustom(props) {
  const { inputRef, onChange, onFocus, onBlur, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange(values.value);
      }}
      decimalSeparator=","
      thousandSeparator="."
      isNumericString
      prefix="R$"
    />
  );
}

export const MoneyField = props => (
  <Field
    inputComponent={NumberFormatCustom}
    component={RenderInput}
    {...props}
  />
);

export const RenderCheckbox = createRender(({ input, label, ...rest }) => (
  <Checkbox
    label={label}
    checked={!!input.value}
    onCheck={input.onChange}
    {...rest}
  />
));

export const RenderDateTimePicker = props => {
  const {
    showErrorsInline,
    dispatch,
    input: { onChange, value },
    meta: { touched, error },
    ...other
  } = props;

  const showError = showErrorsInline || touched;

  return (
    <DateTimePicker
      error={!!(showError && error)}
      helperText={showError && error}
      value={value}
      showTabs={false}
      leftArrowIcon={<KeyboardArrowLeft />}
      rightArrowIcon={<KeyboardArrowRight />}
      InputProps={{
        style: { paddingBottom: '5px' },
      }}
      onChange={onChange}
      format="llll"
      {...other}
    />
  );
};
export const RenderDatePicker = props => {
  const {
    showErrorsInline,
    dispatch,
    input: { onChange, value },
    meta: { touched, error },
    ...other
  } = props;

  const showError = showErrorsInline || touched;

  return (
    <DatePicker
      error={!!(showError && error)}
      helperText={showError && error}
      value={isEmptyOrNull(value) ? null : value}
      leftArrowIcon={<KeyboardArrowLeft />}
      rightArrowIcon={<KeyboardArrowRight />}
      onChange={onChange}
      InputProps={{
        style: { paddingBottom: '5px' },
      }}
      format="LL"
      {...other}
    />
  );
};

export const RenderSelectField = createRender(
  ({ input, children, tooltip, endAdornment, ...rest }) => {
    const { value, onBlur } = input;
    return (
      <Select
        {...input}
        {...rest}
        onBlur={() => onBlur(value)}
        endAdornment={
          <Fragment>
            {endAdornment}
            {tooltip ? (
              <Tooltip title={tooltip} placement="right">
                <Help />
              </Tooltip>
            ) : null}
          </Fragment>
        }
      >
        {children}
      </Select>
    );
  }
);

export const SubmitButton = ({
  label,
  submitting,
  fullWidth,
  color,
  className,
  backgroundColor = '#DD4B39',
  textColor = 'white',
  onClick,
}) => (
  <Button
    type="submit"
    variant="raised"
    style={color ? {} : { backgroundColor, color: textColor }}
    color={color}
    className={className}
    fullWidth={fullWidth}
    disabled={submitting}
    onClick={onClick}
  >
    {label}
  </Button>
);

export const validateRequired = requiredFields => values => {
  const errors = {};
  requiredFields.forEach(field => {
    if (isEmptyOrNull(values[field])) {
      errors[field] = 'Campo obrigatório';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Email inválido';
  }
  return errors;
};

export const required = value =>
  isEmptyOrNull(value) ? 'Campo obrigatório' : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email inválido'
    : undefined;
