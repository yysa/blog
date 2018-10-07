import Vue from 'vue'
import Router from 'vue-router'
import Article from '../page/Article'
import ArticleCategory from '../page/ArticleCategory'
import Comment from '../page/Comment'
import Advertisement from '../page/Advertisement'
import AdvertisementCategory from '../page/AdvertisementCategory'
import Users from '../page/Users'
import Infor from '../page/Infor'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Article',
      component: Article
    },
    {
      path: '/articleCategory',
      name: 'ArticleCategory',
      component: ArticleCategory
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/advertisement',
      name: 'Advertisement',
      component: Advertisement
    },
    {
      path: '/advertisementCategory',
      name: 'AdvertisementCategory',
      component: AdvertisementCategory
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/infor',
      name: 'infor',
      component: Infor
    },
  ]
})
