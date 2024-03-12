import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import './bookdetail.css'


const Bookdetail = () => {
    const { bookid } = useParams();
    const tournacenter = useSelector((state) => state.tournacenter);
    
    useEffect(() => {
        feteche();
    }, [])
    const [book,setbook]= useState({});

    const feteche= async()=>{
        try {
            
        const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${tournacenter.apiadress}/bookdetail/${bookid}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            const responseData = await response.json();
            console.log(responseData);
            if (!response.ok) {
             return  toast.warn(responseData.message, {autoClose:2100})
            }
            setbook(responseData.data);
        } catch (error) {
            console.error(error);
            // dispatch(setloader(false));
        }
    }

    return <>
        <div className="bookdetail">
            <div className="material">

            </div>
        </div>
    </>
}
export default Bookdetail;