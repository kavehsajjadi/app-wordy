import * as React from "react"
import { LanguageInput } from "components/language_input"
import { Language } from "services/google_client"

type LanguageInputListProps = {
  onLanguagesChange?(languages: Language[]): void
}

type LanguageInputListState = {
  languages: { [key: string]: Language }
}

export class LanguageInputList extends React.Component<
  LanguageInputListProps,
  LanguageInputListState
> {
  state = {
    languages: {},
  }

  private readonly maybeCallOnUpdateLanguages = (
    state: LanguageInputListState,
  ) => {
    const { onLanguagesChange } = this.props
    const { languages } = this.state
    const languageList = Object.keys(languages).map(key => languages[key])

    if (onLanguagesChange && languageList.length) {
      onLanguagesChange(languageList)
    }
  }

  private readonly onChange = (language: Language) => {
    this.setState(state => {
      const newState = {
        ...state,
        languages: {
          ...state.languages,
          [language.code]: language,
        },
      }

      this.maybeCallOnUpdateLanguages(newState)

      return newState
    })
  }

  render() {
    const { languages } = this.state
    const languageList = Object.keys(languages).map(key => languages[key])

    return (
      <div>
        {languageList.length > 0 &&
          languageList.map(language => (
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
