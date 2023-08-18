import React, { useState } from 'react';
import axiosBaseURL from '../utils/axiosBaseUrl';
import AddUser from './AddUser';
import { useGlobalContext } from '../utils/context';
import { useNavigate } from "react-router-dom";
import logo from "../assests/logo-light.webp";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setShowAddUser, toast, setSessionActive, setUserId } = useGlobalContext()

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
                setUserId(res.data.session.sessionUserId)
                navigate("/")
            }).catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: err.response.data.message, life: 3000 });
            })
        }
    }

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 dark:border-gray-700">
                    <div className='flex flex-col justify-content-center align-items-center'>
                        <img className="w-36 m-2" src={logo} alt="logo" />
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                        </form>
                        <button onClick={() => userLogin()} className="w-full btn btn-primary">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <button onClick={() => setShowAddUser(true)} className="btn btn-link">Sign up</button>
                        </p>
                    </div>
                </div>
            </div>
            <AddUser />
        </section>
    )
}
