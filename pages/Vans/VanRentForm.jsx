import React from "react"
import {Link, useLocation } from "react-router-dom"

export default function VanRentForm() {
   

    const location = useLocation()
    const [rentForm, setRentForm] = React.useState({
        firstName: "",
        lastName:"",
        email: "",
        phoneNumber: "",
        fromDate: "",
        toDate: ""
    })

    const [formSubmitted, setFormSubmitted] = React.useState(false)

    const reservedVan = location.state.vanName
    const reservedVanType = location.state.type
    const reservedVanPrice = location.state.price
    const reservationsDays = calculateReservationDays()
    const totalCost = reservationsDays * reservedVanPrice


    function handleSubmit(e){
        e.preventDefault()
        setFormSubmitted(true)
        setRentForm({
            firstName: "",
            lastName:"",
            email: "",
            phoneNumber: "",
            fromDate: "",
            toDate: ""
        })

    }

    function handleChange(e) {
        const { name, value } = e.target
        setRentForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function calculateReservationDays(){
        const dateFrom = new Date(rentForm.fromDate)
        const dateTo = new Date(rentForm.toDate)
        const daysNum = dateTo.getTime() - dateFrom.getTime()
        const bookingDays = Math.round(daysNum / (1000 * 3600 * 24))
        return bookingDays
    }

    

    return(
        

        <div>   
            <Link
                    to=".."
                    relative="path"
                    className="back-button"
                    >&larr; <span>Previous page </span>

                </Link>
            {formSubmitted ? <p>Thanks for your order. Enjoy your trip</p> :

            <div className="login-container">    
                <form className="login-form">
                <label>
                    First Name 
                        <input
                        name="firstName"
                        required
                        type="text"
                        placeholder="Saad"
                        onChange={handleChange}
                        value={rentForm.firstName}
                        />

                    </label>        
                    <label>
                    Lats Name 
                        <input
                        name="lastName"
                        required
                        type="text"
                        placeholder="Ahmed"
                        onChange={handleChange}
                        value={rentForm.lastName}
                        />

                    </label>  

                    <label>
                        Email
                        <input
                        name="email"
                        required
                        type="email"
                        placeholder="Email address"
                        onChange={handleChange}
                        value={rentForm.email}
                        />
                    </label>
                    <label>
                        Mobile phone number
                        <input
                        name="phoneNumber"
                        required
                        type="number"
                        placeholder="+201020119430"
                        onChange={handleChange}
                        value={rentForm.phoneNumber}
                        />
                    </label>
                    <label>
                        From   
                        <input
                        name="fromDate"
                        required
                        type="date"
                        placeholder="From date"
                        onChange={handleChange}
                        value={rentForm.fromDate}
                        />
                    </label>
                    <label>
                        To   
                        <input
                        name="toDate"
                        required
                        type="date"
                        placeholder="From date"
                        onChange={handleChange}
                        value={rentForm.toDate}
                        />
                    </label>
                    {rentForm.toDate ? 
                    <p>Please confirm booking for {reservedVan} {reservedVanType} van for {reservationsDays} days with total price ${totalCost}. </p> 
                    
                    : ""
                    }       
                <button onClick={handleSubmit}>{rentForm.toDate ? "Confirm reservation" : "Check availability"}</button> 
                
                </form> 
            </div> }
        </div>        
        
        )
    }