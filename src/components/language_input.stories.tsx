import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import {
  FullPageColumnContainer,
  NarrowColumn,
} from "storybook/full_page_container"
import { Fieldset } from "storybook/fieldset"
import { LanguageInput, NewLanguageInput } from "./language_input"

const empty = { code: "", label: "" }
const language = { code: "en", label: "English" }

storiesOf("LanguageInput", module)
  .add("LanguageInput", () => (
    <FullPageColumnContainer>
      <NarrowColumn>
        <Fieldset label="Empty">
          <LanguageInput language={empty} />
        </Fieldset>
        <Fieldset label="Default">
          <LanguageInput language={language} />
        </Fieldset>
        <Fieldset label="Editable">
          <LanguageInput language={language} onChange={action("onChange")} />
        </Fieldset>
      </NarrowColumn>
      <NarrowColumn>
        <Fieldset label="Removable">
          <LanguageInput language={language} onRemove={action("onRemove")} />
        </Fieldset>
        <Fieldset label="Supreme">
          <LanguageInput
            language={language}
            onChange={action("onChange")}
            onRemove={action("onRemove")}
          />
        </Fieldset>
      </NarrowColumn>
      <NarrowColumn>
        <Fieldset label="Stacked">
          <LanguageInput language={empty} />
          <LanguageInput language={language} />
          <LanguageInput language={language} onChange={action("onChange")} />
          <LanguageInput language={language} onRemove={action("onRemove")} />
          <LanguageInput
            language={language}
            onChange={action("onChange")}
            onRemove={action("onRemove")}
          />
        </Fieldset>
      </NarrowColumn>
    </FullPageColumnContainer>
  ))
  .add("NewLanguageInput", () => (
    <FullPageColumnContainer>
      <NarrowColumn>
        <Fieldset label="Default">
          <NewLanguageInput onClick={action("onClick")} />
        </Fieldset>
      </NarrowColumn>
    </FullPageColumnContainer>
  ))
