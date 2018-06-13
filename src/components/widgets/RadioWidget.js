import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Checkbox } from "semantic-ui-react";

class RadioGroup extends Component {
  render() {
    const name = Math.random().toString();
    const { enumOptions, inline } = this.props.options;

    {
      enumOptions.map((option, i) => {
        const checked = option.value === this.props.value;
        const disabledCls =
          this.props.disabled || this.props.readOnly ? "disabled" : "";
        const radio = (
          <Checkbox
            radio
            checked={checked}
            name={name}
            required={this.props.required}
            value={option.value}
            disabled={this.props.disabled || this.props.readOnly}
            autoFocus={this.props.autoFocus && i === 0}
            onChange={_ => this.props.onChange(option.value)}
            label={option.label}
          />
        );

        if (inline) {
          return (
            <label key={i} className={`radio-inline ${disabledCls}`}>
              {radio}
            </label>
          );
        }
        return (
          <div key={i} className={`radio ${disabledCls}`}>
            <label>{radio}</label>
          </div>
        );
      });
    }

    return (
      <Container>
        {enumOptions.map((option, i) => {
          const checked = option.value === this.props.value;
          const disabledCls =
            this.props.disabled || this.props.readOnly ? "disabled" : "";
          const radio = (
            <span>
              <Checkbox
                type="radio"
                checked={checked}
                name={name}
                required={this.props.required}
                value={option.value}
                disabled={this.props.disabled || this.props.readOnly}
                autoFocus={this.props.autoFocus && i === 0}
                onChange={_ => this.props.onChange(option.value)}
                label={option.label}
              />
            </span>
          );

          return inline ? (
            <label
              key={i}
              className={`radio-inline ${disabledCls}`}
              style={{ margin: "0 6px" }}>
              {radio}
            </label>
          ) : (
            <div key={i} className={`radio ${disabledCls}`}>
              <label>{radio}</label>
            </div>
          );
        })}
      </Container>
    );
  }
}

function RadioWidget(props) {
  return (
    <div style={{ display: "inline-block" }}>
      <RadioGroup {...props} />
    </div>
  );
}

RadioWidget.defaultProps = {
  autoFocus: false,
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}
export default RadioWidget;
