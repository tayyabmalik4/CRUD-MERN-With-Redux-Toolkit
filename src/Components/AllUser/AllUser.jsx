import React, { useEffect, useState } from 'react'
import './AllUser.css'

import { getuser, deleteUser } from '../../Service/Api'
import { Link } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch, useSelector } from 'react-redux';

export default function AllUser() {
  const dispatch = useDispatch()

  const stats = useSelector((state)=>state.dashboard?.stats)
  const loading = useSelector((state)=>state.dashboard?.loading)


  useEffect(() => {
    getuser(dispatch);
  }, [])

  console.log("TOOL",stats)

  const deleteUserDetails = async (id) => {
    await deleteUser(id);
  }
  return (
    <>
    {
      loading === true?
      <CircularProgress/>
      :
      <div className="allusermain">
      <div className="headingalluser">All User</div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {
          stats?.map((user) => {
            return (

              <tbody key={user._id}>
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link className="btnedit btn" to={`/edituser/${user._id}`}>Edit</Link>
                  </td>
                  <td>
                    <button className='btndel btn' onClick={() => deleteUserDetails(user._id)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            )
          }
          )
        }
      </table>
    </div>
    }
    </>
  )
}
