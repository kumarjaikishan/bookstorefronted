import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import './bookdetail.css'
import { useNavigate } from "react-router-dom";
import bookimg from '../../assets/book.webp'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { setloader } from '../../store/login';


const Bookdetail = () => {
    const { bookid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const log = useSelector((state) => state.login);
    const tournacenter = useSelector((state) => state.tournacenter);

    useEffect(() => {
        feteche();
    }, [])
    const [book, setbook] = useState({});
    const [review, setreview] = useState([]);

    const feteche = async () => {
        try {
            dispatch(setloader(true));
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${import.meta.env.VITE_API_ADDRESS}bookdetail/${bookid}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const responseData = await response.json();
            // console.log(responseData);
            dispatch(setloader(false));
            if (!response.ok) {
                return toast.warn(responseData.message, { autoClose: 2100 })
            }
            setreview(responseData.reviews)
            setbook(responseData.data);
        } catch (error) {
            dispatch(setloader(false));
            console.error(error);
        }
    }
    const formatMongoDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    return <>
        <div className="bookdetail">
            <div className="book">
                <div className="img">
                    <img src={bookimg} alt="" />
                    <span className="reviews">{book.Noofrating} Reviews</span>
                    <span className="rating">Rating: {book.rating}</span>
                </div>
                <div><span>Name</span> <span>:</span><span>{book.book_title}</span></div>
                <div><span>Author</span> <span>:</span><span>{book.author_name}</span></div>
                <div><span>Book ID</span> <span>:</span><span>{book.bookId}</span></div>
                <div><span>price</span> <span>:</span><span>{book.price}</span></div>
                <div><span>Published On</span> <span>:</span><span>{formatMongoDate(book.createdAt)}</span></div>
                <div>
                    {log.userType == "retail" && <Button sx={{ mt: 2, mb: 1 }} onClick={() => navigate(`/payment/${book.bookId}`)} variant="contained">Proceed to Buy</Button>}
                </div>
                <b>Description:- </b>
                <p>{book.description}</p>
            </div>
            <div className="review">
                <h2>Rating & Reviews</h2>
                {review.length < 1 && <h3>No Review Available</h3>}
                {review && review.map((val, ind) => {
                    return <div className="ind" key={ind}>
                        <div>{val.userId.name}</div>
                        <div>
                            <Rating name="read-only" value={val.rating} readOnly /> <span className='date'> {formatMongoDate(val.createdAt)}</span>
                        </div>
                        <p>{val.review}</p>
                    </div>
                })}

            </div>
        </div>
    </>
}
export default Bookdetail;