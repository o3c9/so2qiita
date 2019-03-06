export default class StackOverflow {
  constructor(url) {
    this.questionId = this._parseUrl(url);
  }

  getTags() {
    return new Promise(async (resolve, reject) => {
      if (this.questionId) {
        try {
          const response = await fetch(
            `https://api.stackexchange.com/2.2/questions/${
              this.questionId
            }?site=stackoverflow`
          );
          if (response.ok) {
            const json = await response.json();
            const tags = json.items[0].tags;
            return resolve(tags);
          } else {
            return reject(`http error: ${response.status}`);
          }
        } catch (error) {
          return reject(error.message);
        }
      } else {
        return reject("not a valid SO url");
      }
    });
  }

  URL_REGEX = /^https\:\/\/stackoverflow\.com\/questions\/(\d+)/;

  _parseUrl(url) {
    const result = url.match(this.URL_REGEX);
    return result && result[1];
  }
}
