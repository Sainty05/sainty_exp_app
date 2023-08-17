import React from 'react'
import ExpencesTable from './ExpencesTable';

export default function DailyExpences() {

    return (
        <section className="text-gray-600 min-h-screen body-font relative">
            <div className="container max-sm:px-0 sm:px-5 pt-3 mx-auto">
                <ExpencesTable />
            </div>
            <div>
            </div>
        </section>
    )
}
