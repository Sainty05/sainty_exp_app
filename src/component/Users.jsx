import React, { useEffect, useState } from 'react'
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
    const [expandedRows, setExpandedRows] = useState(null);

    useEffect(() => {
        fetchUsers()
    }, [])

    const actionTemplate = (rowData, options) => {
        return (
            <>
                {rowData._id !== 1 && <>
                    <Button type="button" icon='pi pi-user-edit' onClick={() => updateUser(rowData._id)} className="p-button-sm p-button-text" />
                    <Button type="button" icon='pi pi-trash' onClick={() => confirmDelete(rowData._id)} severity="danger" className="p-button-sm p-button-text" />
                </>}
            </>
        )
    };

    const updateUser = (id) => {
        axiosBaseURL.post("/fetchUser", { id: id }).then((res) => {
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

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-1">
                <table>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <td className='pl-5'>{data.email}</td>
                        </tr>
                        <tr>
                            <th>Contact</th>
                            <td className='pl-5'>{data.contact}</td>
                        </tr>
                        <tr>
                            <th>About</th>
                            <td className='pl-5'>{data.about}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className='min-h-screen pt-5'>
            <h2 className='text-center pb-3'>Manage Users</h2>
            <ConfirmDialog />
            <Toast ref={toast} />
            <div className='container'>
                <div className='d-flex mb-1 justify-content-between'>
                    <h3 className=''>User List</h3>
                    <div>
                        <button type="button" className="btn btn-dark" onClick={() => setShowAddUser(true)}>Add User</button>
                    </div>
                </div>
                <DataTable expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} dataKey="index" rowExpansionTemplate={rowExpansionTemplate} value={users} size="small" tableStyle={{ minWidth: '98vw' }} stripedRows >
                    <Column expander style={{ width: '5rem' }} />
                    <Column field="index" header="Index"></Column>
                    <Column field='userName' header="Username"></Column>
                    <Column header="Action" style={{ flex: '0 0 4rem' }} body={actionTemplate}></Column>
                </DataTable>
            </div>
            <AddUser />
            <UpdateUser />
        </div>
    )
}
