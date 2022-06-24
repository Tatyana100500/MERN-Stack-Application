import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import { NavBar } from '../components'
import { PeopleList, AccountInsert, AccountUpdate, Login } from '../pages'
import store from '../store.js';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
		<Provider store={store}>
        <Router>
            <NavBar />
            <Routes>
                <Route path="/people" exact element={<PeopleList/>} />
				<Route path="/login" exact element={<Login/>} />
				<Route path="/account/:id" exact element={<Login/>} />
                <Route path="/" exact element={<AccountInsert/>} />
                <Route path="/account/update/:id" exact element={<AccountUpdate/>}
                />
            </Routes>
        </Router>
		</Provider>
    )
}

export default App