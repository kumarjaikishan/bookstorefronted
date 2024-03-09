import { useEffect, useState } from 'react';
import './author.css'
import { useSelector, useDispatch } from "react-redux";
import Cretaemodal from './createmodal';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import book from '../../assets/book.webp'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Author = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tournacenter = useSelector((state) => state.tournacenter);
    useEffect(() => {
        // console.log(tournacenter);
        fetche();
    }, [])

    const [booklist, setbooklist] = useState([]);
    const fetche = async () => {
        const token = localStorage.getItem("bookstoretoken");
        // console.log(token);
        try {
            const response = await fetch(`${tournacenter.apiadress}/getaurthorbooks`, {
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
    const [openmodal, setopenmodal] = useState(false);
    const bookdetail = (slug) => {
        // console.log(slug);
        return navigate(`/book/${slug}`)
    }
    return <>
        <div className="createbook">
            <div className="head">
                <AddIcon onClick={() => setopenmodal(true)} titleAccess='Create new Book' className='plus' />
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

            </div>

            {openmodal && <Cretaemodal fetche={fetche} setopenmodal={setopenmodal} />}
        </div>
    </>
}

export default Author;