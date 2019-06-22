import * as React from "react"
import { WiktionaryClient } from "services/wiktionary_client"
import { match } from "react-router-dom"

const searchClient = new WiktionaryClient()

type MainProps = {
  required: string
  match?: match<{ page?: string; section?: string }>
  location?: Location
}

export class MainPage extends React.Component<MainProps> {
  state: {
    searchQuery: string
    searchResults: Array<string>[]
    currentResult: string
    currentPage: any
  } = { searchQuery: "", searchResults: [], currentResult: "", currentPage: "" }

  private readonly onSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setSearchQuery(e.target.value)
  }

  private readonly setSearchQuery = (searchQuery: string) => {
    this.setState({ searchQuery })
  }

  private readonly search = (searchQuery: string): Promise<any> => {
    const response = searchClient.search(searchQuery)
    response.then(searchResults => this.setState({ searchResults }))
    return response
  }

  private readonly getPage = (page: string): Promise<any> => {
    const response = searchClient.get(page)
    response.then(currentPage => this.setState({ currentPage }))
    return response
  }

  private readonly onSearch = () => {
    this.search(this.state.searchQuery)
  }

  private readonly onSelectResult = (tag: string, url: string) => {
    this.setState({ currentResult: tag })
    this.getPage(tag)
  }

  componentDidMount() {
    const { page, section } = this.props.match.params || undefined
    const params = new URLSearchParams(this.props.location.search)
    // const section = params.get("section")
    // const section = params.get('section')

    if (page) {
      this.setSearchQuery(page)
      const searchPromise = this.search(page)
      searchPromise.then(result => {
        const pageName = result[0][0]
        this.getPage(pageName)
      })
    }
  }

  render() {
    return (
      <>
        <div>
          <SearchForm
            onChange={this.onSearchInputChange}
            onClick={this.onSearch}
            value={this.state.searchQuery}
          />
        </div>
        <div>
          {this.state.searchResults.length && (
            <SearchResults
              searchResults={this.state.searchResults}
              onClick={this.onSelectResult}
            />
          )}
        </div>
        <div>
          {this.state.currentPage.text && (
            <Content currentPage={this.state.currentPage} />
          )}
        </div>
      </>
    )
  }
}

const SearchForm = ({ value, onChange, onClick }) => (
  <div>
    <input
      className="form-control"
      type="text"
      onChange={onChange}
      value={value}
    />
    <button type="button" onClick={onClick}>
      Search
    </button>
  </div>
)

const SearchResults = ({ searchResults, onClick }) =>
  searchResults.map(([tag, url], index) => (
    <button type="button" key={url} onClick={() => onClick(tag, url)}>
      {tag}
    </button>
  ))

const Content = ({ currentPage }) => (
  <>
    {currentPage.text && (
      <div
        dangerouslySetInnerHTML={{
          __html: currentPage.text["*"],
        }}
      />
    )}
  </>
)
