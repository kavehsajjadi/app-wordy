import { toJS, observable, ObservableMap } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { GoogleClient } from "services/google_client"
import { Language } from "stores/language_store"
import { Row } from "ui/row"
import { Column } from "ui/column"
import { TextArea } from "ui/textarea"
import { debounce } from "util/debounce"

type TranslateSectionProps = {
  googleApiKey: string
  languages: Language.T[]
}

const translations: ObservableMap<
  Language.LanguageCode,
  string
> = new ObservableMap()

@observer
export class TranslateSection extends React.Component<TranslateSectionProps> {
  private readonly doTranslate = (
    value: string,
    from: string,
    to: string,
  ): Promise<string | void> => {
    return GoogleClient.translate(this.props.googleApiKey, value, from, to)
      .then(text => text)
      .catch(console.error)
  }

  private readonly translate = (value: string, from: string, to: string[]) => {
    to.forEach(targetLanguage => {
      if (targetLanguage !== from) {
        this.doTranslate(value, from, targetLanguage).then(text => {
          if (text) {
            translations.set(targetLanguage, text)
          }
        })
      }
    })
  }

  private readonly debouncedTranslate = debounce(this.translate, 250)

  private readonly onChange = (from: string) => (value: string) => {
    translations.set(from, value)
    const targetLanguages = this.props.languages.map(language => language.code)
    // @ts-ignore
    this.debouncedTranslate(value, from, targetLanguages)
  }

  render() {
    return (
      <div className="translate">
        {this.props.languages.map(language => {
          const value = translations.get(language.code)
          return (
            <TranslateSectionView
              key={language.code}
              language={language}
              onChange={this.onChange(language.code)}
              value={value}
            />
          )
        })}
      </div>
    )
  }
}

const TranslateSectionView = ({ language, value, onChange }) => {
  return (
    <Row key={language.code}>
      <Column>
        <TextArea onChange={onChange} value={value} label={language.label} />
      </Column>
    </Row>
  )
}
