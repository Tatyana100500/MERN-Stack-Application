import React, { Component, useEffect, useState, } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import api from '../api'

import styled from 'styled-components'
const Image = styled.img`
width: 200px;
height: 200px;
`
const baseURL= 'http://localhost:3001';
const currentUserId = localStorage.getItem('currentAccount')
const PeopleList = () => {
	const [people, setPeople] = useState([])
	const [isLoading, setisLoading] = useState(false)
	useEffect(() => {
		const fetchData = async () => {
		await api.getAllAccounts().then(people => {
			console.log(people)
			setPeople(people.data.data)
			setisLoading(true)
            
        }).catch(e => console.log(e))
    };
    fetchData();
	}, [currentUserId])
	const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
	/*constructor(props) {
        super(props)
        this.state = {
            people: [],
            isLoading: false,
        }
    }
	
	componentDidMount = async () => {
        this.setState({ isLoading: true })
this.setState({
                people: people.data.data,
                isLoading: false,
            })
        
	*/
	
    //return(
        //const { people, isLoading } = this.state
        //console.log('TCL: PeopleList -> render -> people', people)
		
        //let showTable = true
        //if (!people.length) {
            //showTable = false
        //}

        return (
		<div className="container">
		<div className="list-group">
      { (people.map(({ _id, name, birthdate, photo }) => {
		if (_id !== currentUserId) {
			return(
	  <a href="#"  key={_id} className="list-group-item list-group-item-action list-group-item-light mb-3 rounded border border-secondary">
		<Image className='rounded' src={`${baseURL}/${photo}`}></Image>
		<div className="text-dark" >{name}</div>
		<div className="text-dark" >{getAge(birthdate)}<span className="text-dark m-1">years</span></div>
		</a> )
	}})
	  )}
    </div>
	</div>
        )
    }
//)

export default PeopleList
