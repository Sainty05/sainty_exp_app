import React, { useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useGlobalContext } from '../../utils/context';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axiosBaseURL from '../../utils/axiosBaseUrl';
import { Tag } from 'primereact/tag';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Calendar } from 'primereact/calendar';
import { DataView } from 'primereact/dataview';
import { OrderList } from 'primereact/orderlist';
import { DataScroller } from 'primereact/datascroller';
import { useNavigate } from "react-router-dom";


export default function ExpencesTable() {
    const navigate = useNavigate()
    const { toast, Expences, fetchExpences, userId, setSelectedCatagory, setAmount, setDiscription, setUpdateExpence, setId, setAmountType, setShowChart, date, setDate, setAddExpenceForm } = useGlobalContext()


    useEffect(() => {
        setDate(new Date())
        fetchExpences(new Date())
    }, [])


    //action
    const actionTemplate = (rowData, options) => {
        if (rowData.catagory !== "Prev Income") {
            return (
                <>
                    <Button type="button" icon='pi pi-user-edit' tooltip='Update' onClick={() => updateExpence(rowData._id)} className="p-button-sm p-button-text" />
                    <Button type="button" icon='pi pi-trash' tooltip='Delete' onClick={() => confirmDelete(rowData._id)} severity="danger" className="p-button-sm p-button-text" />
                </>
            )
        }
    };

    const updateExpence = (id) => {
        axiosBaseURL.post("/fetchExpence", { id: id }).then((res) => {
            // console.log(res.data.Expence)
            setUpdateExpence(true)
            setSelectedCatagory(res.data.expence.catagory)
            setAmount(Number(res.data.expence.amount))
            setDiscription(res.data.expence.discription)
            setAmountType(res.data.expence.amountType)
            setId(res.data.expence._id)
            // setAddExpenceForm(true)
            navigate("/addExpences")
        })
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
            toast.current.show({ severity: 'success', summary: 'Deleted', detail: 'Expence deleted succesfully', life: 3000 });
        }).catch(() => {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Expence didn\'t deleted', life: 3000 });
        })
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const header = (
        <div className="flex flex-wrap justify-between gap-2">
            <Calendar value={date} onChange={(e) => { setDate(e.value); fetchExpences(e.value) }} view="month" dateFormat="MM - yy" />
            <Button icon="pi pi-chart-pie" text raised rounded tooltip='Pie Chart' onClick={() => setShowChart(true)} severity="info" aria-label="pie chart" />
            {/* <h5 className=''>Balance: {balance()}</h5> */}
        </div>
    );

    const totalIncome = () => {
        let totalIncome = 0;
        for (let expence of Expences) {
            totalIncome += Number(expence.income === "-" ? 0 : expence.income)
        }
        return totalIncome
    }

    const totalExpence = () => {
        let totalExpence = 0;
        for (let expence of Expences) {
            totalExpence += Number(expence.expence === "-" ? 0 : expence.expence)
        }
        return totalExpence
    }

    const balance = () => {
        let totalIncome = 0;
        let totalExpence = 0
        for (let expence of Expences) {
            totalIncome += Number(expence.income === "-" ? 0 : expence.income)
            totalExpence += Number(expence.expence === "-" ? 0 : expence.expence)
        }

        let balance = totalIncome - totalExpence
        return <span>{(balance < 0 ? "- ₹" : "₹") + Math.abs(balance)}</span>
        // return <Tag className="px-3 py-2 fw-semibold text-grey h6" severity={balance < 0 ? "danger" : "success"} value={"Balance: " + Math.abs(balance)}></Tag>
        // console.log(balance)
    }


    // const footerGroup = (
    //     <ColumnGroup>
    //         <Row>
    //             <Column footer="Totals:" colSpan={4} />
    //             <Column footer={totalIncome} footerStyle={{ color: 'green' }} />
    //             <Column footer={totalExpence} footerStyle={{ color: '#db1a1a' }} />
    //             <Column footer={balance} />
    //         </Row>
    //     </ColumnGroup>
    // )

    const expenceTemplate = (expence) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-2 pl-4 mx-2 gap-4" onClick={() => updateExpence(expence._id)}>
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${expence.image}`} alt={expence.name} /> */}
                    <div className="flex justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex max-sm:flex-col sm:justify-evenly max-sm:align-start gap-1">
                            <div className="text-xl font-bold text-900">{expence.catagory}</div>
                            <span className="flex sm:mx-5 align-items-center gap-2" style={{ fontSize: "0.65rem" }}>
                                <i className="pi pi-info-circle" style={{ fontSize: "0.65rem" }}></i>
                                <span className="">{expence.discription}</span>
                            </span>
                            <span className="flex text-sm align-items-center gap-2" style={{ fontSize: "0.65rem" }}>
                                <i className="pi pi-calendar" style={{ fontSize: "0.65rem" }}></i>
                                <span className="">{expence.createdAt}</span>
                            </span>
                        </div>
                        <div className="flex max-sm:flex-col align-items-end gap-3 sm:gap-2">
                            <span className={"text-xl font-semibold " + (expence.amountType === "Income" ? "text-green-700" : "text-red-600")}>₹ {expence.amount}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    return (
        <div>
            <ConfirmDialog />
            <Toast ref={toast} />
            <div className='mt-3 px-0 container'>
                <h4 className='text-white text-center'>Balance: {balance()}</h4>
                <div className='p-4 flex justify-between'>
                    <Tag className="mr-2" icon="pi pi-arrow-up" severity="danger"><span className="text-base">{"Expence: " + totalExpence()}</span></Tag>
                    <Tag className="mr-2" icon="pi pi-arrow-down" severity="success"><span className="text-base">{"Income: " + totalIncome()}</span></Tag>
                </div>
                {/* <h4 className='text-center text-white max-sm:m-auto'>Expences List</h4> */}
                <div className=''>
                    <DataScroller value={Expences} itemTemplate={expenceTemplate} rows={5} inline scrollHeight="450px" />
                    {/* <DataView value={Expences} itemTemplate={expenceTemplate} /> */}
                    {/* <OrderList value={Expences} onChange={(e) => updateExpence(e.value)} itemTemplate={expenceTemplate} header="Expence List"></OrderList> */}
                </div>
                {/* <DataTable header={header} footerColumnGroup={footerGroup} size="small" value={Expences} scrollable scrollHeight="511px" tableStyle={{ minWidth: '50rem' }} stripedRows>
                    <Column field="index" header="Index"></Column>
                    <Column field="createdAt" header="Date"></Column>
                    <Column field="catagory" header="Catagory"></Column>
                    <Column field="discription" header="Discription" style={{ width: '25%' }}></Column>
                    <Column field="income" header="Income"></Column>
                    <Column field="expence" header="Expence"></Column>
                    <Column header="Action" style={{ height: '60px' }} body={actionTemplate}></Column>
                </DataTable> */}
            </div>
        </div>
    )
}

