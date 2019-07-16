import { Notyf } from 'notyf';
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

const URL = 'http://localhost:3000/notes';

const notyf = new Notyf();

export const getNotes = async () => {
  try {
    const response = await axios.get(URL);

    return response.data;
  } catch(error) {
      notyf.error("Status Text: " + error.response.status);
  }
}

export const addNote = async note => {
  try {
    const response = await axios.post(URL, note);

    return response.data;
  } catch (error) {
      notyf.error("Status Text: " + error.response.status);
  }
}

export const deleteNote = async id => {
  try {
    const response = await axios.delete(`${URL}/${id}`);

    return response.data;
  } catch (error) {
      notyf.error("Status Text: " + error.response.status);
  }
}
