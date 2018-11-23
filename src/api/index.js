//开发环境
const SAT_HOST = 'http://localhost:8080';
//测试
const UAT_HOST = 'http://10.213.12.98:8080';
//生产
const PRO_HOST = 'https://m.maoyan.com';
/*
正在热映接口
参数： token 用户标识
*/
const PLAYING_API = '/ajax/movieOnInfoList';
/*
更多正在热映数据的接口
参数：
    token 用户标识
    movieIds  请求的电影id
*/
const MORE_PLAYING_API = '/ajax/moreComingList';
/*
即将上映接口
参数： ci   城市id
      token   用户标识
      limit   数据长度
*/
const COMING_API = '/ajax/comingList';
/*
查找电影
参数：
        kw: value
        cityId: 30
        stype: -1
*/
const SEARCH_MOVIE_API = '/ajax/search';
/*
最受期待的电影数据接口
参数：ci 城市id
     limit   数据长度
     offset   数据偏移量
     token  用户标识
*/
const MOST_EXPECTED_API = '/ajax/mostExpected';
/*
更多即将上映的电影数据接口
参数：ci 城市id
     limit   数据长度
     token  用户标识
     movieIds
*/
const MORE_COMING_API = '/ajax/moreComingList';
/*
电影细节数据
参数：
     movieId
*/
const MOVIE_DETAIL_API = '/ajax/detailmovie';
/*
电影院数据接口
参数：day: 2018-11-15
    offset: 0
    limit: 20
    districtId: -1
    lineId: -1
    hallType: -1
    brandId: -1
    serviceId: -1
    areaId: -1
    stationId: -1
    item: 
    updateShowDay: true
    reqId: 1542263796500
    cityId: 30
*/
const CITY_API = '/ajax/cinemaList';
/*
城市列表接口
*/
const CITY_LIST_API = '/dianying/cities.json';
/*
电影详情的电影院数据接口

参数：
    movieId
    day
    offset: 0
    limit: 20
    districtId: -1
    lineId: -1
    hallType: -1
    brandId: -1
    serviceId: -1
    areaId: -1
    stationId: -1
    item: 
    updateShowDay: true
    reqId: 1542417289738
    cityId
*/
const MOVIECITY_API = '/ajax/movie?forceUpdate=1542420638944';
/*
请求下菜单信息
*/
const SELECT_LIST_API = '/ajax/filterCinemas';
/*
请求电影院详情
*/
const CINEMAINFO_API = '/ajax/cinemaDetail';
//还有很多接口。。。。

//输出接口常量
export default{
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    PLAYING_API,
    MORE_PLAYING_API,
    SEARCH_MOVIE_API,
    MOST_EXPECTED_API,
    MORE_COMING_API,
    COMING_API,
    CITY_API,
    MOVIE_DETAIL_API,
    CITY_LIST_API,
    MOVIECITY_API,
    SELECT_LIST_API,
    CINEMAINFO_API
}