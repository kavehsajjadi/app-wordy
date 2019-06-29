import * as React from "react"
import styles from "./buttons.css"

type ButtonProps = {
  children: React.ReactNode
  onClick?(): void
}

export const Button = ({ children, onClick }: ButtonProps) => (
  <button
    type="button"
    className={`btn btn-primary ${styles.button}`}
    onClick={onClick}
  >
    {children}
  </button>
)

export const BlockButton = ({ children, onClick }: ButtonProps) => (
  <button
    type="button"
    className={`btn btn-primary btn-block ${styles.button}`}
    onClick={onClick}
  >
    {children}
  </button>
)
