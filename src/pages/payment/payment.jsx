import { useParams, useNavigate } from 'react-router-dom';
import './payment.css';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setloader } from '../../store/login';

const Payment = () => {
    const { bookid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const log = useSelector((state) => state.login);

    const [isloading, setisloading] = useState(false);
    const [book, setbook] = useState({});
    const [coupon, setcoupon] = useState("");
    const [date, setdate] = useState('');

    useEffect(() => {
        if (!log.userType === 'author') {
            toast.warn("You must login to proceed", { autoClose: 2100 });
            navigate('/login');
        } else {
            fetchBook();
        }
    }, []);

    const fetchBook = async () => {
        try {
            dispatch(setloader(true));
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}getbook/${bookid}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const responseData = await response.json();
            dispatch(setloader(false));
            if (!response.ok) {
                return;
            }
            setbook(responseData.data);
        } catch (error) {
            dispatch(setloader(false));
            console.error(error);
        }
    };

    const buy = async () => {
        if (!date) {
            return toast.warn('Fill Buy Date', { autoClose: 1800 });
        }

        let amount = book.price * 100;
        let currency = 'INR';

        try {
            setisloading(true);
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}createorder`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ amount })
            });

            const responseData = await response.json();

            const options = {
                key: 'rzp_test_24l81VEe4kldIm', // replace with your Razorpay key id
                amount: amount * 100, // Razorpay expects amount in paise
                currency,
                name: 'Battlefiesta',
                description: 'Battlefiesta description',
                image: 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1709654642/battlefiesta/assets/logo/logopng250_vuhy4f.webp',
                order_id: responseData.id,
                handler: async (response) => {
                    await bookPurchased(response);
                },
                prefill: {
                    name: 'Battlefiesta Two',
                    email: 'kumar.jaikishan1@gmail.com',
                    contact: '8754859524'
                },
                notes: {
                    address: 'My address'
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert(response.error.description);
            });
            rzp1.open();
            setisloading(false);
        } catch (error) {
            setisloading(false);
            console.error(error);
        }
    };

    const bookPurchased = async (data) => {
        try {
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}purchesed`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    order_id: data.razorpay_order_id,
                    payment_id: data.razorpay_payment_id,
                    bookId: book.bookId,
                    objectid: book._id,
                    date
                })
            });

            const responseData = await response.json();
            toast.success('Transaction successful', { autoClose: 1600 });
            // navigate('/order-details', { state: { order: responseData, paymentResponse: data } });
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setdate(e.target.value);
    };

    return (
        <div className="paymentpage">
            <div className="material">
                <h2>Payment Page</h2>
                <h4>Book Details</h4>
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
                        <span>Buy Date</span> <span>:</span> <span><input value={date} onChange={handleChange} type="date" /></span>
                    </div>
                </div>
                <p>
                    <LoadingButton
                        loading={isloading}
                        loadingPosition="start"
                        startIcon={<DoneIcon />}
                        variant="contained"
                        onClick={buy}
                        size='small'
                        sx={{ mt: 1 }}
                    >
                        Proceed to Buy
                    </LoadingButton>
                    <Button onClick={() => navigate(-1)} sx={{ ml: 1, mt: 1 }} size='small' variant="outlined">Back</Button>
                </p>
            </div>
        </div>
    );
};

export default Payment;
