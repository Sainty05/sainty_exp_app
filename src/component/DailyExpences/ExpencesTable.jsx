import React, { useEffect } from 'react'
import { useGlobalContext } from '../../utils/context';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axiosBaseURL from '../../utils/axiosBaseUrl';
import { Tag } from 'primereact/tag';
import { DataScroller } from 'primereact/datascroller';
import { useNavigate } from "react-router-dom";
import { WhatsappShareButton } from 'react-share';


export default function ExpencesTable() {
    const navigate = useNavigate()
    const { toast, Expences, fetchExpences, setSelectedCatagory, setAmount, setDiscription, setUpdateExpence, setId, setAmountType, setShowChart, date, setDate } = useGlobalContext()

    useEffect(() => {
        setDate(new Date())
        fetchExpences(new Date())
    }, [])

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

    const shareUrl = `
    <meta property="og:title" content="How to change the address bar color in Chrome, Firefox, Opera, Safari" />
    <meta property="og:description" content="How to change the address bar color in Chrome, Firefox, Opera, Safari" />
    <meta property="og:url" content="http://webdevelopmentscripts.com/64-how-to-change-the-address-bar-color-in-chrome-firefox-opera-safari" />
    <meta property="og:image" content="http://webdevelopmentscripts.com/post-images/685b-change-browser-address-bar-color-chrome-android.jpeg" />`


    // const shareUrl = `whatsapp://send?text=${encodeURIComponent(
    //     'Check out this card!'
    // )}&amp;media=${encodeURIComponent(imageUrl)}`;

    return (
        <div>
            <ConfirmDialog />
            <Toast ref={toast} />
            <WhatsappShareButton imageUrl={"http://webdevelopmentscripts.com/post-images/685b-change-browser-address-bar-color-chrome-android.jpeg"}>
                Share on WhatsApp
            </WhatsappShareButton>
            <div className='mt-3 px-0 container'>
                <h4 className='text-white text-center'>Balance: {balance()}</h4>
                <div className='p-4 flex justify-between'>
                    <Tag className="mr-2" icon="pi pi-arrow-up" severity="danger"><span className="text-base">{"Expence: " + totalExpence()}</span></Tag>
                    <Tag className="mr-2" icon="pi pi-arrow-down" severity="success"><span className="text-base">{"Income: " + totalIncome()}</span></Tag>
                </div>
                <div className=''>
                    <DataScroller value={Expences} itemTemplate={expenceTemplate} rows={5} inline scrollHeight="450px" />
                </div>
            </div>
        </div>
    )
}

