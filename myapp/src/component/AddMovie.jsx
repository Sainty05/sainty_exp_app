import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { useGlobalContext } from '../utils/context';
import axiosBaseURL from '../utils/axiosBaseUrl';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";

export default function AddUser() {
    const { showAddMovie, setShowAddMovie, fetchMovies, toast, currentPage } = useGlobalContext()
    const [movieName, setMovieName] = useState("")

    const addMovie = async () => {
        if (movieName === "") {
            return toast.current.show({ severity: 'warn', summary: 'Warning!', detail: 'Fill all requires fields!', life: 3000 });
        }
        let movie = {
            movieName: movieName,
        }

        axiosBaseURL.post("/addMovie", movie).then(() => {
            fetchMovies()
            setShowAddMovie(false)
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Movie added succesfully', life: 3000 });
            setMovieName("")
        }).catch((err) => {
            console.log(err)
            toast.current.show({ severity: 'error', summary: 'Error', detail: err.response.data.message, life: 3000 });
        })
    }

    return (
        <div>
            <Toast ref={toast} />
            <Dialog visible={showAddMovie} onHide={() => setShowAddMovie(false)} className='w-1/3 max-sm:w-11/12'>
                <h2 className='text-center'>Add Movie Form</h2>
                <div className='p-4'>
                    <form className='px-2'>
                        <div className="form-row">
                            <div className="form-group my-2">
                                <label htmlFor="inputuserName" className='fw-bold'>Username<span className='text-danger'>*</span></label>
                                <InputText value={movieName} className="form-control" onChange={(e) => setMovieName(e.target.value)} placeholder="enter name" />
                                {/* <input type="text" className="form-control" id="inputuserName" onChange={(e) => setUserName(e.target.value)} placeholder="enter name" /> */}
                            </div>
                        </div>
                    </form>
                    <div className='mt-4 px-2'>
                        <button type="submit" className="btn btn-primary w-100" onClick={() => addMovie()}>Submit</button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
