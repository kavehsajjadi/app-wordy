export class WiktionaryClient {
  get(title: string) {
    const url = "https://en.wiktionary.org/w/api.php"
    const params =
      "action=parse" +
      // need origin=* for cors reasons
      "&origin=*" +
      "&format=json" +
      `&page=${title}`

    return fetch(`${url}?${params}`)
      .then(response => response.json())
      .then(this.parseGet)
      .catch(console.error)
  }

  search(query: string) {
    const url = "https://en.wiktionary.org/w/api.php"
    const params =
      "action=opensearch" +
      // need origin=* for cors reasons
      "&origin=*" +
      "&format=json" +
      `&search=${query}`

    return fetch(`${url}?${params}`)
      .then(response => response.json())
      .then(this.parseSearch)
      .catch(console.error)
  }

  private parseSearch(data) {
    const query = data[0]
    const matchingTags = data[1]
    // data[2] is an array of empty strings
    const urls = data[3]
    return matchingTags.map((tag: string, index: number) => [tag, urls[index]])
  }

  private parseGet(data) {
    /*
     * all the data we care about is on the "parse" key
     * inside parse there's a "sections" key which tells us
     * the indvidual headings on the page
					anchor: "Persian"
					byteoffset: 18
					fromtitle: "سگ"
					index: "1"
					level: "2"
					line: "Persian"
					number: "1"
					toclevel: 1<Paste>
		 * there's also an images key which is _a lie_. you can find audio files here
		 * but i think they need to be queried from the wikimedia api
     */
    return data.parse;
  }
}
