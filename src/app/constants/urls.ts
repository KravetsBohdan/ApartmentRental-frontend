import {environment} from '../../environments/environment';

const {API} =environment;

export const urls ={
  apartments:`${API}/apartments`,
  users:`${API}/users`,
  bookings:`${API}/bookings`,
  photos:`${API}/photos`
}
