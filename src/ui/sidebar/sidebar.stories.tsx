import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { FullPageContainer } from "storybook/full_page_container"
import { Sidebar } from "./sidebar"

storiesOf("Sidebar", module).add("example", () => (
  <FullPageContainer>
    <Sidebar open={true} onToggleClick={action("onToggleClick")}>
      <span>Sidebar view content</span>
    </Sidebar>
  </FullPageContainer>
))
