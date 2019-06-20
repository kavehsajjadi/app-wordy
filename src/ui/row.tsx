import * as React from 'react'

type RowProps = { children?: React.ReactNode }

export const Row = ({ children }: RowProps) => <div className="row">{children}</div>
