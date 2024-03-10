import { useParams } from 'react-router-dom';
import './payment.css';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Payment = () => {
    const tournacenter = useSelector((state) => state.tournacenter);
    const { bookid } = useParams();
    useEffect(() => {
        feteche();
    }, [])
    const [book,setbook]= useState({});
    const [coupon,setcoupon]= useState('');
    const [date,setdate]= useState('');

    const feteche = async () => {
        try {
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${tournacenter.apiadress}/getbook/${bookid}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                return;
            }
            setbook(responseData.data)

        } catch (error) {
            console.error(error);
        }
    }
    const buy = async () => {
        let bookId = book.bookId;
        let objectid = book._id
        try {
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${tournacenter.apiadress}/buybook/${bookid}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({coupon,objectid})
            });

            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                return  toast.warn(responseData.message, {autoClose:2100});
            }
            toast.success(responseData.message, {autoClose:1600})

        } catch (error) {
            console.error(error);
        }
    }
    const handlechange=()=>{
        
    }

    return <>
        <h1>{bookid}</h1>
        <div className="paymentpage">
            <div className="material">
                <h2>Payment Page</h2>
                <h4>book details</h4>
                <div>
                    <div>
                        <span>Book Name</span> <span>:</span> <span>{book && book.book_title}</span>
                    </div>
                    <div>
                        <span>Author</span> <span>:</span> <span>{book && book.author_name}</span>
                    </div>
                </div>
                <b><p>Description :- </p></b>
                <div>{book && book.description}</div>
                <div>
                    <div>
                        <span>Price</span><span>:</span> <span>{book && book.price}</span>
                    </div>
                    <div>
                        <span>Coupon</span><span>:</span> <span>10</span>
                    </div>
                    <div>
                        <span>Final Price</span><span>:</span> <span>510</span>
                    </div>
                    <div>
                        Buy Date : <input onChange={handlechange} type="date" />
                    </div>
                </div>
                <div>
                    <Button onClick={buy} sx={{ mt: 1 }} size='small' variant="contained">Proceed To Buy</Button>
                    <Button onClick={() => cancel(val.bookId)} sx={{ ml: 1, mt: 1 }} size='small' variant="outlined">Back</Button>
                </div>
            </div>
        </div>
    </>
}
export default Payment;