import React, { useEffect } from 'react'
import { useGlobalContext } from '../../utils/context';
import { DataScroller } from 'primereact/datascroller';
import { Tag } from 'primereact/tag';
import axiosBaseURL from '../../utils/axiosBaseUrl';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';

export default function MonthlyData() {

    const navigate = useNavigate()
    const { Expences, fetchExpences, setSelectedCatagory, setAmount, setDiscription, setUpdateExpence, setId, setAmountType, date, setDate } = useGlobalContext()

    useEffect(() => {
        fetchExpences(date)
    }, [])

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

    const expenceTemplate = (expence) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-2 pl-4 mx-2 gap-4" onClick={() => updateExpence(expence._id)}>
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

    const updateExpence = (id) => {
        axiosBaseURL.post("/fetchExpence", { id: id }).then((res) => {
            setUpdateExpence(true)
            setSelectedCatagory(res.data.expence.catagory)
            setAmount(Number(res.data.expence.amount))
            setDiscription(res.data.expence.discription)
            setAmountType(res.data.expence.amountType)
            setId(res.data.expence._id)
            navigate("/addExpences")
        })
    }

    return (
        <div className='min-h-screen px-2 pt-2 container'>
            <Calendar className='w-full text-center' value={date} onChange={(e) => { setDate(e.value); fetchExpences(e.value) }} view="month" dateFormat="MM - yy" />
            <div className='p-4 flex justify-between'>
                <Tag className="mr-2" icon="pi pi-arrow-up" severity="danger"><span className="text-base">{"Expence: " + totalExpence()}</span></Tag>
                <Tag className="mr-2" icon="pi pi-arrow-down" severity="success"><span className="text-base">{"Income: " + totalIncome()}</span></Tag>
            </div>
            <DataScroller value={Expences} itemTemplate={expenceTemplate} rows={5} inline scrollHeight="450px" />
        </div>
    )
}
