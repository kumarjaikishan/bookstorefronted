import { useEffect, useState } from 'react';
import './author.css'
import { useSelector, useDispatch } from "react-redux";
import Cretaemodal from './createmodal';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import book from '../../assets/book.webp'
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import { toast } from "react-toastify";
import { setloader } from '../../store/login';
import DeleteIcon from '@mui/icons-material/Delete';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Author = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tournacenter = useSelector((state) => state.tournacenter);
    const [booklist, setbooklist] = useState([]);
    const [booksale, setbooksale] = useState([]);
    useEffect(() => {
        fetche();
    }, [])
    useEffect(() => {
        allsale();
    }, [booksale])

    const fetche = async () => {
        const token = localStorage.getItem("bookstoretoken");
        // console.log(token);
        try {
            dispatch(setloader(true));
            const response = await fetch(`${tournacenter.apiadress}/getaurthorbooks`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const responseData = await response.json();
            console.log(responseData);
            if (response.ok) {
                dispatch(setloader(false));
                setbooklist(responseData.data);
                setbooksale(responseData.salerecord)
            }
        } catch (error) {
            dispatch(setloader(false));
            console.error(error);
            // dispatch(setloader(false));
        }
    }
    const [isloading, setisloading] = useState(false);

    const getemail = async () => {
        const token = localStorage.getItem("bookstoretoken");
        // console.log(token);
        try {
            setisloading(true);
            const response = await fetch(`${tournacenter.apiadress}/revenuedetail`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const responseData = await response.json();
            // console.log(responseData);
            if (response.ok) {
                toast.success(responseData.message, { autoClose: 1800 });
            }
            setisloading(false);
        } catch (error) {
            setisloading(false);
            console.error(error);
            // dispatch(setloader(false));
        }
    }

    const [openmodal, setopenmodal] = useState(false);
    const bookdetail = (slug) => {
        return navigate(`/book/${slug}`)
    }
    const deletee = async (id) => {
        try {
            dispatch(setloader(true));
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${tournacenter.apiadress}/deletebook`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ id })
            });

            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
                dispatch(setloader(false));
                return toast.warn(responseData.message, { autoClose: 2100 })
            }
            dispatch(setloader(false));
            fetche();
            toast.success(responseData.message, { autoClose: 1600 })
        } catch (error) {
            dispatch(setloader(false));
            console.error(error);
            // dispatch(setloader(false));
        }
    }
    const allsale = () => {
        let totalSale = 0;
        let toalincome = 0;
        if (booksale.length < 1) {

        } else {
            booksale.map((val, ind) => {
                totalSale = totalSale + 1;
                toalincome = toalincome + val.price
            })
        }
        setsalesdata({
            ...salesdata, totalsale: totalSale, totalincome: toalincome
        })
    }
    const [salesdata, setsalesdata] = useState({
        totalsale: 0,
        totalincome: 0
    })
    const formatMongoDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        };
        return new Date(date).toLocaleDateString('en-US', options);
    }
    return <>
        <div className="createbook">
            <div className="head">
                <div className="stats">
                    <div>
                        <span>Total Book Sale</span> <span>:</span> <span>{salesdata.totalsale}</span>
                    </div>
                    <div>
                        <span>Sale Amount</span> <span>:</span> <span>{salesdata.totalincome}</span>
                    </div>
                </div>
                <LoadingButton
                    className='plus'
                    loading={isloading}
                    loadingPosition="start"
                    startIcon={<MailOutlineIcon />}
                    variant="contained"
                    onClick={getemail}
                    sx={{ mt: 1 }}
                >
                    Get stat Email
                </LoadingButton>
                <Button className='plus' onClick={() => setopenmodal(true)} variant="contained" startIcon={<AddIcon />}>
                    Create new Book
                </Button>
            </div>
            <div className="material">
                <div className="cards">
                    {!booklist.length && <div className="notfound">
                        <div>
                            <SentimentDissatisfiedIcon className="sad" />
                            <h2>No Book Found</h2>
                            <p>Please Add Books.</p>
                        </div>
                    </div>}
                    {booklist && booklist.map((val, ind) => {
                        return <div className="card" key={ind}>
                            <div className="img">
                                <img src={book} alt="" /> 
                                <span className="reviews">{val.Noofrating} Reviews</span>
                                <span className="rating">Rating: {val.rating}</span>
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
                                <div>
                                    <Button onClick={() => bookdetail(val.slug_value)} sx={{ mt: 1 }} size='small' variant="contained">Details</Button>
                                </div>
                            </div>
                            <div className="conta">
                                <CreateIcon />
                                <DeleteIcon onClick={() => deletee(val._id)} />
                            </div>
                        </div>
                    })}

                </div>
                {booklist.length > 0 && <div className="recentpurchase">
                    <h2>Recent Sale <Button size='small' className='plus' onClick={() => navigate(`/sellhistory`)} variant="contained" startIcon={<LogoutIcon />}>
                   SEE ALL
                </Button></h2>
                    {booksale && booksale.slice(0, 5).map((val, ind) => {
                        return <div key={ind}>
                            <div>
                                <span>Buyer</span> : <span>{val.buyerId.name}</span>
                            </div>
                            <div>
                                <span>Book</span> : <span>{val.bookId.book_title}</span>
                            </div>
                            <div>
                                <span>Price</span> : <span>{val.price}</span>
                            </div>
                            <div>
                                <span>Sell Id</span> : <span>{val.purchaseId}</span>
                            </div>
                            <div>
                                <span>Sell Date</span> : <span>{formatMongoDate(val.purchaseDate)}</span>
                            </div>
                        </div>
                    })}

                </div>}

            </div>

            {openmodal && <Cretaemodal fetche={fetche} setopenmodal={setopenmodal} />}
        </div>
    </>
}

export default Author;