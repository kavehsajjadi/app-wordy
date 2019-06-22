import { LanguageInputList } from "components/language_input_list"
import { TranslateSection } from "components/translate_section"
import * as React from "react"
import { match } from "react-router-dom"
import { Language } from "services/google_client"
import { Storage } from "services/storage"
import { Row } from "ui/row"
import { Column } from "ui/column"
import { TextInput } from "ui/textinput"

type TranslateProps = {
  required: string
  match?: match<{}>
  location?: Location
}

type TranslateState = {
  googleApiKey: string
  languages: Language[]
}

export class TranslatePage extends React.Component<
  TranslateProps,
  TranslateState
> {
  state = {
    googleApiKey: "",
    languages: [],
  }

  componentDidMount() {
    const googleApiKey = Storage.get("googleApiKey")
    if (googleApiKey) {
      this.setState({ googleApiKey })
    }
  }

  private readonly updateKey = (googleApiKey: string) => {
    Storage.set("googleApiKey", googleApiKey)
    this.setState({ googleApiKey })
  }

  private readonly updateLanguages = (languages: Language[]) => {
    Storage.set("languages", languages)
    this.setState({ languages })
  }

  render() {
    return (
      <>
        <TranslateSection
          googleApiKey={this.state.googleApiKey}
          languages={this.state.languages}
        />
        <hr />
        <Row>
          <Column>
            <TextInput
              value={this.state.googleApiKey}
              onChange={this.updateKey}
              label="Google API Key"
            />
          </Column>
        </Row>
        <hr />
        <LanguageInputList onLanguagesChange={this.updateLanguages} />
      </>
    )
  }
}
