import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Bookdetail = () => {
    const { bookid } = useParams();
    
    useEffect(() => {
        console.log(bookid);
    }, [])

    return <>
        <h1>bookdetail</h1>
    </>
}
export default Bookdetail;