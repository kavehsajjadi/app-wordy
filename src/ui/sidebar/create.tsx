import * as mobx from "mobx"
import * as mobxReact from "mobx-react"
import * as React from "react"
import { Sidebar as SidebarImpl } from "./sidebar"

export function createSidebar() {
  const open = mobx.observable.box(false)
  const toggleSidebar = mobx.action(() => {
    open.set(!open.get())
  })

  const Sidebar = mobxReact.observer(
    ({ children }: { children: React.ReactNode }) => (
      <SidebarImpl
        open={open.get()}
        onToggleClick={toggleSidebar}
        children={children}
      />
    ),
  )

  return {
    Sidebar,
    toggleSidebar,
  }
}
