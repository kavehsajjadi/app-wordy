import * as React from "react"

type TextInputProps = {
  onChange?(value: string): void
  value: string
  label: string
}

export class TextInput extends React.Component<TextInputProps> {
  private readonly onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    const { onChange, label, value } = this.props
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">{label}</span>
        </div>
        <input
          type="text"
          className="form-control"
          disabled={!onChange}
          onChange={this.onChange}
          value={value}
        />
      </div>
    )
  }
}
