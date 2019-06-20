import * as React from "react"

type ColumnProps = { children?: React.ReactNode }

export const Column = ({ children }: ColumnProps) => (
  <div className="col">{children}</div>
)
