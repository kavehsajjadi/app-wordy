import * as React from "react"
import { createTranslatePage } from "./create"

type TranslatePageState = {
  Page: React.ComponentType<any> | null
}

export class TranslatePage extends React.Component<null, TranslatePageState> {
  state = {
    Page: null,
  }

  componentDidMount() {
    const { Page } = this.state
    if (!Page) {
      const pageComponent = createTranslatePage()
      this.setState({ Page: pageComponent })
    }
  }

  render() {
    const { Page } = this.state
    if (Page) {
      return <Page />
    }
    return null
  }
}
