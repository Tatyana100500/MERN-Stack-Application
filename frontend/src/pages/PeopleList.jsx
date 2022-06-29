import React, { useEffect, useState, } from 'react'
import api from '../api'

import styled from 'styled-components'
const Image = styled.img`
  width: 200px;
  height: 200px;
`
const baseURL= 'http://localhost:3001';

const PeopleList = () => {
  const [people, setPeople] = useState([])
  //const [isLoading, setisLoading] = useState(false)
  const currentUserId = localStorage.getItem('currentAccount')
  useEffect(() => {
	const fetchData = async () => {
	  await api.getAllAccounts().then(people => {
		setPeople(people.data.data) 
      }).catch(e => console.log(e))
    };
    fetchData();
  }, [currentUserId])
  const getAge = (birthDate) => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
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
		      </a>
			)
	      }}))
		}
        </div>
	  </div>
    )
}
export default PeopleList
