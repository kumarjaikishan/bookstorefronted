
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { toast } from "react-toastify";

const Cretaemodal = ({ setopenmodal,fetche }) => {
    const tournacenter = useSelector((state) => state.tournacenter);
    const init = {
        book_title: "",
        author_name: "",
        price: "",
        description: ""
    }
    const [inp, setinp] = useState(init)
    const handlechange = (e, field) => {
        setinp({
            ...inp, [field]: e.target.value
        })
    }
    const [isloading, setisloading] = useState(false);

    const createnew = async (e) => {
        e.preventDefault();
        // console.log(inp);
        try {
            setisloading(true);
            const token = localStorage.getItem("bookstoretoken");
            const response = await fetch(`${tournacenter.apiadress}/createaurthorbooks`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(inp)
            });

            const responseData = await response.json();
            if (!response.ok) {
                setisloading(false);
                return toast.warn(responseData.message, { autoClose: 2100 })
            }
            fetche();
            setinp(init)
            setopenmodal(false)
            toast.success(responseData.message, { autoClose: 1400 })
            setisloading(false);
        } catch (error) {
            console.error(error);
            setisloading(false);
            // dispatch(setloader(false));
        }
    }

    return <>
        <div className="createmoadl">
            <div className="box">
                <h1>Create New Book</h1>
                <form onSubmit={createnew}>
                    <TextField required onChange={(e) => handlechange(e, "book_title")} value={inp.book_title} sx={{ width: '98%', mb: 1 }} id="outlined-basic" label="Book Title" variant="outlined" />
                    <TextField required onChange={(e) => handlechange(e, "author_name")} value={inp.author_name} sx={{ width: '98%', mb: 1 }} id="outlined-basic" label="Author Name" variant="outlined" />
                    <TextField required
                        type='tel'
                        onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                        onChange={(e) => handlechange(e, "price")} value={inp.price} sx={{ width: '98%', mb: 1 }} id="outlined-basic" label="Price" variant="outlined" />
                    <TextField required onChange={(e) => handlechange(e, "description")} value={inp.description} sx={{ width: '98%', mb: 1 }} id="outlined-basic" multiline rows={3} label="Description" variant="outlined" />
                    <div>
                        <LoadingButton
                            loading={isloading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            type='submit'
                        >
                            Create
                        </LoadingButton>
                        <Button onClick={() => setopenmodal(false)} variant="outlined">Cancel</Button>
                    </div>

                </form>
            </div>

        </div>
    </>
}
export default Cretaemodal;