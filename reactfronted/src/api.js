import axios from "axios"

axios.defaults.baseURL="http://127.0.0.1:8000/api"

export default {
    getAllPost(){
        return axios.get('/posts/')
        // get 기능은 "~~ 갖다줘"
    },
    createPost(data){
        return axios.post('/posts/', data)
        // post 기능은 "~~ 처리해줘"
    },
    deletePost(id){
        return axios.delete('/posts/'+String(id))
    }
}