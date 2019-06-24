import * as React from "react"
import { Language } from "stores/language_store"
import { TextInput } from "ui/textinput"

type LanguageInputProps = {
  language: Language.T
  onChange?(language: Language.T): void
}

type LanguageInputState = {
  code: string
  label: string
}

export class LanguageInput extends React.Component<LanguageInputProps> {
  state = {
    code: this.props.language.code,
    label: this.props.language.label,
  }

  private readonly maybeCallOnChange = (code: string, label: string) => {
    if (code && label && this.props.onChange) {
      this.props.onChange({ code, label })
    }
  }

  private readonly updateCode = (code: string) => {
    if (code.length === 2) {
      this.maybeCallOnChange(code, this.state.label)
    }
    this.setState({ code })
  }

  private readonly updateLabel = (label: string) => {
    this.maybeCallOnChange(this.state.code, label)
    this.setState({ label })
  }

  render() {
    const { code, label } = this.state

    return (
      <div>
        <TextInput value={code} label="Code" onChange={this.updateCode} />
        <TextInput value={label} label="Label" onChange={this.updateLabel} />
      </div>
    )
  }
}
