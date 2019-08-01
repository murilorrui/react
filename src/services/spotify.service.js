import HttpBuilder from './http';

export default class SpotifyService {
  constructor() {
    this.http = new HttpBuilder();
    this.client_id = 'bdb6fabc1b6344b9852137803f7182ea';
    this.client_secret = '8a5d9f1ee210417f935ddd0ed3dfdeba';
    this.accessToken;
    this.tokenType;
  }

  generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  token() {
    const scope = 'user-read-private user-read-email';
    const redirect_uri = 'http://localhost:3000/callback/';
    const state = () => this.generateRandomString(16);
    const uri = 'https://accounts.spotify.com/authorize?';

    const queryString = {
      params: {
        response_type: 'code',
        client_id: 'bdb6fabc1b6344b9852137803f7182ea',
        scope,
        redirect_uri,
        state
      }
    };

    window.location.href = uri + 'response_type=code&client_id=' + this.client_id + '&scope=' + scope + '&redirect_uri=' + redirect_uri + '&state=' + state;
  }

  login() {
    // let authorizationTokenUrl = `https://accounts.spotify.com/api/token`;
    //
    // const headers = new HttpHeaders({
    //   Authorization: 'Basic  ' + btoa(`${this.client_id}:${this.client_secret}`),
    //   'Content-Type': 'application/x-www-form-urlencoded;'
    // });
    // const options = { headers }
    // const body = 'grant_type=client_credentials';
    //
    // return this.http.post(authorizationTokenUrl, body, options)
    //   .then((token) => {
    //     this.accessToken = token.access_token;
    //     this.tokenType = token.token_type;
    //     console.log(this.accessToken, ':1');
    //     console.log(this.tokenType, ':1');
      // });
  }

  searchAlbums(title) {
    const options = this.getOptions();
    return this.http.get(`/search?q=${title}&type=album`, options).then(() => {
      console.log
    });
  }

  loadAlbum(id) {
    const options = this.getOptions();
    return this.http.get(`/albums/${id}`, options);
  }


  getOptions() {
    console.log(this.accessToken);
    console.log(this.tokenType);

    // const headers = new HttpHeaders({
    //   Authorization: `${this.tokenType} ${this.accessToken}`
    // });
    // const options = { headers }

    // return options;
  }
}
