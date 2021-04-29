import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default axios.create({
      baseURL: 'http://localhost:8081/'
});

