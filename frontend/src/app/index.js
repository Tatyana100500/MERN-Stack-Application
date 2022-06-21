import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NavBar } from '../components'
import { PeopleList, AccountInsert, AccountUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/people" exact element={<PeopleList/>} />
                <Route path="/account" exact element={<AccountInsert/>} />
                <Route
                    path="/account/update/:id"
                    exact
                    component={AccountUpdate}
                />
            </Routes>
        </Router>
    )
}

export default App