import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useGlobalContext } from '../utils/context'
import { useNavigate } from 'react-router-dom'
import axiosBaseURL from '../utils/axiosBaseUrl';
import logo from "../assests/logo.webp"
import { Avatar } from 'primereact/avatar';

export default function Navbar() {
    const navigate = useNavigate()
    const { sessionActive, setSessionActive, setUserId } = useGlobalContext()
    const [avatarName, setAvatarName] = useState("user")

    const sessionChecker = () => {
        let session = JSON.parse(localStorage.getItem("session"))
        axiosBaseURL.post('/session', session).then((res) => {
            setSessionActive(res.data.sessionActive)
            setUserId(session.sessionUserId)
            setAvatarName(session.sessionUserName)
        }).catch((err) => {
            navigate("/login")
            setSessionActive(err.response.data.sessionActive)
        })
    }

    useEffect(() => {
        sessionChecker()
    }, [])
    
    //-----------------------------------------
    return (
        <header className="bg-gradient-to-r sticky bottom-0 from-stone-300 from-10% via-grey-500 via-30% to-stone-300 to-90%" >
            {sessionActive &&
                <nav className="mx-auto flex items-center justify-between p-3 lg:px-8" aria-label="Global">
                    <Link to="/manageExpences" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-10 w-auto" src={logo} alt="logo" />
                    </Link>
                    <Link to="/pieChart"><i className='pi pi-chart-bar text-gray-900'></i></Link>
                    <Link to="/addExpences" className='text-white border border-black no-underline hover:bg-gray-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center'><i className='pi pi pi-plus text-gray-900 fw-bold'></i></Link>
                    <Link to="/monthlyData"><i className='pi pi pi-list text-gray-900'></i></Link>
                    <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div>
                                <Link to="/myProfile" className="relative no-underline border border-black flex rounded-full text-md" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <Avatar label={avatarName.charAt(0).toUpperCase()} style={{ color: 'black', fontWeight: "bold" }} shape="circle" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>}
        </header >
    )
}
