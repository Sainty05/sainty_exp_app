import React, { useState, useRef } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import axiosBaseURL from '../../utils/axiosBaseUrl';
import { useGlobalContext } from '../../utils/context';
import { RadioButton } from 'primereact/radiobutton';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";



export default function AddExpences() {
    const navigate = useNavigate()
    const { toast, fetchExpences, selectedCatagory, date, setSelectedCatagory, expItems, incItems, amount, userId, setAmount, discription, setDiscription, updateExpence, setUpdateExpence, id, amountType, setAmountType, addExpenceForm, setAddExpenceForm } = useGlobalContext()
    const [addCatagoryInput, setAddCatagoryInput] = useState(" d-none")
    const catagories = amountType === 'Income' ? [
        {
            label: 'INCOME',
            items: incItems,
        },] : [
        {
            label: 'EXPENCE',
            items: expItems
        },]
    const addButton = useRef(null);

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex justify-content-center align-items-center">
                <div className={option.label === "INCOME" ? "text-success fw-bold" : "text-danger fw-bold"}>{option.label}</div>
            </div>
        );
    };

    const saveExpences = () => {
        if (selectedCatagory !== "" && amount !== "" && amount !== null) {
            let message = amountType === "Income" ? "Income" : "Expence"
            addButton.current.setAttribute("disabled", true)
            if (updateExpence) {
                const Expence = {
                    userId, userId,
                    catagory: selectedCatagory,
                    amount: amount,
                    discription: discription,
                    amountType: amountType
                }
                axiosBaseURL.put(`/updateExpence/${id}`, Expence).then(() => {
                    fetchExpences(date)
                    setAmount('')
                    setSelectedCatagory('')
                    setDiscription('')
                    setAddCatagoryInput(" d-none")
                    setUpdateExpence(false)
                    navigate("/manageExpences")
                    // setAddExpenceForm(false)
                    addButton.current.removeAttribute("disabled")
                    toast.current.show({ severity: 'success', summary: 'Updated', detail: `${message} updated successfully`, life: 3000 });
                }).catch((err) => {
                    // console.log(err.response.status)
                    addButton.current.removeAttribute("disabled")
                    if (err.response.status === 400) {
                        toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please change data to update', life: 3000 });
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error!', detail: `${message} not updated!`, life: 3000 });
                    }
                })
            } else {
                const Expence = {
                    userId: userId,
                    catagory: selectedCatagory,
                    amount: amount,
                    discription: discription,
                    amountType: amountType
                }
                axiosBaseURL.post('/addExpence', Expence).then((res) => {
                    fetchExpences(date)
                    setAmount('')
                    setSelectedCatagory('')
                    setDiscription('')
                    addButton.current.removeAttribute("disabled")
                    setAddCatagoryInput(" d-none")
                    // setAddExpenceForm(false)
                    navigate("/manageExpences")
                    toast.current.show({ severity: 'success', summary: 'Success', detail: `${message} added Successfully`, life: 3000 });
                }).catch(() => {
                    addButton.current.removeAttribute("disabled")
                    toast.current.show({ severity: 'error', summary: 'Error', detail: `${message} failed to save`, life: 3000 });
                })
            }
        } else {
            toast.current.show({ severity: 'warn', summary: 'Warning!', detail: 'Please fill all reqruired field!', life: 3000 });
        }
    }

    const handleCancel = () => {
        // setUpdateExpence(false)
        setAmount('')
        setSelectedCatagory('')
        setDiscription('')
        setAddCatagoryInput(" d-none")
        navigate("/manageExpences")
        // setAddExpenceForm(false)
    }

    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Do you want to delete this Expence?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => deleteExpence(id),
            reject
        });
    };

    const deleteExpence = (id) => {
        axiosBaseURL.delete(`/Expence/${id}`).then(() => {
            fetchExpences(date)
            navigate("/manageExpences")
            toast.current.show({ severity: 'success', summary: 'Deleted', detail: 'Expence deleted succesfully', life: 3000 });
        }).catch(() => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Expence didn\'t deleted', life: 3000 });
        })
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }


    return (
        // <Dialog header="Add Income/Expence" visible={addExpenceForm} style={{ width: '95vw' }} onHide={() => setAddExpenceForm(false)}>
        <div className="h-screen rounded p-3 mx-auto">
            <ConfirmDialog />
            <Toast ref={toast} />
            <h2 className='m-4 text-center'>Add Income/Expence</h2>
            <div className="mx-2 flex flex-wrap sm:justify-center gap-3">
                <div className="flex align-items-center">
                    <RadioButton inputId="amountType1" name="catagory" value="Income" onChange={(e) => { setAmountType(e.value); setAddCatagoryInput(" d-none") }} checked={amountType === 'Income'} />
                    <label htmlFor="amountType1" className="ml-2 text-success">Income</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="amountType2" name="catagory" value="Expence" onChange={(e) => { setAmountType(e.value); setAddCatagoryInput(" d-none") }} checked={amountType === 'Expence'} />
                    <label htmlFor="amountType2" className="ml-2 text-danger">Expence</label>
                </div>
            </div>
            <div className="flex flex-wrap flex-col align-items-center">
                <div className="p-2 w-1/4 max-sm:w-full">
                    <div className="relative">
                        <label htmlFor="name" className="leading-7 text-sm text-white">Catagory<span className='text-danger'> *</span></label>
                        <InputText value={selectedCatagory} placeholder="Enter new catagory" onChange={(e) => setSelectedCatagory(e.target.value)} rows={1} cols={30} className={"w-full md:w-14rem" + addCatagoryInput} />
                        <Dropdown value={selectedCatagory}
                            onChange={(e) => {
                                if (e.value === "+ Add New Catagoty") {
                                    setAddCatagoryInput("")
                                } else {
                                    setSelectedCatagory(e.value);
                                }
                            }}
                            options={catagories} optionLabel="label"
                            optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupedItemTemplate} className={"w-full md:w-14rem" + (addCatagoryInput === "" && " d-none")} placeholder="Select a Catagory" />
                    </div>
                </div>
                <div className="p-2 w-1/4 max-sm:w-full">
                    <div className="relative">
                        <label htmlFor="email" className="leading-7 text-sm text-white">Amount<span className='text-danger'> *</span></label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">₹</span>
                            <InputNumber placeholder="Amount" value={amount} onValueChange={(e) => setAmount(e.value)} locale="en-IN" />
                        </div>
                    </div>
                </div>
                <div className="p-2 w-1/4 max-sm:w-full">
                    <div className="relative">
                        <label htmlFor="email" className="leading-7 text-sm text-white">Discription</label>
                        <InputText value={discription} placeholder="discription" onChange={(e) => setDiscription(e.target.value)} rows={1} cols={30} className="w-full md:w-14rem" />
                    </div>
                </div>
                <div className="p-2 mt-4 w-1/4 max-sm:w-full">
                    <div className='flex align-items-center justify-content-center'>
                        {!updateExpence ? <><button onClick={() => saveExpences("Income")} ref={addButton} className="text-white bg-indigo-700 border-0 max-sm:px-10 py-2.5 px-12 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add</button>
                            <button onClick={() => handleCancel()} className="ml-3 text-white bg-gray-500 border-0 py-2.5 max-sm:px-6 px-10 focus:outline-none hover:bg-black rounded 
                            text-lg">Cancel</button></> :
                            <><button onClick={() => saveExpences(amountType)} ref={addButton} className="text-white bg-indigo-700 border-0 max-sm:px-6 py-2.5 px-10 focus:outline-none hover:bg-indigo-600 rounded text-lg">Update</button>
                                <button onClick={() => handleCancel()} className="ml-3 text-white bg-gray-500 border-0 py-2.5 max-sm:px-6 px-10 focus:outline-none hover:bg-black rounded 
                            text-lg">Cancel</button>
                                <button onClick={() => confirmDelete(id)} className="ml-3 text-white bg-red-500 border-0 py-2.5 max-sm:px-6 px-10 focus:outline-none hover:bg-red-900 rounded 
                            text-lg">Delete</button>
                            </>}
                    </div>
                </div>
            </div>
        </div >
        // </Dialog>
    )
}
