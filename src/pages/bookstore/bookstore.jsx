import { useEffect, useState } from 'react';
import './bookstore.css'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import book from '../../assets/book.webp'
import { useSelector, useDispatch } from "react-redux";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Bookstore = () => {
    const tournacenter = useSelector((state) => state.tournacenter);
    useEffect(() => {
        feteche();
    }, [])
    
    const navigate = useNavigate();
    
    const [booklist,setbooklist]= useState([]);

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

    return <>
        <div className="bookstore">
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
                </div>
            </div>
        </div>
    </>
}

export default Bookstore;