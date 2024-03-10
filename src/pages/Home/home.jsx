import { useEffect, useState } from 'react';
import './home.css'
import book from '../../assets/book.webp'
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Home = () => {
    const tournacenter = useSelector((state) => state.tournacenter);
    const [booklist, setbooklist] = useState([]);
    useEffect(() => {
        fetche();
    }, [])
    const fetche = async () => {
        const token = localStorage.getItem("bookstoretoken");
        // console.log(token);
        try {
            const response = await fetch(`${tournacenter.apiadress}/getpurchasebook`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const responseData = await response.json();
            console.log(responseData);
            if (response.ok) {
                setbooklist(responseData.data)
            }
        } catch (error) {
            console.error(error);
            // dispatch(setloader(false));
        }
    }
    const formatMongoDate = (date)=> {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: '2-digit' 
        };
        return new Date(date).toLocaleDateString('en-US', options);
    }
    return (
        <>
            <div className="home">
                <div className="material">
                    <div className="cards">
                        {!booklist.length && <div className="notfound">
                            <div>
                                <SentimentDissatisfiedIcon className="sad" />
                                <h2>No Book Found</h2>
                                <p>Please Make Your First Purchase.</p>
                            </div>
                        </div>}
                        {booklist && booklist.map((val, ind) => {
                            return <div className="card" key={ind}>
                                <div className="img">
                                    <img src={book} alt="" />
                                </div>
                                <div className="detail">
                                    <div>
                                        <span>Name</span> <span>:</span> <span>{val.bookId.book_title}</span>
                                    </div>
                                    <div>
                                        <span>Author</span> <span>:</span> <span>{val.bookId.author_name}</span>
                                    </div>
                                    <div>
                                        <span>Price</span> <span>:</span> <span>{val.price}</span>
                                    </div>
                                    <div>
                                        <span>Buy Date</span> <span>:</span> <span>{formatMongoDate(val.purchaseDate)}</span>
                                    </div>
                                    <div>
                                        <Button onClick={() => details(val.slug_value)} sx={{ mt: 1 }} size='small' variant="contained">Details</Button>
                                    </div>
                                </div>
                            </div>
                        })}

                    </div>

                </div>
            </div>
        </>
    )
}
export default Home;