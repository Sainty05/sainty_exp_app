import React, { useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useGlobalContext } from '../utils/context';
import AddMovie from './AddMovie';
import UpdateMovie from './UpdateMovie';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axiosBaseURL from '../utils/axiosBaseUrl';


export default function Movies() {
    const { setShowAddMovie, fetchMovies, movies, toast, setShowUpdateMovie, setMovieData } = useGlobalContext()

    useEffect(() => {
        fetchMovies()
    }, [])

    //action
    const actionTemplate = (rowData, options) => {
        return (<>
            <Button type="button" icon='pi pi-user-edit' onClick={() => updateMovie(rowData._id)} className="p-button-sm p-button-text" />
            <Button type="button" icon='pi pi-trash' onClick={() => confirmDelete(rowData._id)} severity="danger" className="p-button-sm p-button-text" />
        </>)
    };

    const updateMovie = (id) => {
        axiosBaseURL.post("/fetchMovie", { id: id }).then((res) => {
            setMovieData(res.data)
        })
        setShowUpdateMovie(true)
    }

    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Do you want to delete this movie?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => deleteMovie(id),
            reject
        });
    };

    const deleteMovie = (id) => {
        axiosBaseURL.delete(`/movies/${id}`).then(() => {
            fetchMovies()
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Movie deleted succesfully', life: 3000 });
        }).catch(() => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Movie didn\'t deleted', life: 3000 });
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
                    <h3 className=''>Movie List</h3>
                    <div>
                        <button type="button" className="btn btn-dark" onClick={() => setShowAddMovie(true)}>Add Movie</button>
                    </div>
                </div>
                <DataTable value={movies} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="index" header="Index"></Column>
                    <Column field="movieName" header="Movie Name"></Column>
                    {/* <Column field="email" header="Email"></Column>
                    <Column field="contact" header="Contact"></Column>
                    <Column field="about" header="About"></Column> */}
                    <Column header="Action" style={{ flex: '0 0 4rem' }} body={actionTemplate}></Column>
                </DataTable>
            </div>
            <AddMovie />
            <UpdateMovie />
        </div>
    )
}
