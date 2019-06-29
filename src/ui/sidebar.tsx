import * as React from "react"
import styles from "./sidebar.css"

type SidebarProps = {
  children?: React.ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
  const [open, toggleOpen] = React.useState(false)

  return <SidebarView open={open}>{children}</SidebarView>
}

type SidebarViewProps = {
  children?: React.ReactNode
  open: boolean
}

export const SidebarView = ({ children, open }: SidebarViewProps) => (
  <div
    className={`${styles.sidebar} ${
      open ? styles.sidebarOpen : styles.sidebarClosed
    }`}
  >
    <div className={styles.wrapper}>{children}</div>
  </div>
)
