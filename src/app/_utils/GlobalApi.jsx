import axios from "axios";

const axiosClient = axios.create(
    {
        baseURL: 'http://192.168.1.6:1337/api'
    }
)

const getCategory=()=>axiosClient.get('/categories?populate=*')

const getCategoryList =()=>axiosClient.get('/categories?populate=*').then(response=>{
    return response.data.data
})

const getProductList = ()=>axiosClient.get('/products?populate=*').then(response=>{
    return response.data.data
})

const getProductsByCategory=(category)=>axiosClient.get('/products?filters[categories][name][$in]='+category+'&populate=*').then(response=>{
    return response.data.data
})

const register = (username, email, password) => axiosClient.post('/auth/local/register', {username:username, email:email, password: password} )

const signIn=(email, password) => axiosClient.post('/auth/local', {
    identifier: email,
    password: password
})
export default {
    getCategory,
    getCategoryList,
    getProductList,
    getProductsByCategory,
    register,
    signIn
}