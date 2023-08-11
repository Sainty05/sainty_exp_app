import React, { useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useGlobalContext } from '../utils/context';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axiosBaseURL from '../utils/axiosBaseUrl';


export default function Users() {
    const { setShowAddUser, fetchUsers, users, toast, setShowUpdateUser, setUserData } = useGlobalContext()

    useEffect(() => {
        fetchUsers()
    }, [])
    // PrimeReact.changeTheme(currentTheme: string, newTheme: string, linkElementId: string, callback: Function)
    //action
    const actionTemplate = (rowData, options) => {
        return (<>
            <Button type="button" icon='pi pi-user-edit' onClick={() => updateUser(rowData._id)} className="p-button-sm p-button-text" />
            <Button type="button" icon='pi pi-trash' onClick={() => confirmDelete(rowData._id)} severity="danger" className="p-button-sm p-button-text" />
        </>)
    };

    const updateUser = (id) => {
        axiosBaseURL.post("/fetchUser", { id: id }).then((res) => {
            // console.log(res)
            setUserData(res.data)
        })
        setShowUpdateUser(true)
    }

    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Do you want to delete this user?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => deleteUser(id),
            reject
        });
    };

    const deleteUser = (id) => {
        axiosBaseURL.delete(`/users/${id}`).then(() => {
            fetchUsers()
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'User deleted succesfully', life: 3000 });
        }).catch(() => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'User didn\'t deleted', life: 3000 });
        })
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    return (
        <div>
            <ConfirmDialog />
            <Toast ref={toast} />
            <div className='container'>
                <div className='d-flex mt-5 justify-content-between'>
                    <h3 className=''>User List</h3>
                    <div>
                        <button type="button" className="btn btn-dark" onClick={() => setShowAddUser(true)}>Add User</button>
                    </div>
                </div>
                <DataTable value={users} tableStyle={{ minWidth: '50rem' }} stripedRows>
                    <Column field="index" header="Index"></Column>
                    <Column field="userName" header="Username"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="contact" header="Contact"></Column>
                    <Column field="about" header="About"></Column>
                    <Column header="Action" style={{ flex: '0 0 4rem' }} body={actionTemplate}></Column>
                </DataTable>
            </div>
            <AddUser />
            <UpdateUser />
        </div>
    )
}
