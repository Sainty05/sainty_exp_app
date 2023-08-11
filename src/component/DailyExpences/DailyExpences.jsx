import React from 'react'
import AddExpences from './AddExpences';
import ExpencesTable from './ExpencesTable';
import PieChart from './PieChart';

export default function DailyExpences() {

    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container max-sm:px-0 sm:px-5 pt-3 mx-auto">
                    <div className="flex flex-col text-center w-full">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Manage Expences</h1>
                    </div>
                    <AddExpences />
                    <PieChart />
                    <ExpencesTable />
                </div>
            </section>
        </div>
    )
}
