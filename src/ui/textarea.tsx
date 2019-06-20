import * as React from "react"

type TextAreaProps = {
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
    const { onChange, label, value } = this.props
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">{label}</span>
        </div>
        <textarea
          className="form-control"
          disabled={!onChange}
          onChange={this.onChange}
          value={value}
        />
      </div>
    )
  }
}
