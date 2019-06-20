import { GoogleClient } from "google_client"
import { Storage } from "storage"
import * as React from "react"
import { match } from "react-router-dom"
import { Row } from "ui/row"
import { Column } from "ui/column"
import { TextArea } from "ui/textarea"
import { debounce } from "util/debounce"

type TranslateProps = {
  required: string
  match?: match<{}>
  location?: Location
}

type TranslateState = {
  googleApiKey: string
}

const LANGUAGES = {
  en: { label: "English", code: "en" },
  fa: { label: "Iranian", code: "fa" },
  tr: { label: "Turkish", code: "tr" },
  it: { label: "Italian", code: "it" },
}

export class TranslatePage extends React.Component<
  TranslateProps,
  TranslateState
> {
  state = {
    googleApiKey: "",
  }

  componentDidMount() {
    const googleApiKey = Storage.get("googleApiKey")
    if (googleApiKey) this.setState({ googleApiKey })
  }

  private readonly updateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    Storage.set("googleApiKey", e.target.value)
    this.setState({ googleApiKey: e.target.value })
  }

  render() {
    return (
      <>
        <Row>
          <Column>
            <input
              value={this.state.googleApiKey}
              onChange={this.updateKey}
              placeholder="Google API Key"
            />
          </Column>
        </Row>
        <TranslateSection googleApiKey={this.state.googleApiKey} />
      </>
    )
  }
}

type TranslateSectionProps = {
  googleApiKey: string
}
type TranslateSectionState = {
  en: string
  fa: string
  tr: string
  it: string
}
class TranslateSection extends React.Component<
  TranslateSectionProps,
  TranslateSectionState
> {
  state = {
    en: "",
    fa: "",
    tr: "",
    it: "",
  }

  private readonly doTranslate = (value: string, from: string, to: string) => {
    return GoogleClient.translate(
      this.props.googleApiKey,
      value,
      from,
      to,
    ).catch(console.error)
  }

  private readonly translate = debounce(
    (value: string, from: string, to: string[]) => {
      for (let i = 0; i < to.length; i++) {
        this.doTranslate(value, from, to[i]).then(text => {
          // @ts-ignore
          this.setState({ [to[i]]: text })
        })
      }
    },
    250,
  )

  private readonly onChange = (from: string, to: string[]) => (
    value: string,
  ) => {
    // @ts-ignore
    this.setState({ [from]: value })
    // @ts-ignore
    this.translate(value, from, to)
  }

  render() {
    return (
      <>
        <Row>
          <Column>
            <TextArea
              onChange={this.onChange(LANGUAGES.en.code, [
                LANGUAGES.fa.code,
                LANGUAGES.tr.code,
                LANGUAGES.it.code,
              ])}
              value={this.state[LANGUAGES.en.code]}
              label={LANGUAGES.en.label}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextArea
              onChange={this.onChange(LANGUAGES.fa.code, [
                LANGUAGES.en.code,
                LANGUAGES.tr.code,
                LANGUAGES.it.code,
              ])}
              value={this.state[LANGUAGES.fa.code]}
              label={LANGUAGES.fa.label}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextArea
              onChange={this.onChange(LANGUAGES.tr.code, [
                LANGUAGES.en.code,
                LANGUAGES.fa.code,
                LANGUAGES.it.code,
              ])}
              value={this.state[LANGUAGES.tr.code]}
              label={LANGUAGES.tr.label}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextArea
              onChange={this.onChange(LANGUAGES.it.code, [
                LANGUAGES.en.code,
                LANGUAGES.fa.code,
                LANGUAGES.tr.code,
              ])}
              value={this.state[LANGUAGES.it.code]}
              label={LANGUAGES.it.label}
            />
          </Column>
        </Row>
      </>
    )
  }
}
