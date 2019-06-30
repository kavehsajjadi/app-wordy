import * as React from "react"
import styles from "./fieldset.css"

export const Fieldset = ({
  children,
  label,
}: {
  children: React.ReactNode
  label?: string
}) => (
  <fieldset className={styles.fieldset}>
    {label && <legend className={styles.legend}>{label}</legend>}
    {children}
  </fieldset>
)
