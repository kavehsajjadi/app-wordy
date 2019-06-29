import * as React from "react"
import { Sidebar } from "ui/sidebar"
import styles from "./layout.css"

type LayoutProps = {
  children: React.ReactNode
}

class Layout extends React.Component<LayoutProps, any> {
  render() {
    const { children } = this.props

    return (
      <div className={styles.layout}>
        <div className={styles.main}>
          <div>
            <Sidebar />
          </div>
          <div className={styles.container}>{children}</div>
        </div>
      </div>
    )
  }
}

export { Layout }
