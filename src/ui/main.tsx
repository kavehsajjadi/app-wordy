import * as React from "react"
import styles from "./main.css"

export const Main = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.container}>{children}</div>
)
