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


export default function ExpencesTable() {
    const { toast, Expences, fetchExpences, userId, setSelectedCatagory, setAmount, setDiscription, setUpdateExpence, setId, setAmountType, setShowChart, date, setDate } = useGlobalContext()


    useEffect(() => {
        fetchExpences(date)
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
        return <Tag className="px-3 py-2 fw-semibold text-grey h6" severity={balance < 0 ? "danger" : "success"} value={"Balance: " + Math.abs(balance)}></Tag>
        // console.log(balance)
    }


    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Totals:" colSpan={4} />
                <Column footer={totalIncome} footerStyle={{ color: 'green' }} />
                <Column footer={totalExpence} footerStyle={{ color: '#db1a1a' }} />
                <Column footer={balance} />
            </Row>
        </ColumnGroup>
    )



    return (
        <div>
            <ConfirmDialog />
            <Toast ref={toast} />
            <div className='mt-4 px-0 container'>
            <h4 className='text-center text-white max-sm:m-auto'>Expences List</h4>
                <DataTable header={header} footerColumnGroup={footerGroup} size="small" value={Expences} scrollable scrollHeight="511px" tableStyle={{ minWidth: '50rem' }} stripedRows>
                    <Column field="index" header="Index"></Column>
                    {/* <Column header="Catagory" body={catagoryBodyTemplate}></Column> */}
                    <Column field="createdAt" header="Date"></Column>
                    <Column field="catagory" header="Catagory"></Column>
                    <Column field="discription" header="Discription" style={{ width: '25%' }}></Column>
                    <Column field="income" header="Income"></Column>
                    <Column field="expence" header="Expence"></Column>
                    <Column header="Action" style={{ height: '60px' }} body={actionTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

