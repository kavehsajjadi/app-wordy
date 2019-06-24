import * as React from "react"

type ButtonProps = {
  children: React.ReactNode
  onClick?(): void
}

export const Button = ({ children, onClick }: ButtonProps) => (
  <button type="button" className="btn btn-primary" onClick={onClick}>
    {children}
  </button>
)

export const BlockButton = ({ children, onClick }: ButtonProps) => (
  <button type="button" className="btn btn-primary btn-block" onClick={onClick}>
    {children}
  </button>
)
