import React, { Component } from "react";
import { Form, Button, Col, Row, Card, Container } from "react-bootstrap"; 
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombres: "", apellidos: "", cedula: "",
      celular: "", telfijo: "", direccion: "",
      departamento: "", municipio: "", email: "", password: "",
      id: "", redirect: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:4000/users/register";
    
    axios.post(apiUrl, this.state)
      .then((res) => {
        // Guardamos el token y la cédula para iniciar sesión automáticamente
        window.localStorage.setItem("token", "SESSION_TOKEN"); // O el token que devuelva tu API
        window.localStorage.setItem("cedula", this.state.cedula);
        
        alert("¡Registro exitoso! Bienvenido.");
        this.setState({ id: this.state.cedula, redirect: true });
      })
      .catch((error) => {
        // Lógica de alerta si el usuario ya existe
        if (error.response && error.response.data) {
          const errorMsg = error.response.data.error || "";
          
          if (errorMsg.includes("cedula")) {
            alert("❌ Error: Ya existe un usuario registrado con esta Cédula.");
          } else if (errorMsg.includes("email")) {
            alert("❌ Error: Este correo electrónico ya está en uso.");
          } else {
            alert("Hubo un error en el registro: " + errorMsg);
          }
        } else {
          alert("No se pudo conectar con el servidor.");
        }
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/profile", state: { id: this.state.id } }} />;
    }

    return (
      <Container className="mt-4 mb-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Header className="bg-success text-white text-center py-3">
                <h3 className="mb-0 fw-bold">REGISTRO DE USUARIO</h3>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={this.handleSubmit}>
                  <h5 className="text-success border-bottom pb-2 mb-3">Datos Personales</h5>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="nombres">
                        <Form.Label className="fw-bold">Nombres</Form.Label>
                        <Form.Control required placeholder="Ej: Juan" onChange={this.handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="apellidos">
                        <Form.Label className="fw-bold">Apellidos</Form.Label>
                        <Form.Control required placeholder="Ej: Pérez" onChange={this.handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="cedula">
                        <Form.Label className="fw-bold">Cédula</Form.Label>
                        <Form.Control type="number" required placeholder="Número de identificación" onChange={this.handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="celular">
                        <Form.Label className="fw-bold">Celular</Form.Label>
                        <Form.Control type="number" required placeholder="Ej: 3001234567" onChange={this.handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h5 className="text-success border-bottom pb-2 mt-3 mb-3">Ubicación</h5>
                  <Form.Group className="mb-3" controlId="direccion">
                    <Form.Label className="fw-bold">Dirección de la Finca / Hogar</Form.Label>
                    <Form.Control required onChange={this.handleChange} />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="departamento">
                        <Form.Label className="fw-bold">Departamento</Form.Label>
                        <Form.Control required onChange={this.handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="municipio">
                        <Form.Label className="fw-bold">Municipio</Form.Label>
                        <Form.Control required onChange={this.handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h5 className="text-success border-bottom pb-2 mt-3 mb-3">Seguridad de la Cuenta</h5>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                        <Form.Control type="email" required placeholder="usuario@correo.com" onChange={this.handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="fw-bold">Contraseña</Form.Label>
                        <Form.Control type="password" required placeholder="Mínimo 6 caracteres" onChange={this.handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-4">
                    <Link to="/" className="btn btn-outline-secondary px-4 me-md-2 rounded-pill">Cancelar</Link>
                    <Button variant="success" type="submit" className="px-5 fw-bold rounded-pill">Crear Cuenta Ahora</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}