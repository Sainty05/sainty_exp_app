import React, { useState } from 'react';
import axiosBaseURL from '../utils/axiosBaseUrl';
import AddUser from './AddUser';
import { useGlobalContext } from '../utils/context';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setShowAddUser, toast, setSessionActive } = useGlobalContext()

    const userLogin = () => {
        if (email === "" || password === "") {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Fill all required field!', life: 3000 });
        } else {
            const user = {
                email: email,
                password: password
            }
            axiosBaseURL.post("/login", user).then((res) => {
                localStorage.setItem("session", JSON.stringify(res.data.session))
                setSessionActive(true)
                navigate("/")
            }).catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: err.response.data.message, life: 3000 });
            })
        }
    }

    return (
        <section className="gradient-form">
            <AddUser />
            <div className="container py-5 mt-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-5">
                        <div className="card rounded-3 text-black">
                            <div className="card-body p-md-5 mx-md-4">
                                <div className="mb-3 text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                        style={{ width: '185px' }} alt="logo" />
                                    <h4 className="mt-1 pb-1">We are The Lotus Team</h4>
                                </div>
                                <form>
                                    <p className='text-primary'>Please login to your account</p>
                                    <div className="form-outline mb-2">
                                        <input type="email" id="form2Example11" onChange={(e) => setEmail(e.target.value)} className="form-control"
                                            placeholder="email address" />
                                        <label className="form-label" htmlFor="form2Example11">User Address</label>
                                    </div>
                                    <div className="form-outline mb-2">
                                        <input type="password" id="form2Example22" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="password" />
                                        <label className="form-label" htmlFor="form2Example22">Password</label>
                                    </div>
                                    <div className="text-center pt-1 pb-1">
                                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" onClick={() => userLogin()} type="button">Login</button>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center pb-4">
                                        <p className="mb-0 me-2">Don't have an account?</p>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setShowAddUser(true)}>Create new</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
