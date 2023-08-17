import React, { useState, useContext, useRef } from "react";
import axiosBaseURL from "./axiosBaseUrl";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const toast = useRef(null);
    const [userId, setUserId] = useState("")
    const [showAddUser, setShowAddUser] = useState(false);
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [users, setUsers] = useState([])
    const [userData, setUserData] = useState(null)
    const [showAddMovie, setShowAddMovie] = useState(false);
    const [showUpdateMovie, setShowUpdateMovie] = useState(false);
    const [movieData, setMovieData] = useState(null)
    const [movies, setMovies] = useState([])
    const [sessionActive, setSessionActive] = useState(false)
    const [Expences, setExpences] = useState([])
    const [selectedCatagory, setSelectedCatagory] = useState("")
    const [amount, setAmount] = useState("")
    const [discription, setDiscription] = useState("")
    const [amountType, setAmountType] = useState("Expence")
    const [updateExpence, setUpdateExpence] = useState(false)
    const [id, setId] = useState(null)
    const [showChart, setShowChart] = useState(false)
    const [date, setDate] = useState(new Date())
    const [expItems, setExpItems] = useState([])
    const [incItems, setIncItems] = useState([])
    const [addExpenceForm, setAddExpenceForm] = useState(false)

    //fetch users
    const fetchUsers = () => {
        axiosBaseURL.get("/users").then((res) => {
            let data = res.data
            let index = 1
            data.forEach(element => {
                element.about = element.about === "" ? "N/A" : element.about
                element.index = index
                index++
            });
            setUsers(data)
        }).catch((err) => {
            toast.current.show({ severity: 'error', summary: 'Unsuccessful', detail: err.message, life: 3000 });
        })
    }

    //fetch movies
    const fetchMovies = () => {
        axiosBaseURL.get("/movies").then((res) => {
            let data = res.data
            let index = 1
            data.forEach(element => {
                element.index = index
                index++
            });
            setMovies(data)
        }).catch((err) => {
            toast.current.show({ severity: 'error', summary: 'Unsuccessful', detail: err.message, life: 3000 });
        })
    }

    //fetch Expences
    const fetchExpences = (date) => {
        const userId = JSON.parse(localStorage.getItem("session")).sessionUserId
        // console.log(userId)
        const dt = {
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            userId: userId
        }
        axiosBaseURL.post('/Expences', dt).then((res) => {
            // console.log(res)
            let currData = res.data.currentExpences
            let prevData = res.data.previousExpences
            let index = 1

            //previous balance
            let prevInc = 0
            let prevExp = 0
            prevData.forEach((ele) => {
                prevInc += ele.amountType === "Income" && ele.amount
                prevExp += ele.amountType === "Expence" && ele.amount
            })

            const preAmount = prevInc - prevExp

            preAmount !== 0 && currData.unshift({
                amount: Math.abs(preAmount),
                amountType: preAmount < 0 ? "Expence" : "Income",
                createdAt: new Date(dt.year, dt.month - 1, 1),
                catagory: preAmount < 0 ? "Prev Expence" : "Prev Income",
                discription: "Previous Balance"
            })

            currData.forEach(element => {
                element.discription = element.discription === "" ? "N/A" : element.discription
                element.createdAt = new Date(element.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })
                element.index = index
                index++
                element.income = element.amountType === "Income" ? element.amount : "-"
                element.expence = element.amountType === "Expence" ? element.amount : "-"
            });
            setExpences(currData.reverse())
            const uniqueExpCatagories = new Set();
            const uniqueIncCatagories = new Set();
            currData.forEach(obj => {
                if (obj.catagory !== "Prev Expence" && obj.catagory !== "Prev Income") {
                    if (obj.amountType === "Expence") {
                        uniqueExpCatagories.add(obj.catagory);
                    } else {
                        uniqueIncCatagories.add(obj.catagory);
                    }
                }
            });
            let expArr = Array.from(uniqueExpCatagories)
            let incArr = Array.from(uniqueIncCatagories)
            let fixExpCatagories = ['Food & Dining', 'Rent', 'Mobile Bill', 'Petrol']
            let fixIncCatagories = ['Salary', 'Investment', 'Loan', 'Bonus']
            let newExpCatagories = expArr.filter(x => !fixExpCatagories.includes(x));
            let newIncCatagories = incArr.filter(x => !fixIncCatagories.includes(x));
            let expCatagories = fixExpCatagories.concat(newExpCatagories)
            let incCatagories = fixIncCatagories.concat(newIncCatagories)
            expCatagories.push("+ Add New Catagoty")
            incCatagories.push("+ Add New Catagoty")
            let expItems = []
            expCatagories.forEach((ele) => {
                expItems.push({ label: ele, value: ele },)
            })
            let incItems = []
            incCatagories.forEach((ele) => {
                incItems.push({ label: ele, value: ele },)
            })
            setExpItems(expItems)
            setIncItems(incItems)
        })
    }

    return (
        <AppContext.Provider
            value={{
                showAddUser, setShowAddUser, fetchUsers, users, setUsers, toast, showUpdateUser, setShowUpdateUser, userData, setUserData, setShowAddMovie, fetchMovies, movies, setShowUpdateMovie, setMovieData, showAddMovie, showUpdateMovie, movieData, setMovies, sessionActive, setSessionActive, fetchExpences, Expences, setExpences, selectedCatagory, setSelectedCatagory, amount, setAmount, discription, setDiscription, updateExpence, setUpdateExpence, id, setId, amountType, setAmountType, showChart, setShowChart, date, setDate, incItems, setIncItems, expItems, setExpItems, userId, setUserId, addExpenceForm, setAddExpenceForm
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
export const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext, AppProvider };