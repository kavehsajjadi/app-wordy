import * as React from "react"
import { Language } from "stores/language_store"
import { Button } from "ui/buttons"
import { TextInput } from "ui/textinput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
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

    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <TextInput value={code} label="Code" onChange={this.updateCode} />
        </div>
        <div className={styles.row}>
          <TextInput value={label} label="Label" onChange={this.updateLabel} />
        </div>
        {this.props.onRemove && (
          <div className={styles.row}>
            <Button onClick={this.removeLanguage}>
              <FontAwesomeIcon size="lg" icon={faTimes} />
            </Button>
          </div>
        )}
      </div>
    )
  }
}
