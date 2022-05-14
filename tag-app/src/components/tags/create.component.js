import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateTag() {
  const navigate = useNavigate();

  const [tagname, setTagName] = useState("")
  const [validationError,setValidationError] = useState({})

  const createTag = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('tagname', tagname)
    await axios.post(`http://localhost:8000/api/tags`, formData).then(({data})=>{
      Swal.fire({icon:"success", text:data.message})
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      } else {
        Swal.fire({text:response.data.message, icon:"error"})
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Tag</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createTag}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="TagName">
                            <Form.Label>TagName</Form.Label>
                            <Form.Control type="text" value={tagname} onChange={(event)=>{
                              setTagName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Create Tag
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}