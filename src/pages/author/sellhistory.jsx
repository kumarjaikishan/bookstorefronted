import { useSelector, useDispatch } from "react-redux";
import { setloader } from "../../store/login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sellhistory = () => {
    const navigate = useNavigate();
    const log = useSelector((state) => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!log.userType == 'author') {
            toast.warn("You are not Author", { autoClose: 2100 })
            return navigate('/login');
        }
        fetche();
    }, [])
    const tournacenter = useSelector((state) => state.tournacenter);
    const [booklist, setbooklist] = useState([]);

    const fetche = async () => {
        const token = localStorage.getItem("bookstoretoken");
        // console.log(token);
        try {
            dispatch(setloader(true));
            const response = await fetch(`${tournacenter.apiadress}/sellhistory`, {
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
            }
        } catch (error) {
            dispatch(setloader(false));
            console.error(error);
            // dispatch(setloader(false));
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

    return <div className="sellhistory">
        <div className="material">
            <h2>Total Book Sold Record</h2>
            <table>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Book Name</th>
                        <th>Buyer Name</th>
                        <th>Sell Id</th>
                        <th>Sell Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {booklist && booklist.map((val, ind) => {
                        return <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{val.bookId.book_title}</td>
                            <td>{val.buyerId.name}</td>
                            <td>{val.purchaseId}</td>
                            <td>{formatMongoDate(val.purchaseDate)}</td>
                            <td>{val.price}</td>
                        </tr>
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={5}>Total</th>
                        <th colSpan={1}>{booklist && booklist.reduce((total, book) => total + book.price, 0)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
}
export default Sellhistory;