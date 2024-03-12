import { useEffect, useState } from 'react';
import './bookstore.css'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import book from '../../assets/book.webp'
import CreateIcon from '@mui/icons-material/Create';
import LoadingButton from '@mui/lab/LoadingButton';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector, useDispatch } from "react-redux";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Bookstore = () => {
    const tournacenter = useSelector((state) => state.tournacenter);
    useEffect(() => {
        feteche();
    }, [])

    const navigate = useNavigate();

    const [booklist, setbooklist] = useState([]);

    const feteche = async () => {
        try {
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${tournacenter.apiadress}/getbooks`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                return;
            }
            setbooklist(responseData.data)

        } catch (error) {
            console.error(error);
        }
    }
    const bookdetail = (slug) => {
        // console.log(slug);
        return navigate(`/book/${slug}`)
    }
    const buypage = (slug) => {
        // console.log(slug);
        return navigate(`/payment/${slug}`)
    }
    const init = {
        id: '',
        bookname: '',
        rating: 0,
        review: ''
    }
    const [isloading, setisloading] = useState(false);
    const [inp, setinp] = useState(init)
    const handlechange = (e) => {
        let naam = e.target.name;
        let value = e.target.value;

        // console.log(naam,value);
        setinp({
            ...inp, [naam]: value
        })
    }
    const [showmoadl, setshowmodal] = useState(false);
    const setmodal = (val) => {
        console.log(val);
        setshowmodal(true);
        setinp({
            ...inp, id: val._id, bookname: val.book_title
        })
    }
    const review = async () => {
        console.log(inp);
        if (inp.id == "") {
            return toast.warn('Book Id is required', { autoClose: 1800 })
        }

        try {
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${tournacenter.apiadress}/bookreview`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(inp)
            });

            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                return toast.warn(responseData.message, { autoClose: 1700 })
            }
            setshowmodal(false);
            setinp(init);
            toast.success(responseData.message, { autoClose: 1700 })
        } catch (error) {
            console.error(error);
            // dispatch(setloader(false));
        }
    }

    return <>
        <div className="bookstore">
            <div className="material">
                <div className="cards">
                    {!booklist.length && <div className="notfound">
                        <div>
                            <SentimentDissatisfiedIcon className="sad" />
                            <h2>No Book Found</h2>
                            <p>No Book publish Yet.</p>
                        </div>
                    </div>}
                    {booklist && booklist.map((val, ind) => {
                        return <div className="card" key={ind}>
                            <div className="img">
                                <img src={book} alt="" />
                                <span className="reviews">{val.Noofrating} Reviews</span>
                                <span className="rating">Rating: {val.rating}</span>
                                <span className="btn" onClick={() => setmodal(val)} title='Rate'><StarBorderIcon/> </span>
                            </div>
                            <div className="detail">
                                <div>
                                    <span>Name</span> <span>:</span> <span>{val.book_title}</span>
                                </div>
                                <div>
                                    <span>Author</span> <span>:</span> <span>{val.author_name}</span>
                                </div>
                                <div>
                                    <span>Price</span> <span>:</span> <span>{val.price}</span>
                                </div>
                                <div>
                                    <span>Sell count</span> <span>:</span> <span>{val.sellCount}</span>
                                </div>
                               
                                <div className='buttons'>
                                    <Button onClick={() => bookdetail(val.slug_value)} sx={{ mt: 1 }} size='small' variant="contained">Details</Button>
                                    <Button onClick={() => buypage(val.bookId)} sx={{ mt: 1 }} size='small' variant="outlined">Buy Now</Button>
                                </div>
                            </div>
                        </div>
                    })}
                    {showmoadl && <div className="ratingmodal">
                        <div className="box">
                            <h2>{inp.bookname}</h2>
                            <div>
                                <Typography component="legend">Rate</Typography>
                                <Rating
                                    name="rating"
                                    value={inp.rating}
                                    sx={{ mb: 3 }}
                                    onChange={handlechange}
                                />
                            </div>
                            <div>
                                <TextField name="review" onChange={handlechange} sx={{ mb: 3 }} value={inp.review} id="outlined-basic" size='small' fullWidth multiline rows={5} label="Write a Review" variant="outlined" />
                            </div>
                            <div>
                                <LoadingButton
                                    loading={isloading}
                                    loadingPosition="start"
                                    startIcon={<CreateIcon />}
                                    variant="contained"
                                    onClick={review}
                                    sx={{ mt: 1 }}
                                    size='small'
                                >
                                    Submit
                                </LoadingButton>
                                <Button onClick={() => { setshowmodal(false); setinp(init) }} sx={{ mt: 1, ml: 1 }} size='small' variant="outlined">cancel</Button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    </>
}

export default Bookstore;