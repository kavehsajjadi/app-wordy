import * as React from "react"
import styles from "storybook/full_page_container.css"

export const FullPageContainer = ({
  children,
}: {
  children: React.ReactNode
}) => <div className={styles.fullPageContainer}>{children}</div>

export const FullPageColumnContainer = ({
  children,
}: {
  children: React.ReactNode
}) => <div className={styles.fullPageColumnContainer}>{children}</div>

export const NarrowColumn = ({
  children,
  width = 300,
}: {
  children: React.ReactNode
  width?: number
}) => (
  <div style={{ width }} className={styles.narrowColumn}>
    {children}
  </div>
)
