import { action, observable } from "mobx"

export namespace Language {
  export type LanguageCode = string

  export type T = {
    code: LanguageCode
    label: string
  }

  export type Entries = [LanguageCode, T][]

  export function createFromJson(languageArrayJson: string): T[] {
    const arr = JSON.parse(languageArrayJson)
    return arr.map((entry: [string, T]) => entry[1])
  }

  export class Store {
    @observable languages: Map<LanguageCode, T> = new Map()

    get languageEntries(): Entries {
      return Array.from(this.languages.entries())
    }

    get languageList(): T[] {
      return Array.from(this.languages.entries()).map(entry => entry[1])
    }

    @action
    setLanguage(language: T) {
      if (language.label && language.code && language.code.length === 2) {
        this.languages.set(language.code, language)
      }
    }

    @action
    setLanguages(languages: T[]) {
      for (let i = 0; i < languages.length; i++) {
        const l = languages[i]
        this.languages.set(l.code, l)
      }
    }
  }
}
