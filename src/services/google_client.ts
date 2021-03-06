import * as he from "he"

export class GoogleClient {
  static translate(
    key: string,
    value: string,
    from: string,
    to: string,
  ): Promise<string> {
    const url =
      "https://translation.googleapis.com/language/translate/v2" +
      `?q=${value}` +
      `&target=${to}` +
      `&source=${from}` +
      `&key=${key}`
    return fetch(url)
      .then(response => response.json())
      .then(body => {
        const translations = body.data.translations.map(
          val => val.translatedText,
        )
        const translatedText = translations.join(" \n")
        const text = he.decode(translatedText)
        return text
      })
      .catch(console.error)
  }
}
