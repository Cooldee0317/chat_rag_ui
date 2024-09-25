import axios from 'axios'

const url = 'https://siqbots.com/rag1.0';

const headers = {
    'x-api-key': 'swdUNpOVONIbSVUacAmsQgk8rG049TbiQApcPEzRQCo',
    'Content-Type': 'application/json'
}

const Axios = axios.create({
    baseURL: url,
    headers: headers
})

export default Axios