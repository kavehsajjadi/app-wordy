import React from "react"
import { storiesOf } from "@storybook/react"
import { FullPageContainer } from "storybook/full_page_container"
import { Sidebar, SidebarView } from "ui/sidebar"

storiesOf("Sidebar", module)
  .add("example", () => (
    <FullPageContainer>
      <SidebarView open={true}>
        <span>Sidebar view content</span>
      </SidebarView>
    </FullPageContainer>
  ))
