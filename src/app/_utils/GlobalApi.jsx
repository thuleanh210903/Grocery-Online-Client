import axios from "axios";

const axiosClient = axios.create(
    {
        baseURL: 'http://10.50.98.227:1337/api'
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


export default {
    getCategory,
    getCategoryList,
    getProductList,
    getProductsByCategory
}