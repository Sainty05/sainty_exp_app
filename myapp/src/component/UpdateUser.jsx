import React from 'react'
import { Dialog } from 'primereact/dialog';
import { useGlobalContext } from '../utils/context';
import axiosBaseURL from '../utils/axiosBaseUrl';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";


export default function AddUser() {

    const { showUpdateUser, setShowUpdateUser, fetchUsers, toast, userData, setUserData } = useGlobalContext()

    const updateUser = async () => {
        axiosBaseURL.put(`/updateUser/${userData._id}`, userData).then(() => {
            fetchUsers()
            setShowUpdateUser(false)
            toast.current.show({ severity: 'success', summary: 'Updated', detail: 'User updated succesfully', life: 3000 });
        }).catch((err) => {
            // console.log(err)
            if (err.response.status === 400) {
                return toast.current.show({ severity: 'warn', summary: 'Warning', detail: err.response.data.message, life: 3000 });
            }
            toast.current.show({ severity: 'error', summary: 'Error', detail: err.response.data.message, life: 3000 });
        })
    }

    return (
        <div>
            <Toast ref={toast} />
            <Dialog visible={showUpdateUser} style={{ width: '30vw' }} onHide={() => setShowUpdateUser(false)}>
                <h2 className='text-center'>Update User Form</h2>
                <div className='p-4'>
                    {userData != null && <form className='px-2'>
                        <div className="form-row">
                            <div className="form-group my-2">
                                <label htmlFor="inputuserName" className='fw-bold'>Username</label>
                                <InputText value={userData.userName} className="form-control" onChange={(e) => setUserData({ ...userData, userName: e.target.value })} placeholder="enter name" />
                                {/* <input type="text" className="form-control" id="inputuserName" onChange={(e) => setUserName(e.target.value)} placeholder="enter name" /> */}
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="inputEmail4" className='fw-bold'>Email</label>
                                <InputText value={userData.email} className="form-control" onChange={(e) => setUserData({ ...userData, email: e.target.value })} placeholder="example@email.com" />
                                {/* <input type="email" className="form-control" id="inputEmail4" onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" /> */}
                            </div>
                            {/* <div className="form-group my-2">
                                <label htmlFor="inputPassword4" className='fw-bold'>Password</label>
                                <input value={userData.password} type="password" className="form-control" id="inputPassword4" onChange={(e) => setUserData({ ...userData, password: e.target.value })} placeholder="Password" />
                            </div> */}
                            <div className="form-group my-2">
                                <label htmlFor="inputContact" className='fw-bold'>Contact</label>
                                <input type="number" value={userData.contact} className="form-control" id="inputContact" placeholder="9999999999" onChange={(e) => setUserData({ ...userData, contact: e.target.value })} />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="inputAbout" className='fw-bold'>About</label>
                                <textarea value={userData.about} className="form-control" id="inputAbout" placeholder="Tell something about you..." onChange={(e) => setUserData({ ...userData, about: e.target.value })} />
                            </div>
                        </div>
                    </form>}
                    <div className='mt-4 px-2'>
                        <button type="submit" className="btn btn-primary w-100" onClick={() => updateUser()}>Submit</button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
