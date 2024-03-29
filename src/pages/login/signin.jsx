import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { setloader, setlogin,setuser } from '../../store/login';
import { useSelector, useDispatch } from 'react-redux';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';

const Signin = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const tournacenter = useSelector((state) => state.tournacenter);
    const init = {
        email: "",
        password: ""
    }
    useEffect(() => {
        dispatch(setloader(false));
        // console.log(tournacenter);
    }, [])

    const [signinp, setsigninp] = useState(init);
    const [loginpass, setloginpass] = useState(true);
    const [btnclick, setbtnclick] = useState(false);

    const signhandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setsigninp({
            ...signinp, [name]: value
        })
    }

    const submite = async (e) => {
        e.preventDefault();
        setbtnclick(true);
        const { email, password } = signinp;
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })
            // console.log(res);
            const data = await res.json();
            if (res.ok && res.status == 200) {
                dispatch(setlogin(true));
                // console.log(data);
                toast.success(data.msg, { autoClose: 1300 });
                setbtnclick(false);
                // dispatch(setloader(true));
                dispatch(setuser(data.userType));
                localStorage.setItem("bookstoretoken", data.token);
                data.userType == "retail" && navigate('/');
                data.userType == "author" && navigate('/author');
                data.userType == "admin" && navigate('/admin');
                return;
            }
            else if (res.ok && res.status == 201) {
                dispatch(setloader(false));
                setbtnclick(false);
                toast.warn("Kindly Verify Your Email", { autoClose: 3300 });
            }
            else {
                // console.log(data);
                toast.warn(data.message, { autoClose: 1500 });
                setbtnclick(false);
                dispatch(setloader(false));
            }

        } catch (error) {
            console.log(error);
            toast.warn(error.msg, { autoClose: 1500 });
            setbtnclick(false);
            dispatch(setloader(false));
        }
    }


    return (
        <>
            <div className="logine" id='forme'>
                <form onSubmit={submite}>
                    <TextField
                        label="Email"
                        size="small"
                        className='filled'
                        onChange={signhandle}
                        name="email"
                        type='email'
                        required
                        value={signinp.email}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <MailOutlineIcon />
                            </InputAdornment>,

                        }}
                    />
                    <TextField
                        label="Password"
                        className='filled'
                        size="small"
                        required
                        type={loginpass ? "password" : null}
                        onChange={signhandle}
                        name="password"
                        value={signinp.password}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <VpnKeyIcon />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end" style={{ cursor: "pointer" }} onClick={() => loginpass ? setloginpass(false) : setloginpass(true)}>
                                {loginpass ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                            </InputAdornment>
                        }}

                    />
                    <LoadingButton
                        loading={btnclick}
                        type='submit'
                        startIcon={<VpnKeyIcon />}
                        loadingPosition="start"
                        variant="contained"
                    >
                        Login
                    </LoadingButton>
                </form>
            </div>
        </>
    )
}

export default Signin;