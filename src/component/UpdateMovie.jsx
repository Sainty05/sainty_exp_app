import React from 'react'
import { Dialog } from 'primereact/dialog';
import { useGlobalContext } from '../utils/context';
import axiosBaseURL from '../utils/axiosBaseUrl';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";


export default function AddUser() {

    const { showUpdateMovie, setShowUpdateMovie, fetchMovies, toast, movieData, setMovieData } = useGlobalContext()

    const updateMovie = async () => {
        axiosBaseURL.put(`/updateMovie/${movieData._id}`, movieData).then(() => {
            fetchMovies()
            setShowUpdateMovie(false)
            toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Movie updated succesfully', life: 3000 });
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
            <Dialog visible={showUpdateMovie} style={{ width: '30vw' }} onHide={() => setShowUpdateMovie(false)}>
                <h2 className='text-center'>Update Movie Form</h2>
                <div className='p-4'>
                    {movieData != null && <form className='px-2'>
                        <div className="form-row">
                            <div className="form-group my-2">
                                <label htmlFor="inputuserName" className='fw-bold'>Username</label>
                                <InputText value={movieData.movieName} className="form-control" onChange={(e) => setMovieData({ ...movieData, movieName: e.target.value })} placeholder="enter name" />
                            </div>
                        </div>
                    </form>}
                    <div className='mt-4 px-2'>
                        <button type="submit" className="btn btn-primary w-100" onClick={() => updateMovie()}>Submit</button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
