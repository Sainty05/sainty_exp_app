import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useGlobalContext } from '../utils/context'
import { useNavigate } from 'react-router-dom'
import axiosBaseURL from '../utils/axiosBaseUrl';
//
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Dialog, Popover } from '@headlessui/react'

export default function Navbar() {
    const navigate = useNavigate()
    const { sessionActive, setSessionActive, toast, setUserId } = useGlobalContext()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        sessionChecker()
    }, [])

    // console.log(sessionActive)
    const sessionChecker = () => {
        let session = JSON.parse(localStorage.getItem("session"))
        axiosBaseURL.post('/session', session).then((res) => {
            setSessionActive(res.data.sessionActive)
            setUserId(session.sessionUserId)
        }).catch((err) => {
            navigate("/login")
            setSessionActive(err.response.data.sessionActive)
        })
    }

    const handleLogout = () => {
        let sessionId = JSON.parse(localStorage.getItem("session")).sessionId
        axiosBaseURL.post('/logout', { sessionId: sessionId }).then((res) => {
            // console.log(res.data.sessionActive)
            setSessionActive(res.data.sessionActive)
            navigate("/login")
        }).catch((err) => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: "User didn't loguot", life: 3000 });
        })
    }

    //-----------------------------------------
    return (
        <>
            {sessionActive &&
                <header className="bg-gradient-to-r from-stone-300 from-10% via-grey-500 via-30% to-stone-300 to-90%" >
                    <nav className="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                        <div className="flex lg:flex-1">
                            <Link to="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="" />
                            </Link>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <Popover.Group className="hidden lg:flex lg:gap-x-12">
                            <Link to="/" className="text-md font-semibold leading-6 text-gray-900">
                                Home
                            </Link>
                            <Link to="/users" className="text-md font-semibold leading-6 text-gray-900">
                                Manage Users
                            </Link>
                            <Link to="/movies" className="text-md font-semibold leading-6 text-gray-900">
                                Manage Movies
                            </Link>
                            <Link to="/dailyExpences" className="text-md font-semibold leading-6 text-gray-900">
                                Daily Expences
                            </Link>
                        </Popover.Group>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <button onClick={() => handleLogout()} className="text-md font-semibold leading-6 text-gray-900">
                                Log Out <span aria-hidden="true">&rarr;</span>
                            </button>
                        </div>
                    </nav>
                    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
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
                                        <Link
                                            to="/users"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Manage Users
                                        </Link>
                                        <Link
                                            to="/movies"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Manage Movies
                                        </Link>
                                        <Link
                                            to="/dailyExpences"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Daily Expences
                                        </Link>
                                    </div>
                                    <div className="py-6">
                                        <button
                                            onClick={() => handleLogout()}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </header >}
        </>
    )
}
