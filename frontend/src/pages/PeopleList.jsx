import React, { Component } from 'react'
import ReactTable from 'react-table'
import { Navbar, Nav, Button } from 'react-bootstrap';
import api from '../api'

import styled from 'styled-components'

//import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class PeopleList extends Component {
	constructor(props) {
        super(props)
        this.state = {
            people: [],
            columns: [],
            isLoading: false,
        }
    }

	componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllAccounts().then(people => {
			console.log(people)
            this.setState({
                people: people.data.data,
                isLoading: false,
            })
        }).catch(e => console.log(e))
    }
	
    render() {
		const clickAccount = () => {
			console.log('!!!!!!!!')
		}
        const { people, isLoading } = this.state
        console.log('TCL: PeopleList -> render -> people', people)

        let showTable = true
        if (!people.length) {
            showTable = false
        }

        return (
		<div className="container">
		<Nav.Item
      onClick={clickAccount}
      className="nav-item mb-3 text-left flex-grow-1"
    >
      {showTable && (people.map(({ _id, name, photo }) => 
	  <Nav.Link key={_id} className="nav-link bg-light mb-3">
		<img src={photo}></img>
		<div className="text-dark" >{name}</div>
		</Nav.Link> )
				)}
    </Nav.Item>
	</div>
        )
    }
}

export default PeopleList
