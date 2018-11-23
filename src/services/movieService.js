import API from '../api'
import http from '../http/http'

//利用封装的http方法请求数据


//请求正在热映的电影数据
export function getPlayingList(){
    return new Promise((resolve,reject)=>{
        http({
            url:API.PLAYING_API,
            method:'GET',
            data:{
                token:''
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            let newData=data.movieList.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased,wish} = item;
                return {id, nm, img, version, sc, star, showInfo, globalReleased,wish};
            })
            resolve({
                data: newData,
                ids: data.movieIds
            });
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


//请求更多正在热映的电影数据
export function getMorePlayingList(ids){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MORE_PLAYING_API,
            method: 'GET',
            data: {
                token: '',
                movieIds: ids
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.coming.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased} = item;
                // img = img.replace(/w.h/, '128.180');
                return {id, nm, img, version, sc, star, showInfo, globalReleased};
            })
            resolve(newData);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

//请求即将上映的电影数据
export function getComingList(ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.COMING_API,
            method: 'GET',
            data: {
                ci,
                token: '',
                limit: 10
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败，提醒用户
                return;
            }
            //请求成功
            //过滤数据
            let newData = data.coming.map(item=>{
                let {comingTitle, img, nm, wish, star, showInfo, globalReleased, version,showst} = item;
                return {comingTitle, img, nm, wish, star, showInfo, globalReleased, version,showst};
            })
            //对数据进行分类,处理数据
            let dataMap = {};
            newData.map(item=>{
                if(!dataMap[item.comingTitle]){
                    dataMap[item.comingTitle] = [];
                }
                dataMap[item.comingTitle].push(item);
            })
            resolve({dataMap,movieIds:data.movieIds});
        })
        .catch(error=>{
            //请求失败
        })
    })
}

//请求查询到的电影数据和电影院数据
export function getSearchList(value,cityId){
    return new Promise((resolve, reject)=>{
        http({
            url: API.SEARCH_MOVIE_API,
            method: 'GET',
            data: {
                cityId,
                kw: value,
                stype: -1
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败，提醒用户
                return;
            }
            //请求成功
            resolve(data);
        })
        .catch(error=>{
            //请求失败
        })
    })
}

// 请求最受期待的电影数据
export function getMostExpectedData(ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOST_EXPECTED_API,
            method: 'GET',
            data: {
                ci,
                limit: 10,
                offset: 0,
                token: ''
            }
        })
        .then(({data, status})=>{
            if(status != 200)
                //请求失败
                return;
            //请求成功
            // console.log(data)
            resolve(data.coming);
        })
        .catch(error=>{
            //请求失败
        })
    })
}

//请求更多即将上映的电影数据
export function getMoreComingList(ids,ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MORE_COMING_API,
            method: 'GET',
            data: {
                ci:30,
                limit:10,
                token: '',
                movieIds: ids
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.coming.map(item=>{
                let {comingTitle, img, nm, wish, star, showInfo, globalReleased, version,showst} = item;
                return {comingTitle, img, nm, wish, star, showInfo, globalReleased, version,showst};
            })
            //对数据进行分类,处理数据
            let dataMap = {};
            newData.map(item=>{
                if(!dataMap[item.comingTitle]){
                    dataMap[item.comingTitle] = [];
                }
                dataMap[item.comingTitle].push(item);
            })
            resolve(dataMap);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 请求电影部分细节数据
export function getMovieDetail(id){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOVIE_DETAIL_API,
            method: 'GET',
            data: {
                movieId:id
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
                let {nm,enm,snum,src,dur,img, version, sc, star,cat, pubDesc,albumImg} = data.detailMovie;
                img = img.replace(/w.h/, '128.180');
                // let newData={nm,enm,snum,src,dur,Img, version, sc, star,cat, pubDesc}
                
                resolve({nm,enm,snum,src,dur,img, version, sc, star,cat, pubDesc,albumImg});
        })
        .catch(error=>{
            //请求失败
        })
    })
}

// 请求电影细节数据
export function getMoreMovieDetail(id){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOVIE_DETAIL_API,
            method: 'GET',
            data: {
                movieId:id
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            // console.log(data)
                data.detailMovie.img = data.detailMovie.img.replace(/w.h/, '128.180');
                // let newData={nm,enm,snum,src,dur,Img, version, sc, star,cat, pubDesc}
                
                resolve(data.detailMovie);
        })
        .catch(error=>{
            //请求失败
        })
    })
}