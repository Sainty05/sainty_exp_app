import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useGlobalContext } from "../../utils/context";
import { Dialog } from 'primereact/dialog';


export default function PieChart() {
    const { fetchExpences, expItems, incItems, Expences, date, showChart, setShowChart, setDate } = useGlobalContext()

    useEffect(() => {
        setDate(new Date())
        fetchExpences(new Date())
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
        backgroundColor: 'none',
        color: "white"
    };

    const options2 = {
        title: "Income",
        backgroundColor: 'none',
        color: "white"
    };

    //     options={{
    //         chart: {
    //           title: 'Spend Uplift',
    //         },
    //         colors: ['#FB7A21'],
    //  -----> backgroundColor: 'red'
    //       }}


    return (
        // <Dialog header="Pie Chart" visible={showChart} onHide={() => setShowChart(false)} className="max-sm:w-11/12"> 
        <div className="text-black bg-gradient-to-r from-gray-600 to-white d-flex h-screen align-middle flex-col">
            <h2 className="text-center m-5">Analysis</h2>
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
        // </Dialog>
    );
}
