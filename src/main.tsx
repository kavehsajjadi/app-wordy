import * as React from "react"
import * as ReactDOM from "react-dom"
import { Router, Route, Switch } from "react-router-dom"
import { routes } from "config/routes"
import { history } from "config/history"
import { Layout } from "pages/layout"
import "./main.css"

class Main extends React.Component {
  render() {
    return (
      <Layout>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact
            component={route.component}
          />
        ))}
      </Layout>
    )
  }
}

const App = (
  <Router history={history}>
    <Switch>
      <Main />
    </Switch>
  </Router>
)

const root = document.getElementById("root")

ReactDOM.render(App, root)
