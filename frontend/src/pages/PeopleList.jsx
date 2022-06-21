import React, { Component } from 'react'
import ReactTable from 'react-table'
import { Col, Button } from 'react-bootstrap';
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
        const { people, isLoading } = this.state
        console.log('TCL: PeopleList -> render -> people', people)

        const columns = [
            {
                Header: 'PHOTO',
                accessor: 'photo',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
        ]

        let showTable = true
        if (!people.length) {
            showTable = false
        }

        return (
            <Col xs={3}>
                {showTable && (
                    people.map(({ id, name, photo }) => <div key={id}>{name}</div>)
				)}
            </Col>
        )
    }
}

export default PeopleList
