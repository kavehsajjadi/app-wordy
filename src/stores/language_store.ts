import * as mobx from "mobx"
import { Storage } from "services/storage"

export namespace Language {
  export type LanguageCode = string

  export type T = {
    code: LanguageCode
    label: string
  }

  export type Entries = [LanguageCode, T][]

  export function createFromJson(languageArrayJson: string): T[] {
    const arr = JSON.parse(languageArrayJson)
    return arr.map((entry: [string, T]) => {
      const lang = LanguageProto.serialize(entry[1])
      return LanguageProto.deserialize(lang)
    })
  }

  export class LanguageProto {
    readonly code: LanguageCode
    readonly label: string

    constructor(opts: T) {
      this.code = opts.code
      this.label = opts.label
    }

    static serialize(obj: T): LanguageProto {
      const code = obj.code.toLowerCase()
      const label = obj.label
      return new LanguageProto({ code, label })
    }

    static deserialize(klass: LanguageProto): T {
      return { code: klass.code, label: klass.label }
    }
  }

  export class LanguageStore {
    storage: Storage
    @mobx.observable languages: Map<LanguageCode, T>

    constructor({ storage }: { storage: Storage }) {
      this.storage = storage
      this.languages = new Map()

      const languagesJson = this.storage.get("languages")
      if (languagesJson) {
        const languages = Language.createFromJson(languagesJson)
        this.setLanguages(languages)
      }
    }

    getLanguageEntries = (): Entries => {
      return Array.from(this.languages.entries())
    }

    getLanguageList = (): T[] => {
      return Array.from(this.languages.entries()).map(entry => entry[1])
    }

    syncLanguagesToLocalStorage = () => {
      const data = this.getLanguageEntries()
      this.storage.set("languages", JSON.stringify(data))
    }

    @mobx.action
    removeLanguage = (language: T) => {
      if (this.languages.get(language.code)) {
        this.languages.delete(language.code)
      }
      this.syncLanguagesToLocalStorage()
    }

    @mobx.action
    setLanguage = (opts: T) => {
      if (opts.label && opts.code && opts.code.length === 2) {
        const lang = LanguageProto.serialize(opts)
        this.languages.set(lang.code, LanguageProto.deserialize(lang))
      }
      this.syncLanguagesToLocalStorage()
    }

    @mobx.action
    setLanguages = (languages: T[]) => {
      for (let i = 0; i < languages.length; i++) {
        const l = languages[i]
        this.languages.set(l.code, l)
      }
    }
  }
}
