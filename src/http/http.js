import axios from 'axios'
import API from '../api'

//输出http方法，解构传入对象,axios需要三个值进行ajax发送
export default function http({url,method,data}){
    let options={
        url,
        method,
        baseURL:API.SAT_HOST,
        timeout:5000,
        withCredentials: false
    };
    if(method=='GET'){
        options.params=data;
    }else if(method=='POST'){
        options.data=data;
    }
    return axios(options);
}