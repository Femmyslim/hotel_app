const express = require('express')
const router = express.Router()
const {userOnline, expressUser, customers} = require('../controllers/booking.controller')


router.post('/booking_online', userOnline)

router.post('/booking_express', expressUser)

router.get('/customer_profiles', customers)


module.exports = router