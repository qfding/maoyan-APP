import API from '../api'
import http from '../http/http'


//请求电影院数据
export function getCinemaList(offset,cityId,day){
    return new Promise((resolve,reject)=>{
        http({
            url:API.CITY_API,
            method:'GET',
            data:{
                day,
                offset,
                limit: 20,
                districtId: -1,
                lineId: -1,
                hallType: -1,
                brandId: -1,
                serviceId: -1,
                areaId: -1,
                stationId: -1,
                item:'',
                updateShowDay: true,
                reqId: 1542263796500,
                cityId,
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
           resolve(data.cinemas);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


//请求电影详情里的电影院数据
export function getMovieCinemaList(movieId,day,offset,cityId){
    return new Promise((resolve,reject)=>{
        http({
            url:API.MOVIECITY_API,
            method:'POST',
            data:{
                movieId,         
                day,
                offset,
                limit: 20,
                districtId: -1,
                lineId: -1,
                hallType: -1,
                brandId: -1,
                serviceId: -1,
                areaId: -1,
                stationId: -1,
                item:'',
                updateShowDay: true,
                reqId: 1542417289738,
                cityId,
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            // console.log(data);
           resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

//请求电影下拉框数据
export function getSelectList(ci){
    return new Promise((resolve,reject)=>{
        http({
            url:API.SELECT_LIST_API,
            method:'GET',
            data:{
                ci,
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            // console.log(data)
           resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

//请求电影院详情
export function getCinemaInfo(cinemaId){
    return new Promise((resolve,reject)=>{
        http({
            url:API.CINEMAINFO_API,
            method:'GET',
            data:{
                cinemaId,
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            // console.log(data)
           resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}