import * as React from "react"
import { setCORS } from "google-translate-api-browser"
import { match } from "react-router-dom"

const translateClient = setCORS("http://cors-anywhere.herokuapp.com/")

type TranslateProps = {
  required: string
  match?: match<{}>
  location?: Location
}

export class TranslatePage extends React.Component<TranslateProps> {
  componentDidMount() {}

  render() {
    return (
      <div>
        <TranslateSection main="en" secondary="fa" tertiary="tr" />
        <TranslateSection main="fa" secondary="en" tertiary="tr" />
        <TranslateSection main="tr" secondary="fa" tertiary="en" />
      </div>
    )
  }
}

type TranslateSectionProps = {
  main: string
  secondary: string
  tertiary: string
}
type TranslateSectionState = any
class TranslateSection extends React.Component<
  TranslateSectionProps,
  TranslateSectionState
> {
  state = {
    main: "",
    secondary: "",
    tertiary: "",
  }

  private readonly doTranslate = (value: string, from: string, to: string) => {
    return translateClient(value, { from, to }).then(
      (res: { text: string }) => res.text,
    )
  }

  private readonly translate = (value: string) => {
    const { main, secondary, tertiary } = this.props
    this.setState({ main: value })
    this.doTranslate(value, main, secondary).then(secondary =>
      this.setState({ secondary }),
    )
    this.doTranslate(value, main, tertiary).then(tertiary =>
      this.setState({ tertiary }),
    )
  }

  private readonly onChange = (value: string) => {}

  render() {
    const { main, secondary, tertiary } = this.state
    return (
      <div className="row">
        <Column>
          <TextArea onChange={this.translate} value={main} label={this.props.main} />
        </Column>
        <Column>
					<TextArea value={secondary} label={this.props.secondary} />
        </Column>
        <Column>
          <TextArea value={tertiary} label={this.props.tertiary} />
        </Column>
      </div>
    )
  }
}

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

function debounce(a, b, c) {
  var d, e
  return function() {
    function h() {
      ;(d = null), c || (e = a.apply(f, g))
    }
    var f = this,
      g = arguments
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    )
  }
}
