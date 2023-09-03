import axios from 'axios';

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';
const API_URL = `https://corsproxy.io/?${encodeURIComponent(BASE_URL)}`;

export const fetchArtworks = () => axios.get(API_URL);

export const fetchArtworkById = (id) => axios.get(`${API_URL}/${id}`);