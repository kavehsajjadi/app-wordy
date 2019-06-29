import * as React from "react"

type TextAreaProps = {
  inputClassName?: string
  onChange?(value: string): void
  value: string
  label: string
}

export class TextArea extends React.Component<TextAreaProps> {
  private readonly onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    const { inputClassName, label, onChange, value } = this.props

    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">{label}</span>
        </div>
        <textarea
          className={`form-control ${inputClassName ? inputClassName : ""}`}
          disabled={!onChange}
          onChange={this.onChange}
          value={value}
        />
      </div>
    )
  }
}
