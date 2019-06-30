import * as React from "react"
import styles from "./buttons.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"

type Size = "sm" | "lg"

type ButtonProps = {
  children: React.ReactNode
  onClick?(): void
  size?: Size
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

export const OutlineButton = ({ children, onClick, size }: ButtonProps) => (
  <button
    type="button"
    className={`btn btn-outline-primary ${styles.button} ${
      styles.roundButton
    } ${size ? styles[size] : ""}`}
    onClick={onClick}
  >
    {children}
  </button>
)

export const CloseButton = ({
  onClick,
  size,
}: {
  onClick(): void
  size?: Size
}) => (
  <OutlineButton onClick={onClick} size={size}>
    <FontAwesomeIcon size="sm" icon={faTimes} />
  </OutlineButton>
)

export const MenuButton = ({ onClick }: { onClick(): void }) => (
  <OutlineButton onClick={onClick}>
    <FontAwesomeIcon size="sm" icon={faBars} />
  </OutlineButton>
)
