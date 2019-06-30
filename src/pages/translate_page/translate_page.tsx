import * as React from "react"
import { LanguageInputList } from "components/language_input_list"
import { TranslateSection } from "components/translate_section"
import { Row } from "ui/row"
import { Column } from "ui/column"
import { TextInput } from "ui/textinput"
import { Main } from "ui/main"
import { MenuButton } from "ui/buttons"

export const TranslatePage = ({
  googleApiKey,
  languages,
  onGoogleApiKeyChange,
  onLanguageChange,
  onLanguageRemove,
  onSidebarToggleClick,
  Sidebar,
}) => (
  <>
    <Sidebar>
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
        onLanguageRemove={onLanguageRemove}
      />
    </Sidebar>
    <Main>
      <Row>
        <Column>
          <MenuButton onClick={onSidebarToggleClick} />
        </Column>
      </Row>
      <Row>
        <Column>
          <TranslateSection googleApiKey={googleApiKey} languages={languages} />
        </Column>
      </Row>
    </Main>
  </>
)
