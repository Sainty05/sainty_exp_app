import React from 'react'
import AddExpences from './AddExpences';
import ExpencesTable from './ExpencesTable';
import PieChart from './PieChart';

export default function DailyExpences() {

    return (
        <section className="text-gray-600 min-h-screen body-font relative">
            <div className="container max-sm:px-0 sm:px-5 pt-3 mx-auto">
                {/* <AddExpences /> */}
                {/* <PieChart /> */}
                <ExpencesTable />
            </div>
            <div>
            </div>
        </section>
    )
}
