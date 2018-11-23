import Vue from 'vue'
import Router from 'vue-router'

// import Cinema from '../pages/cinema/Root'
// import Mine from '../pages/mine/Root'
// import Seach from '../pages/movie/Seach'
// import MovieInfo from '../components/movie/MovieInfo'
// import CityList from '../pages/common/CityList'
// import MovieDetail from '../pages/common/MovieDetail'
// import Login from '../pages/common/Login'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/movie',
      component:()=>import('../pages/movie/Root'),
      children:[{
        name:'seach',
        path: 'seach',
        component: ()=>import('../pages/movie/Seach'),
        props: {
          type: ['cinema', 'movie']
        }
      },{
        name:'movieInfo',
        path: 'movieInfo/:movieId',
        component: ()=>import('../components/movie/MovieInfo'),
      },{
        path: 'city-list',
        component: ()=>import('../pages/common/CityList'),
      }]
    },
    {
      path: '/cinema',
      component: ()=>import('../pages/cinema/Root'),
      children:[{
        name:'cinemaSearch',
        path: 'seach',
        component: ()=>import('../pages/movie/Seach'),
        props: {
          type: ['cinema']
        }
      },{
        name:'cinemaInfo',
        path: 'cinemaInfo/:cinemaId',
        component: ()=>import('../components/cinema/CinemaInfo'),
      }]
    },
    {
      name:"mine",
      path: '/mine',
      component:()=>import('../pages/mine/Root'),
    },
    {
      name:'MovieDetail',
      path: '/MovieDetail/:movieId',
      component: ()=>import('../pages/common/MovieDetail'),
    },
    {
      path: '/login',
      component: ()=>import('../pages/common/Login'),
    },
    {
      path: '**',
      redirect: '/movie'
    }
  ]
})

export default router;

// 守卫mine页面
// 购票页面buy

router.beforeEach((to, from, next)=>{
  if(to.path == '/mine' || to.path == '/buy'){
    // 判断是否登录了
    let token = localStorage.getItem('token');
    if(token){
      next();
    }else{
      next('/login');
    }
  }
  else{
    next();
  }
  
})