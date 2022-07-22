import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/views/Home'
import Login from '~/views/Login'
import Signup from '~/views/Signup'
import MyPage from '~/views/MyPage'
import UserUpdate from '~/views/MyPage/UserUpdate'
import UpdateDisplayName from '~/views/MyPage/UpdateDisplayName'
import UpdatePassword from '~/views/MyPage/UpdatePassword'
import Account from '~/views/MyPage/Account'
import Admin from '~/views/Admin'
import ViewAllProducts from '~/views/Admin/ViewAllProducts'
import AddProduct from '~/views/Admin/AddProduct'
import UpdateProduct from '~/views/Admin/UpdateProduct'
import Product from '~/views/Customer/Product'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/my-page',
      component: MyPage,
      meta: { auth: true },
      redirect: '/my-page/update',
      children: [
        {
          path: 'update',
          component: UserUpdate
        },
        {
          path: 'edit-name',
          component: UpdateDisplayName
        },
        {
          path: 'edit-password',
          component: UpdatePassword
        },
        {
          path: 'account',
          component: Account
        },
      ]
    },
    {
      path: '/admin',
      component: Admin,
      redirect: '/admin/products',
      children: [
        {
          path: 'products',
          component: ViewAllProducts,
        },
        {
          path: 'product/update/:id',
          component: UpdateProduct
        },
        {
          path: 'product/add',
          component: AddProduct
        },
      ]
    },
    {
      path: '/product/:id',
      component: Product
    },
  ]
})
