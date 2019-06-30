import * as React from "react"
import styles from "./column.css"

type ColumnProps = { children?: React.ReactNode }

export const Column = ({ children }: ColumnProps) => (
  <div className={`col ${styles.column}`}>{children}</div>
)
