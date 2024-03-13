import { useParams } from 'react-router-dom';
import './payment.css';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setloader } from '../../store/login';

const Payment = () => {
    const tournacenter = useSelector((state) => state.tournacenter);
    const { bookid } = useParams();
    const dispatch = useDispatch();
    const [isloading,setisloading]= useState(false);
    useEffect(() => {
        feteche();
    }, [])
    const [book,setbook]= useState({});
    const [coupon,setcoupon]= useState("");
    const [date,setdate]= useState('');

    const feteche = async () => {
        try {
            dispatch(setloader(true));
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${tournacenter.apiadress}/getbook/${bookid}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const responseData = await response.json();
            dispatch(setloader(false));
            // console.log(responseData);
            if (!response.ok) {
                return;
            }
            setbook(responseData.data)

        } catch (error) {
            dispatch(setloader(false));
            console.error(error);
        }
    }
    const buy = async () => {
        if(date == ""){
         return   toast.warn('Fill fill Buy Date', {autoClose:1800})
        }
        let bookId = book.bookId;
        let objectid = book._id
        // console.log(date);
        try {
            setisloading(true);
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${tournacenter.apiadress}/buybook/${bookid}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({coupon,objectid,date})
            });

            const responseData = await response.json();
            // console.log(responseData);
            if (!response.ok) {
                return  toast.warn(responseData.message, {autoClose:2100});
            }
            toast.success(responseData.message, {autoClose:1600})
            setisloading(false);
        } catch (error) {
            setisloading(false);
            console.error(error);
        }
    }
    const handlechange=(e)=>{
        setdate(e.target.value);
    }

    return <>
        {/* <h1>{bookid}</h1> */}
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
                    <div>
                        <span>Description</span> <span>:</span> <span>{book && book.description}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Price</span> <span>:</span> <span>{book && book.price}</span>
                    </div>
                    <div>
                        <span>Coupon</span> <span>:</span> <span>0</span>
                    </div>
                    <div>
                        <span>Final Price</span> <span>:</span> <span>{book && book.price}</span>
                    </div>
                    <div>
                       <span>Buy Date</span> <span>:</span> <span><input value={date} onChange={handlechange} type="date" /></span>
                    </div>
                </div>
                <p>
                    {/* <Button onClick={buy} sx={{ mt: 1 }} size='small' variant="contained">Proceed To Buy</Button> */}
                    <LoadingButton
                            loading={isloading}
                            loadingPosition="start"
                            startIcon={<DoneIcon/>}
                            variant="contained"
                            onClick={buy}
                            size='small'
                            // sx={{width:'400px'}}
                            sx={{ mt: 1}}
                        >
                            Proceed to Buy
                        </LoadingButton>
                    <Button onClick={() => cancel(val.bookId)} sx={{ ml: 1, mt: 1 }} size='small' variant="outlined">Back</Button>
                </p>
            </div>
        </div>
    </>
}
export default Payment;