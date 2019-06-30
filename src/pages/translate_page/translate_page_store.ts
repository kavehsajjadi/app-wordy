import * as mobx from "mobx"
import { Storage } from "services/storage"

export class TranslatePageStore {
  storage: Storage

  constructor({ storage }: { storage: Storage }) {
    this.storage = storage

    const googleApiKey = this.storage.get("googleApiKey")
    if (googleApiKey) {
      this.setGoogleApiKey(googleApiKey)
    }
  }

  @mobx.observable.ref googleApiKey: string = ""

  @mobx.action
  setGoogleApiKey = (key: string) => {
    this.googleApiKey = key
    this.storage.set("googleApiKey", this.googleApiKey)
  }
}
