import axios from 'axios';

const API_URL = 'http://localhost:5000/notes';

export async function getNotes() {
  const response = await axios.get(API_URL+'/list');
  return response.data;
}

export async function saveNote(note) {
  const response = await axios.post(API_URL+'/create', note);
  return response.data;
}