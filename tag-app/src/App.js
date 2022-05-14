import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditTag from "./components/tags/edit.component";
import TagList from "./components/tags/list.component";
import CreateTag from "./components/tags/create.component";

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          iLetPro Assesment - Sumit Sharma
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/tags/create" element={<CreateTag />} />
            <Route path="/tags/edit/:id" element={<EditTag />} />
            <Route exact path='/' element={<TagList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;