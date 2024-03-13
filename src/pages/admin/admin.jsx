import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { setloader } from "../../store/login";
import './admin.css'

const Admin = () => {
    useEffect(() => {
        fetche();
    }, [])
    const dispatch= useDispatch();
    const [users, setusers] = useState([]);
    const tournacenter = useSelector((state) => state.tournacenter);
    const fetche = async () => {
        try {
            dispatch(setloader(true));
            const token = localStorage.getItem("bookstoretoken");
            const res = await fetch(`${tournacenter.apiadress}/getusers`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            const response = await res.json();
            console.log(response);
            if (!res.ok) {
                dispatch(setloader(false));
                return toast.warn(response.message, { autoClose: 2100 })
            }
            dispatch(setloader(false));
            setusers(response.data);
        } catch (error) {
            dispatch(setloader(false));
            console.log(error);
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
    const handleChange = (e, field) => {
        setselectedUser({
            ...selectedUser, [field]: e.target.value
        })
    }
    const [modalopen, setmodalopen] = useState(false);
    const init = {
        id:'',
        name: "",
        type: '',
        verified: ''
    }
    const [selectedUser, setselectedUser] = useState(init)
    const setedit = (user) => {
        setselectedUser({
            id:user._id,
            name: user.name,
            type: user.user_type,
            verified: user.isverified
        })
        setmodalopen(true);
    }
    const [isloading,setisloading]= useState(false)
    const editee = async (e) => {
        e.preventDefault();
        // console.log(selectedUser);
        try {
            dispatch(setloader(true));
            setisloading(true)
            const token = localStorage.getItem("bookstoretoken");
            const res = await fetch(`${tournacenter.apiadress}/edituser`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(selectedUser)
            })
            const response = await res.json();
            console.log(response);
            if (!res.ok) {
                dispatch(setloader(false));
                setisloading(false)
                setmodalopen(false)
                return toast.warn(response.message, { autoClose: 2100 })
            }
            dispatch(setloader(false));
            fetche();
            setisloading(false)
            setmodalopen(false)
            toast.success(response.message, { autoClose: 2100 })
            // setusers(response.data);
        } catch (error) {
            dispatch(setloader(false));
            setisloading(false)
            setmodalopen(false)
            console.log(error);
        }
    }
    return <>
        <div className="admin">
            <div className="material">
                <table>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((val, ind) => {
                            return <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.email}</td>
                                <td>{val.user_type}</td>
                                <td>{val.isverified ? "Verified" : "Unverified"}</td>
                                <td>{formatMongoDate(val.createdAt)}</td>
                                <td>
                                    <span onClick={() => setedit(val)}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                                    <span><i class="fa fa-trash" aria-hidden="true"></i></span>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
            {modalopen && <div className="modale">
                <div className="box">
                    <h2>Edit User</h2>
                    <form onSubmit={editee}>
                        <TextField required sx={{ mb: 2 }} value={selectedUser.name} fullWidth id="outlined-basic" label="Name" variant="outlined" />
                        <FormControl sx={{ mb: 2 }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedUser.type}
                                label="Type"
                                onChange={(e) => handleChange(e, 'type')}
                            >
                                <MenuItem value={'retail'}>Retail</MenuItem>
                                <MenuItem value={'author'}>Author</MenuItem>
                                <MenuItem value={'admin'}>Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ mb: 2 }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedUser.verified}
                                label="Status"
                                onChange={(e) => handleChange(e, 'verified')}
                            >
                                <MenuItem value={true}>Verified</MenuItem>
                                <MenuItem value={false}>Not Verified</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="btn">
                            <Button disabled={isloading} type="submit" variant="contained">Submit</Button>
                            <Button variant="outlined" onClick={() => setmodalopen(false)}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    </>
}
export default Admin;