const Joi = require('joi')
const { uuid } = require('uuidv4');
const bodyParser = require('body-parser')
const { schema } = require('../validations/validate')
const {onlineBooking, bookingAppointments, getAllBookings, expressBooking} =require('../models/query')


const userOnline = (req, res) => {
    const schema =  Joi.object({

        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
       
     })

    try {
        const { error, value } = schema.validate(req.body)
        if( error != undefined){
            throw new error(`error`)
        }

        const {firstname, lastname, phone, email, booking_date, room_no_total, room_total_fee} =req.body

        bookingAppointments(email, phone)
        .then(responseToConfirmEmailPhone =>{
            if(responseToConfirmEmailPhone.length > 0 ){
                throw new error(`Customer ${email} and ${phone} exist`)
            }
            return onlineBooking(firstname, lastname, phone, email, booking_date, room_no_total, room_total_fee)
        })
        .then(bookingResult => {
                
            res.status(201).json({
                status:true,
                message: "successfully booked"
            })   
            .catch(error => {
                res.status(400).json({
                    status:false,
                    message: error.message
                })
            })
        })           
               
    }catch (error) {
        res.status(400).json({
            status:false,
            message: error.message
        })
    }
}    


const expressUser = (req, res) => {

    try {
        const { error, value } = schema.validate(req.body)
        if( error != undefined){
            throw new error(`error`)
        }

        const {firstname, lastname, phone, email, room_no_total, room_total_fee} =req.body

        bookingAppointments(email, phone)
        .then(responseToConfirmEmailPhone =>{
            if(responseToConfirmEmailPhone.length > 0 ){
                throw new error(`Customer ${email} and ${phone} exist`)
            }
            return expressBooking(firstname, lastname, phone, email, room_no_total, room_total_fee)
        })
        .then(bookingResult => {
                
            res.status(201).json({
                status:true,
                message: "successfully booked"
            })   
            .catch(error => {
                res.status(400).json({
                    status:false,
                    message: error.message
                })
            })
        })           
               
} catch (error) {
        res.status(400).json({
            status:false,
            message: error.message
        })
    }
}   

const customers = (req, res) => {
    try {
        getAllBookings()
        .catch(responseOfBookings =>{
            if(responseOfBookings.length < 0){
                 throw new error('experiencing downtime')
            }
        })    
        .then(resultOfBooking =>{
            res.status(200).json({
                status:true,
                message: 'profile display',
                data: getAllBookings
            })
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message: error.message,
            data: getAllBookings
        })
    
    }
}    


module.exports = {userOnline, expressUser, customers}
