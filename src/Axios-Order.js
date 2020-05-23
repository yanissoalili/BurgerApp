import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://react-my-burger-fe692.firebaseio.com/'
})
export default instance
