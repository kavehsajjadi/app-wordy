import * as React from "react"
import styles from "./sidebar.css"
import { CloseButton } from "ui/buttons"

type SidebarProps = {
  children?: React.ReactNode
  open: boolean
  onToggleClick(): void
}

export const Sidebar = ({ children, open, onToggleClick }: SidebarProps) => (
  <div
    className={`${styles.sidebar} ${
      open ? styles.sidebarOpen : styles.sidebarClosed
    }`}
  >
    <div className={styles.sidebarHeader}>
      <CloseButton onClick={onToggleClick} />
    </div>
    <div className={styles.wrapper}>{children}</div>
  </div>
)
