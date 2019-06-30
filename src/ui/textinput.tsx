import * as React from "react"

type TextInputProps = {
  value: string
  label: string
  length?: number
  type?: "group" | "field"
  onChange?(value: string): void
}

export class TextInput extends React.Component<TextInputProps> {
  private readonly onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    const { onChange, label, value, type, length } = this.props

    switch (type) {
      case "field":
        return (
          <TextInputField onChange={this.onChange} value={value} length={length} />
        )
      case "group":
      default:
        return (
          <TextInputGroup
            onChange={this.onChange}
            value={value}
            label={label}
            length={length}
          />
        )
    }
  }
}

export const TextInputField = ({ onChange, value, length }) => (
  <input
    type="text"
    className="form-control"
    disabled={!onChange}
    onChange={onChange}
    value={value}
    maxLength={length}
  />
)

export const TextInputGroup = ({ onChange, label, value, length }) => (
  <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text">{label}</span>
    </div>
    <input
      type="text"
      className="form-control"
      disabled={!onChange}
      onChange={onChange}
      value={value}
      maxLength={length}
    />
  </div>
)
