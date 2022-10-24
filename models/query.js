const {connection} = require('./connection')
const { v4 : uuidv4 } = require('uuid')
const { schema } = require('../validations/validate')

const onlineBooking = (firstname, lastname, phone, email, booking_date, room_no_total, room_total_fee) =>{

    const customer_id = uuidv4()
    return new Promise((resolve, reject) =>{
        connection.query(`insert into customers(customer_id, firstname, lastname, phone, email, booking_date, room_no_total, room_total_fee)
        values("${customer_id}", "${firstname}", "${lastname}", "${phone}","${email}","${booking_date}", "${room_no_total}","${room_total_fee}")`),
        (err, result, fields) =>{
            if(err){
                reject(err)
            }
            resolve(result)
        }
        // connection.end()
    })
}

const bookingAppointments = (email, phone) =>{
    return new Promise((resolve, reject) =>{
        connection.query(`select * from customers where email="${email}" and phone="${phone}"`),
        (err, result, fields) =>{
            if(err) reject(err)
            resolve(result)
        }
        connection.end()
    })
}

const getAllBookings =() =>{

    return new Promise((reject,resolve) =>{
        connection.query(`select * from customers`),
        (err, result, fields) =>{
            if(err)reject(err)
            resolve(result)
        }
        connection.end()
    })
}

const expressBooking =(firstname, lastname, phone, email, room_no_total, room_total_fee) =>{const customer_id = uuidv4
    return new Promise((resolve, reject) =>{
        connection.query(`insert into customers(customer_id, firstname, lastname, phone, email, room_no_total, room_total_fee) +
        values("${uuidv4}", "${firstname}", "${lastname}", "${phone}","${email}", "${room_no_total}","${room_total_fee}")`),
        (err, result, fields) =>{
            if(err)reject(err)
            resolve(result)
        }
        connection.end()
    })
}


module.exports ={onlineBooking, bookingAppointments, getAllBookings, expressBooking}