import * as React from "react"

type LayoutProps = {
  children: React.ReactNode
}

class Layout extends React.Component<LayoutProps, any> {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col">
                <nav className="navbar navbar-light bg-light">
                </nav>
              </div>
            </div>
          </div>
          <div className="container">{children}</div>
        </div>
      </div>
    )
  }
}

export { Layout }
