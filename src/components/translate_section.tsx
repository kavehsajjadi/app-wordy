import * as React from "react"
import { Language, GoogleClient } from "services/google_client"
import { Row } from "ui/row"
import { Column } from "ui/column"
import { TextArea } from "ui/textarea"
import { debounce } from "util/debounce"

type TranslateSectionProps = {
  googleApiKey: string
  languages: Language[]
}

type TranslateSectionState = {
  [key: string]: string
}

export class TranslateSection extends React.Component<
  TranslateSectionProps,
  TranslateSectionState
> {
  state = {}

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

  private readonly onChange = (from: string) => (value: string) => {
    const to = this.props.languages
      .filter(lang => lang.code !== from)
      .map(lang => lang.code)
    // @ts-ignore
    this.setState({ [from]: value })
    // @ts-ignore
    this.translate(value, from, to)
  }

  render() {
    return (
      <div className="translate">
        {this.props.languages.map(language => {
          return (
            <Row>
              <Column>
                <TextArea
                  onChange={this.onChange(language.code)}
                  value={this.state[language.code]}
                  label={language.label}
                />
              </Column>
            </Row>
          )
        })}
      </div>
    )
  }
}
