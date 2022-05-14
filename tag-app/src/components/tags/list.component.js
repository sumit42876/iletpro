import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function List() {

    const [tags, setTags] = useState([])

    useEffect(()=>{
        fetchTags() 
    },[])

    const fetchTags = async () => {
        await axios.get(`http://localhost:8000/api/tags`).then(({data})=>{
            setTags(data)
        })
    }

    const deleteTag = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://localhost:8000/api/tags/${id}`).then(({data})=>{
            Swal.fire({icon:"success", text:data.message})
            fetchTags()
          }).catch(({response:{data}})=>{
            Swal.fire({text:data.message, icon:"error"})
          })
    }

    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/tags/create"}>
                    Create Tag
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Tag Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tags.length > 0 && (
                                        tags.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.tagname}</td>
                                                <td>
                                                    <Link to={`/tags/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit Tag
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteTag(row.id)}>
                                                        Delete Tag
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}