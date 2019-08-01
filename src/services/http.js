import axios from 'axios';

export default class HttpBuilder {
  constructor() {
    const instance = axios.create({
      baseURL: 'https://api.spotify.com/v1',
    });
    return instance;
  }
}
