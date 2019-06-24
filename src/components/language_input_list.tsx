import * as React from "react"
import { LanguageInput } from "components/language_input"
import { Language } from "stores/language_store"

type LanguageInputListProps = {
  onLanguageChange?(language: Language.T): void
  languages: Language.T[]
}

export class LanguageInputList extends React.Component<LanguageInputListProps> {
  private readonly onChange = (language: Language.T) => {
    if (this.props.onLanguageChange) {
      this.props.onLanguageChange(language)
    }
  }

  render() {
    const { languages } = this.props

    return (
      <div>
        {languages.length > 0 &&
          languages.map(language => (
            <LanguageInput
              key={language.code}
              language={language}
              onChange={this.onChange}
            />
          ))}
        <span>Add New</span>
        <LanguageInput
          language={{ code: "", label: "" }}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
