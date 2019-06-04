import * as React from "react"
import { WiktionaryClient } from "wiktionary_client"

const searchClient = new WiktionaryClient()

export class MainPage extends React.Component {
  state: {
    searchQuery: string
    searchResults: Array<string>[]
    currentResult: string
    currentPage: any
  } = { searchQuery: "", searchResults: [], currentResult: "", currentPage: "" }

  private readonly onSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ searchQuery: e.target.value })
  }

  private readonly onSearch = () => {
    const response = searchClient.search(this.state.searchQuery)
    response.then(searchResults => this.setState({ searchResults }))
  }

  private readonly onSelectResult = (tag: string, url: string) => {
    this.setState({ currentResult: tag })
    const response = searchClient.get(tag)
    response.then(currentPage => this.setState({ currentPage }))
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
