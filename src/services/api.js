import axios from 'axios'
import { AppVisibility } from 'quasar';
console.log('entrou');

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 5000,
});

export default api;

