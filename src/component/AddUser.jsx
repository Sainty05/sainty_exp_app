import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { useGlobalContext } from '../utils/context';
import axiosBaseURL from '../utils/axiosBaseUrl';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";

export default function AddUser() {
    const { showAddUser, setShowAddUser, fetchUsers, toast, currentPage } = useGlobalContext()
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [contact, setContact] = useState("")
    const [about, setAbout] = useState("")

    const addUser = async () => {
        if (userName === "" || email === "" || password === "" || contact === "") {
            return toast.current.show({ severity: 'warn', summary: 'Warning!', detail: 'Fill all requires fields!', life: 3000 });
        }
        let user = {
            userName: userName,
            email: email,
            password: password,
            contact: contact,
            about: about
        }

        axiosBaseURL.post("/addUser", user).then(() => {
            fetchUsers()
            setShowAddUser(false)
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'User added succesfully', life: 3000 });
            setUserName("")
            setEmail("")
            setPassword("")
            setContact("")
            setAbout("")
        }).catch((err) => {
            console.log(err)
            toast.current.show({ severity: 'error', summary: 'Error', detail: err.response.data.message, life: 3000 });
        })
    }

    return (
        <div>
            <Toast ref={toast} />
            <Dialog visible={showAddUser} onHide={() => setShowAddUser(false)} className='w-1/3 max-sm:w-11/12'>
                {currentPage === "login" ? <h2 className='text-center'>Registration Form</h2> : <h2 className='text-center'>Add User Form</h2>}
                <div className='p-4'>
                    <form className='px-2'>
                        <div className="form-row">
                            <div className="form-group my-2">
                                <label htmlFor="inputuserName" className='fw-bold'>Username<span className='text-danger'>*</span></label>
                                <InputText value={userName} className="form-control" onChange={(e) => setUserName(e.target.value)} placeholder="enter name" />
                                {/* <input type="text" className="form-control" id="inputuserName" onChange={(e) => setUserName(e.target.value)} placeholder="enter name" /> */}
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="inputEmail4" className='fw-bold'>Email<span className='text-danger'>*</span></label>
                                <InputText value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" />
                                {/* <input type="email" className="form-control" id="inputEmail4" onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" /> */}
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="inputPassword4" className='fw-bold'>Password<span className='text-danger'>*</span></label>
                                {/* <Password value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} toggleMask /> */}
                                <input type="password" className="form-control" id="inputPassword4" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="inputContact" className='fw-bold'>Contact<span className='text-danger'>*</span></label>
                                <input type="number" className="form-control" id="inputContact" placeholder="9999999999" onChange={(e) => setContact(e.target.value)} />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="inputAbout" className='fw-bold'>About</label>
                                <textarea className="form-control" id="inputAbout" placeholder="Tell something about you..." onChange={(e) => setAbout(e.target.value)} />
                            </div>
                        </div>
                    </form>
                    <div className='mt-4 px-2'>
                        <button type="submit" className="btn btn-primary w-100" onClick={() => addUser()}>Submit</button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
