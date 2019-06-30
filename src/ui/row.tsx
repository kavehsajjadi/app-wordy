import * as React from "react"
import styles from "./row.css"

type RowProps = { children?: React.ReactNode }

export const Row = ({ children }: RowProps) => (
  <div className={`row ${styles.row}`}>{children}</div>
)
