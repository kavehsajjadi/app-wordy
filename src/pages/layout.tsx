import * as React from "react"
import styles from "./layout.css"

type LayoutProps = {
  children: React.ReactNode
}

class Layout extends React.Component<LayoutProps, any> {
  render() {
    const { children } = this.props

    return (
      <div className={styles.layout}>
        <div className={styles.container}>{children}</div>
      </div>
    )
  }
}

export { Layout }
