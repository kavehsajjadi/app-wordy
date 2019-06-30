import { observer } from "mobx-react"
import * as React from "react"
import { match } from "react-router-dom"
import { Storage } from "services/storage"
import { Language } from "stores/language_store"
import { TranslatePage } from "./translate_page"
import { TranslatePageStore } from "./translate_page_store"
import { createSidebar } from "ui/sidebar/create"

type TranslateProps = {
  required: string
  match?: match<{}>
  location?: Location
}

export function createTranslatePage(): React.ComponentType {
  const storage = new Storage()
  const languageStore = new Language.LanguageStore({ storage })
  const translatePageStore = new TranslatePageStore({ storage })

  const { Sidebar, toggleSidebar } = createSidebar()

  @observer
  class TranslatePageComponent extends React.Component<TranslateProps> {
    render() {
      return (
        <TranslatePage
          googleApiKey={translatePageStore.googleApiKey}
          onGoogleApiKeyChange={translatePageStore.setGoogleApiKey}
          languages={languageStore.getLanguageList()}
          onLanguageChange={languageStore.setLanguage}
          onLanguageRemove={languageStore.removeLanguage}
          onSidebarToggleClick={toggleSidebar}
          Sidebar={Sidebar}
        />
      )
    }
  }

  return TranslatePageComponent
}
