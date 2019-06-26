import { toJS, observable, ObservableMap } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { GoogleClient } from "services/google_client"
import { Language } from "stores/language_store"
import { Row } from "ui/row"
import { Column } from "ui/column"
import { TextArea } from "ui/textarea"
import { callWithDelay } from "util/debounce"
import "./translate_section.css"

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
  delay = 300
  state = {
    loading: false,
  }

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

  private readonly debouncedTranslate = callWithDelay(
    this.translate,
    this.delay,
  )

  private readonly debouncedFinishLoading = callWithDelay(
    () => this.setState({ loading: false }),
    this.delay,
  )

  private readonly onChange = (from: string) => (value: string) => {
    this.setState({ loading: true })
    translations.set(from, value)
    const targetLanguages = this.props.languages.map(language => language.code)
    // @ts-ignore
    this.debouncedTranslate(value, from, targetLanguages).then(
      // todo this is the opposite behaviour - always fires after the minimum time
      // we want to fire when it resolves with a minimum (if it takes longer it should)
      this.debouncedFinishLoading,
    )
  }

  render() {
    const { loading } = this.state
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
              loading={loading}
            />
          )
        })}
      </div>
    )
  }
}

const TranslateSectionView = ({ language, value, onChange, loading }) => {
  return (
    <Row key={language.code}>
      <Column>
        {loading && <Loading />}
        <TextArea onChange={onChange} value={value} label={language.label} />
      </Column>
    </Row>
  )
}

const Loading = () => (
  <div className="loading">
    <Spinner />
  </div>
)

const Spinner = delay => (
  <div className="spinner-border spinner-border-sm" role="status">
    <span className="sr-only">Loading...</span>
  </div>
)
