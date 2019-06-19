import { GoogleClient } from "google_client"
import * as React from "react"
import { match } from "react-router-dom"

const client = new GoogleClient()

type TranslateProps = {
  required: string
  match?: match<{}>
  location?: Location
}

const LANGUAGES = {
  en: { label: "English", code: "en" },
  fa: { label: "Iranian", code: "fa" },
  tr: { label: "Turkish", code: "tr" },
  it: { label: "Italian", code: "it" },
}

export class TranslatePage extends React.Component<TranslateProps> {
  render() {
    return (
      <div>
        <TranslateSection />
      </div>
    )
  }
}

type TranslateSectionProps = {}
type TranslateSectionState = any
class TranslateSection extends React.Component<
  TranslateSectionProps,
  TranslateSectionState
> {
  state = {
    [LANGUAGES.en.code]: "",
    [LANGUAGES.fa.code]: "",
    [LANGUAGES.tr.code]: "",
    [LANGUAGES.it.code]: "",
  }

  private readonly doTranslate = (value: string, from: string, to: string) => {
    return client.translate(value, from, to).catch(console.error)
  }

  private readonly translate = debounce(
    (value: string, from: string, to: string[]) => {
      for (let i = 0; i < to.length; i++) {
        this.doTranslate(value, from, to[i]).then(text =>
          this.setState({ [to[i]]: text }),
        )
      }
    },
    250,
  )

  private readonly onChange = (from: string, to: string[]) => (
    value: string,
  ) => {
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

type RowProps = { children?: React.ReactNode }

const Row = ({ children }: RowProps) => <div className="row">{children}</div>

type ColumnProps = { children?: React.ReactNode }

const Column = ({ children }: ColumnProps) => (
  <div className="col">{children}</div>
)

type TextAreaProps = {
  onChange?(value: string): void
  value: string
  label: string
}

class TextArea extends React.Component<TextAreaProps> {
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

function debounce(func, wait, immediate = false) {
  var timeout
  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
