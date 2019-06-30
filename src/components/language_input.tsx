import * as React from "react"
import { Language } from "stores/language_store"
import { TextInput } from "ui/textinput"
import { CloseButton } from "ui/buttons"
import styles from "./language_input.css"

type LanguageInputProps = {
  language: Language.T
  onChange?(language: Language.T): void
  onRemove?(language: Language.T): void
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

  private readonly removeLanguage = () => {
    if (this.props.onRemove) {
      this.props.onRemove({
        code: this.state.code,
        label: this.state.label,
      })
    }
  }

  render() {
    const { code, label } = this.state
    const disabled = !this.props.onChange

    return (
      <div className={`input-group ${styles.container}`}>
        <TextInput
          inputClassName={styles.codeInput}
          value={code}
          label="Code"
          onChange={this.updateCode}
          type="field"
          length={2}
          disabled={disabled}
          placeholder="e.g. 'en'"
        />
        <TextInput
          value={label}
          label="Label"
          onChange={this.updateLabel}
          type="field"
          disabled={disabled}
          placeholder="e.g. 'English'"
        />
        {this.props.onRemove && (
          <div className={styles.buttonWrapper}>
            <CloseButton onClick={this.removeLanguage} size="sm" />
          </div>
        )}
      </div>
    )
  }
}
