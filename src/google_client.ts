export class GoogleClient {
  translate(value: string, from: string, to: string): Promise<any> {
    const key = "AIzaSyCZmtqZcVHYnsmP8r9Z1eVoTFgkbegFFN0"
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
        return translatedText
      })
      .catch(console.error)
  }
}
