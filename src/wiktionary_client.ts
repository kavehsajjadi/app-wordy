export class WiktionaryClient {
  /**
   * Gets the sections from the api, filters them for one matching "Etymology"
   * then just gets that sections text
   */
  getEtymology(title: string) {
    const sectionsPromise = this.getSections(title).then(this.parseGet)
    const sectionNumberPromise = sectionsPromise.then(sections =>
      sections.filter(section => section.line === "Etymology"),
    )
    const sectionPromise = sectionNumberPromise.then(matchingSections => {
      if (matchingSections.length) {
        const sectionNumber = parseInt(matchingSections[0].index)
        return this.getSection(title, sectionNumber)
      } else {
        throw new Error('No sections matching "Etymology" found')
      }
    })
    return sectionPromise.then(this.parseGet)
  }

  getSection(title: string, sectionNumber: number) {
    const action = "parse"
    const props = `&page=${title}&section=${sectionNumber}&prop=text`
    return this.fetch(action, props).then(this.parseGet)
  }

  getSections(title: string) {
    const action = "parse"
    const props = `&page=${title}&prop=section`
    return this.fetch(action, props).then(this.parseGet)
  }

  get(title: string) {
    const action = "parse"
    const props = `&page=${title}`
    return this.fetch(action, props).then(this.parseGet)
  }

  search(query: string) {
    const action = "opensearch"
    const props = `&search=${query}`
    return this.fetch(action, props).then(this.parseSearch)
  }

  private fetch(action: string, props: string) {
    const url = "https://en.wiktionary.org/w/api.php"
    const params =
      `action=${action}` +
      // need origin=* for cors reasons
      "&origin=*" +
      "&format=json" +
      "&disableeditsection" +
      "&disablelimitreport" +
      props

    return fetch(`${url}?${params}`)
      .then(response => response.json())
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
    return data.parse
  }
}
