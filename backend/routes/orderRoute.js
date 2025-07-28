import express from 'express'

import {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe,
    verifyRazorpay
} from '../controller/orderController.js'

import adminAuth from '../middleware/adminAuth.js'

import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin Featues

orderRouter.post('/list',adminAuth,allOrders)

orderRouter.post('/status',adminAuth,updateStatus)

//payment featurs

orderRouter.post('/place',authUser,placeOrder)

orderRouter.post('/stripe',authUser,placeOrderStripe)

orderRouter.post('/razorpay',authUser,placeOrderRazorpay)


//use feature

orderRouter.post('/userorders',authUser,userOrders)

//verfy payment 

orderRouter.post('/verifyStripe',authUser,verifyStripe)

orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)


export default orderRouter
