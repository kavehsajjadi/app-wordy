import * as React from "react"
import styles from "storybook/full_page_container.css"

export const FullPageContainer = ({
  children,
}: {
  children: React.ReactNode
}) => <div className={styles.fullPageContainer}>{children}</div>
