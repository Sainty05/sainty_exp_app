import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useGlobalContext } from '../utils/context'
import { useNavigate } from 'react-router-dom'
import axiosBaseURL from '../utils/axiosBaseUrl';
import logo from "../assests/logo.webp"
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
//
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Dialog, Popover } from '@headlessui/react'

export default function Navbar() {
    const navigate = useNavigate()
    const { sessionActive, setSessionActive, toast, setUserId, userId, setAddExpenceForm, setShowChart } = useGlobalContext()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [profileMenu, setProfileMenu] = useState("hidden")
    const [avatarName, setAvatarName] = useState("user")

    useEffect(() => {
        sessionChecker()
    }, [])

    // console.log(sessionActive)
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

    //-----------------------------------------
    return (
        <>
            {sessionActive &&
                <header className="bg-gradient-to-r sticky bottom-0 from-stone-300 from-10% via-grey-500 via-30% to-stone-300 to-90%" >
                    <nav className="mx-auto flex items-center justify-between p-3 lg:px-8" aria-label="Global">
                        <Link to="/manageExpences" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-10 w-auto" src={logo} alt="logo" />
                        </Link>
                        {/* <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div> */}
                        {/* <Link to="/" className="text-lg no-underline font-semibold leading-6 text-gray-900">
                                Home
                            </Link> */}
                        {userId === 1 && <Link to="/users" className="text-lg no-underline font-semibold leading-6 text-gray-900">
                            Manage Users
                        </Link>}
                        {/* <Button icon="pi pi-chart-bar" text rounded onClick={() => setShowChart(true)} severity="secondary" aria-label="pie chart" /> */}
                        <Link to="/pieChart"><i className='pi pi-chart-bar text-gray-900'></i></Link>
                        <Link to="/addExpences" className='text-white border border-black no-underline hover:bg-gray-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center'><i className='pi pi pi-plus text-gray-900 fw-bold'></i></Link>
                        <Link to="/monthlyData"><i className='pi pi pi-list text-gray-900'></i></Link>
                        {/* <Link to="/manageExpences" className="text-lg no-underline font-semibold leading-6 text-gray-900">
                                Manage Expences
                            </Link> */}
                        {/* <div className="lg:flex lg:flex-1 lg:justify-end lg:gap-x-12"> */}
                        <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* <!-- Profile dropdown --> */}
                            <div className="relative ml-3">
                                <div>
                                    <Link to="/myProfile" className="relative no-underline border border-black flex rounded-full text-md" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <Avatar label={avatarName.charAt(0).toUpperCase()} style={{ color: 'black', fontWeight: "bold" }} shape="circle" />
                                    </Link>
                                </div>
                                {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                                {/* <div className={"absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-dark py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " + profileMenu} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                    <button onClick={() => setProfileMenu("hidden")}><Link to="/myProfile" className="block no-underline  px-4 py-2 text-sm text-white" role="menuitem" tabIndex="-1" id="user-menu-item-0">My Profile</Link></button>
                                    <button onClick={() => handleLogout()} className="block px-4 py-2 text-sm text-white" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
                                </div> */}
                            </div>
                        </div>
                        {/* </div> */}
                    </nav>
                    {/* <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <div className="fixed inset-0 z-10" />
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gradient-to-r from-stone-300 from-10% via-grey-500 via-30% to-stone-300 to-90% px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <Link to="/" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                        alt=""
                                    />
                                </Link>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        <Link
                                            to="/"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Home
                                        </Link>
                                        {userId === 1 && <Link
                                            to="/users"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Manage Users
                                        </Link>}
                                        <Link
                                            to="/manageExpences"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Daily Expences
                                        </Link>
                                    </div>
                                    <div className="py-6">
                                        <Link
                                            to="/myProfile"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={() => handleLogout()}
                                            className="-mx-3 w-full text-start block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog> */}
                </header >}
        </>
    )
}
