import axios from "axios";

const axiosClient = axios.create(
    {
        baseURL: 'http://192.168.1.11:1337/api'
    }
)

const getCategory=()=>axiosClient.get('/categories?populate=*')

const getCategoryList =()=>axiosClient.get('/categories?populate=*').then(response=>{
    return response.data.data
})


export default {
    getCategory,
    getCategoryList
}