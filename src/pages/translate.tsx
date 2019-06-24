import { LanguageInputList } from "components/language_input_list"
import { TranslateSection } from "components/translate_section"
import { observer } from "mobx-react"
import { autorun, toJS } from "mobx"
import * as React from "react"
import { match } from "react-router-dom"
import { Storage } from "services/storage"
import { Language } from "stores/language_store"
import { Row } from "ui/row"
import { Column } from "ui/column"
import { TextInput } from "ui/textinput"

const languageStore = new Language.Store()

type TranslateProps = {
  required: string
  match?: match<{}>
  location?: Location
}

type TranslateState = {
  googleApiKey: string
}

@observer
export class TranslatePage extends React.Component<
  TranslateProps,
  TranslateState
> {
  state = {
    googleApiKey: "",
  }

  componentDidMount() {
    const googleApiKey = Storage.get("googleApiKey")
    const languagesJson = Storage.get("languages")

    if (languagesJson) {
      const languages = Language.createFromJson(languagesJson)
      languageStore.setLanguages(languages)
    }

    if (googleApiKey) {
      this.setState({ googleApiKey })
    }
  }

  private readonly updateKey = (googleApiKey: string) => {
    Storage.set("googleApiKey", googleApiKey)
    this.setState({ googleApiKey })
  }

  private readonly updateLanguage = (language: Language.T) => {
    languageStore.setLanguage(language)
    Storage.set("languages", JSON.stringify(languageStore.languageEntries))
  }

  render() {
    return (
      <View
        googleApiKey={this.state.googleApiKey}
        onGoogleApiKeyChange={this.updateKey}
        languages={languageStore.languageList}
        onLanguageChange={this.updateLanguage}
      />
    )
  }
}

const View = ({
  googleApiKey,
  languages,
  onGoogleApiKeyChange,
  onLanguageChange,
}) => (
  <>
    <TranslateSection googleApiKey={googleApiKey} languages={languages} />
    <hr />
    <Row>
      <Column>
        <TextInput
          label="Google API Key"
          value={googleApiKey}
          onChange={onGoogleApiKeyChange}
        />
      </Column>
    </Row>
    <hr />
    <LanguageInputList
      languages={languages}
      onLanguageChange={onLanguageChange}
    />
  </>
)
