import * as React from "react"
import { LanguageInput, NewLanguageInput } from "components/language_input"
import { Language } from "stores/language_store"

type LanguageInputListProps = {
  onLanguageRemove?(language: Language.T): void
  onLanguageChange?(language: Language.T): void
  languages: Language.T[]
}

export class LanguageInputList extends React.Component<LanguageInputListProps> {
  private readonly onChange = (language: Language.T) => {
    if (this.props.onLanguageChange) {
      this.props.onLanguageChange(language)
    }
  }

  private readonly onClick = (language: Language.T) => {
    if (this.props.onLanguageChange) {
      this.props.onLanguageChange(language)
    }
  }

  render() {
    const { languages, onLanguageRemove } = this.props

    return (
      <div>
        {languages.length > 0 &&
          languages.map(language => (
            <LanguageInput
              key={language.code}
              language={language}
              onChange={this.onChange}
              onRemove={onLanguageRemove}
            />
          ))}
        <span>Add New</span>
        <NewLanguageInput onClick={this.onClick} />
      </div>
    )
  }
}
