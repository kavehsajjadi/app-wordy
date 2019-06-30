import * as React from "react"

type TextInputProps = {
  value: string
  label: string
  inputClassName?: string
  length?: number
  type?: "group" | "field"
  onChange?(value: string): void
  disabled?: boolean
  placeholder?: string
}

export class TextInput extends React.Component<TextInputProps> {
  private readonly onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    const {
      onChange,
      label,
      value,
      type,
      length,
      disabled,
      inputClassName,
      placeholder,
    } = this.props

    switch (type) {
      case "field":
        return (
          <TextInputField
            onChange={this.onChange}
            value={value}
            length={length}
            disabled={disabled}
            inputClassName={inputClassName}
            placeholder={placeholder}
          />
        )
      case "group":
      default:
        return (
          <TextInputGroup
            onChange={this.onChange}
            value={value}
            label={label}
            length={length}
            disabled={disabled}
            inputClassName={inputClassName}
            placeholder={placeholder}
          />
        )
    }
  }
}

export const TextInputField = ({
  onChange,
  value,
  length,
  disabled,
  inputClassName,
  placeholder,
}) => (
  <input
    type="text"
    className={`form-control ${inputClassName ? inputClassName : ""}`}
    disabled={disabled}
    onChange={onChange}
    value={value}
    maxLength={length}
    placeholder={placeholder}
  />
)

export const TextInputGroup = ({
  onChange,
  label,
  value,
  length,
  disabled,
  inputClassName,
  placeholder,
}) => (
  <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text">{label}</span>
    </div>
    <input
      type="text"
      className={`form-control ${inputClassName ? inputClassName : ""}`}
      disabled={disabled}
      onChange={onChange}
      value={value}
      maxLength={length}
      placeholder={placeholder}
    />
  </div>
)
