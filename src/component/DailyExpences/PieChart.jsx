import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useGlobalContext } from "../../utils/context";
import { Dialog } from 'primereact/dialog';


export default function PieChart() {
    const { fetchExpences, expItems, incItems, Expences, date, showChart, setShowChart } = useGlobalContext()

    useEffect(() => {
        fetchExpences(date)
    }, [])

    const expData = [["Catagory", "Amount"]]
    expItems.forEach((ele) => {
        let total = 0
        for (let exp of Expences) {
            total += exp.catagory === ele.value && exp.amount
        }
        expData.push([ele.value, total])
    })

    const incData = [["Catagory", "Amount"]]
    incItems.forEach((ele) => {
        let total = 0
        for (let exp of Expences) {
            total += exp.catagory === ele.value && exp.amount
        }
        incData.push([ele.value, total])
    })

    const options = {
        title: "Expences",
    };

    const options2 = {
        title: "Income",
    };


    return (
        <Dialog header="Pie Chart" visible={showChart} onHide={() => setShowChart(false)} className="max-sm:w-11/12"> 
            <div className="d-flex max-sm:flex-col justify-center">
                <Chart
                    chartType="PieChart"
                    data={incData}
                    options={options2}
                    height="30vh"
                />
                <Chart
                    chartType="PieChart"
                    data={expData}
                    options={options}
                    height="30vh"
                />
            </div>
        </Dialog>
    );
}
