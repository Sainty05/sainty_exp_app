import React, { useEffect, useState } from 'react'
import axiosBaseURL from '../utils/axiosBaseUrl'
import { InputText } from "primereact/inputtext";
import { useGlobalContext } from '../utils/context';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

export default function MyProfile() {
    const { toast, setSessionActive } = useGlobalContext()
    const [userData, setUserData] = useState({})
    const [ChangePassword, setChangePassword] = useState(false)
    const [updateData, setUpdateData] = useState(false)
    const id = JSON.parse(localStorage.getItem("session")).sessionUserId
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validatePassword, setValidatePassword] = useState("")

    const navigate = useNavigate()

    const profileData = () => {
        axiosBaseURL.post("/fetchUser", { id: id }).then((res) => {
            setUserData(res.data)
        })
    }

    useEffect(() => {
        profileData()
    }, [])

    const updateProfile = () => {
        axiosBaseURL.put(`/updateUser/${userData._id}`, userData).then(() => {
            profileData()
            setUpdateData(false)
            toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Profile updated succesfully', life: 3000 });
        }).catch((err) => {
            if (err.response.status === 400) {
                return toast.current.show({ severity: 'warn', summary: 'Warning', detail: err.response.data.message, life: 3000 });
            }
            toast.current.show({ severity: 'error', summary: 'Error', detail: err.response.data.message, life: 3000 });
        })
    }

    const updatePassword = () => {
        if (password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                axiosBaseURL.put(`/updatePassword/${id}`, { password: password }).then((res) => {
                    setPassword("")
                    setConfirmPassword("")
                    setChangePassword(false)
                    toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Password updated succesfully', life: 3000 });
                }).catch((err) => {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: err.response.data.message, life: 3000 });
                })
            } else {
                toast.current.show({ severity: 'error', summary: 'Warning', detail: "New & Confirm password must be same!", life: 3000 });
            }
        } else {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: "Fill all required field!", life: 3000 });
        }
    }

    const confirmDelete = () => {
        confirmDialog({
            message: 'Do you want to delete your profile ?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => deleteUser(),
            reject
        });
    };

    const deleteUser = () => {
        axiosBaseURL.delete(`/users/${id}`).then(() => {
            let sessionId = JSON.parse(localStorage.getItem("session")).sessionId
            axiosBaseURL.post('/logout', { sessionId: sessionId }).then((res) => {
                setSessionActive(res.data.sessionActive)
                localStorage.removeItem("session")
                navigate("/login")
            }).catch(() => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: "User didn't loguot", life: 3000 });
            })
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'User deleted succesfully', life: 3000 });
        }).catch(() => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'User didn\'t deleted', life: 3000 });
        })
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const handleLogout = () => {
        let sessionId = JSON.parse(localStorage.getItem("session")).sessionId
        axiosBaseURL.post('/logout', { sessionId: sessionId }).then((res) => {
            setSessionActive(res.data.sessionActive)
            localStorage.removeItem("session")
            navigate("/login")
        }).catch(() => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: "User didn't logout", life: 3000 });
        })
    }

    return (
        <div className='container min-h-screen'>
            <ConfirmDialog />
            <div className="px-4 pt-4 sm:px-0">
                <h3 className="text-center  font-semibold leading-7 text-white">My Profile</h3>
            </div>
            {userData !== {} &&
                <div className='mt-10 mx-auto max-sm:w-full w-1/2'>
                    <div className="border-t border-b border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-white">Username</dt>
                                {!updateData ?
                                    <dd className="fw-bold mt-1 text-xl leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userData.userName}</dd> :
                                    <dd className=''>
                                        <InputText value={userData.userName} className="form-control" onChange={(e) => setUserData({ ...userData, userName: e.target.value })} placeholder="enter name" />
                                    </dd>
                                }
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-white">Email</dt>
                                {!updateData ?
                                    <dd className="mt-1 text-md leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userData.email}</dd> :
                                    <div className=''>
                                        <InputText value={userData.email} className="form-control" onChange={(e) => setUserData({ ...userData, email: e.target.value })} placeholder="example@email.com" />
                                    </div>
                                }
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-white">Contact</dt>
                                {!updateData ?
                                    <dd className="mt-1 text-md leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userData.contact}</dd> :
                                    <div className=''>
                                        <input type="number" value={userData.contact} className="form-control" id="inputContact" placeholder="9999999999" onChange={(e) => setUserData({ ...userData, contact: e.target.value })} />
                                    </div>
                                }
                            </div>
                            <div className="px-4 pt-6 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-white">About</dt>
                                {!updateData ?
                                    <dd className="mt-1 text-md leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{userData.about}</dd> :
                                    <div className=''>
                                        <InputText value={userData.about} className="form-control" onChange={(e) => setUserData({ ...userData, about: e.target.value })} placeholder="about you..." />
                                    </div>
                                }
                            </div>
                        </dl>
                    </div>
                    {updateData &&
                        <div>
                            <div className='text-center mt-5'>
                                <button className='btn btn-light' onClick={() => updateProfile()}>Update</button>
                                <button onClick={() => {
                                    setUpdateData(false);
                                    setChangePassword(false)
                                    setPassword("")
                                    setConfirmPassword("")
                                }}
                                    className='btn ml-5 btn-secondary'>Cancel</button>
                            </div>
                            <div className='mt-10 p-2 pt-3 text-center border-t border-gray-600'>
                                {!ChangePassword ?
                                    <>
                                        <button className='text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' onClick={() => setChangePassword(true)}>Update Password</button>
                                        {userData._id !== 1 &&
                                            <button onClick={() => confirmDelete()} className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'>Delete Profile</button>
                                        }
                                    </>
                                    :
                                    <div className='pb-3'>
                                        <div className='sm:flex max-sm:m-2 mt-3 gap-2'>
                                            <div>
                                                <input type="password" className="form-control max-sm:mb-2" id="inputPassword" onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
                                            </div>
                                            <div>
                                                <input type="password" className="form-control max-sm:mb-2" id="inputConfirmPassword" onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                    if (e.target.value === password) {
                                                        setValidatePassword(" d-none")
                                                    } else {
                                                        setValidatePassword("")
                                                    }
                                                }}
                                                    placeholder="Confirm Password" />
                                            </div>
                                            <div>
                                                <button className='btn btn-secondary' onClick={() => updatePassword()}>Update</button>
                                                <button className='btn ml-2 btn-dark' onClick={() => {
                                                    setChangePassword(false);
                                                    setPassword("")
                                                    setConfirmPassword("")
                                                }}>Cancel</button>
                                            </div>
                                        </div>
                                        <div>
                                            {confirmPassword !== "" &&
                                                <div className={"text-sm text-danger" + validatePassword}>* New and Confirm password should be same</div>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            }
            {!updateData &&
                <div className='mt-3 flex flex-col'>
                    <button className='btn btn-dark mb-3' onClick={() => setUpdateData(true)}>Update Profile</button>
                    {userData._id === 1 &&
                        <Link to="/users" className="btn btn-primary mb-3">Manage Users</Link>
                    }
                    <button onClick={() => handleLogout()} className="btn btn-danger mb-3" tabIndex="-1" id="user-menu-item-2">Sign out</button>
                </div>
            }
        </div >
    )
}
