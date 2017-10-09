import { Field } from "redux-form";
import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Card from "./Card";

const renderInput = (field) => {
  const { input, type, meta: { touched, error } } = field;
  return (
    <div>
      <input
        {...input}
        type={type}
        className="focus-bottom-border no-focus mb2 w-100 dark-gray f3 bg-transparent"
      />
      { touched && error && <div className="orange">{error}</div> }
    </div>
  );
};

const renderDropDown = (field) => {
  const { options, input, meta: { touched, error } } = field;
  return (
    <div>
      <select {...input} className="w-100 bn bg-white no-focus dark-gray f3 dropdown bg-white">
        <option />
        {options.map(option => (
          <option
            value={option.id}
            key={option.id}
            className="f3 dark-gray"
          >
            { option.value || option.name }
          </option>
        ))
        }
      </select>
      { touched && error && <div className="orange">{error}</div> }
    </div>
  );
};

const renderTextArea = (field) => {
  const { input, meta: { touched, error } } = field;
  return (
    <div>
      <textarea
        {...input}
        className="focus-bottom-border no-focus mb2 w-100 dark-gray f3 bg-quad-transparent"
      />
      { touched && error && <div className="orange">{error}</div> }
    </div>
  );
};

const renderTelInput = (field) => {
  const { input, type, meta: { touched, error } } = field;
  return (
    <div>
      <input
        {...input}
        type={type}
        className="focus-bottom-border no-focus mb2 w-100 dark-gray f3 bg-transparent"
        pattern="^\d{3}-\d{3}-\d{4}$"
      />
      { touched && error && <div className="orange">{error}</div> }
    </div>
  );
};

const renderCheckboxInput = (field) => {
  const { input, type, meta: { touched, error } } = field;
  return (
    <div>
      <input
        {...input}
        type={type}
        className="focus-bottom-border no-focus mb2 w-100 dark-gray f3 bg-transparent"
      />
      { touched && error && <div className="orange">{error}</div> }
    </div>
  );
};

const renderDatePicker = ({ input, meta: { touched, error } }) => (
  <div>
    <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} className="focus-bottom-border no-focus mb2 w-100 dark-gray f3 bg-transparent" />
    {touched && error && <span>{error}</span>}
  </div>
);

class ZerInput extends Component {
  handleChange() {
    this.setState({});
  }
  render() {
    const { name, type, label, onChange, options, get, size } = this.props;
    if (type === "dropdown") {
      if (size === "full") {
        return (
          <div className="w-100 input-height">
            <Card>
              <Field
                name={name}
                component={renderDropDown}
                options={options}
                onChange={onChange}
                get={get}
              />
              <label htmlFor={name} className="ttu mid-gray f6">{label}</label>
            </Card>
          </div>
        );
      }
      return (
        <div className="w-100 w-50-ns input-height">
          <Card>
            <Field
              name={name}
              component={renderDropDown}
              options={options}
              onChange={onChange}
            />
            <label htmlFor={name} className="ttu mid-gray f6">{label}</label>
          </Card>
        </div>
      );
    } else if (type === "textarea") {
      return (
        <div className="w-100">
          <Card>
            <Field
              name={name}
              component={renderTextArea}
              onChange={onChange}
            />
            <label htmlFor={name} className="ttu mid-gray f6">{label}</label>
          </Card>
        </div>
      );
    } else if (type === "tel") {
      return (
        <div className="w-100 input-height">
          <Card>
            <Field
              name={name}
              type={type}
              component={renderTelInput}
            />
            <label htmlFor={name} className="ttu mid-gray f6">{label}</label>
          </Card>
        </div>
      );
    } else if (type === "checkbox") {
      return (
        <div className="w-100 input-height">
          <Card>
            <Field
              name={name}
              type={type}
              component={renderCheckboxInput}
            />
          </Card>
        </div>
      );
    } else if (type === "date") {
      return (
        <div className="w-100 input-height">
          <Card>
            <Field
              name={name}
              type={type}
              component={renderDatePicker}
            />
            <label htmlFor={name} className="ttu mid-gray f6">{label}</label>
          </Card>
        </div>
      );
    }
    return (
      <div className="w-100 input-height">
        <Card>
          <Field
            name={name}
            type={type}
            component={renderInput}
          />
          <label htmlFor={name} className="ttu mid-gray f6">{label}</label>
        </Card>
      </div>
    );
  }
}

export default ZerInput;
