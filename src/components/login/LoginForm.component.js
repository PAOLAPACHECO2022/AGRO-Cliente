import React, { Component } from "react";
import { Col, Container, Form, Button, Card } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      id: "", // Aquí guardaremos la cédula que responda el servidor
      redirect: false,
    };
  }

  // Manejador genérico para los cambios en los inputs
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userObject = { 
      email: this.state.email, 
      password: this.state.password 
    };

    axios.post("http://localhost:4000/users/login", userObject)
      .then((res) => {
        // Verificamos la respuesta 'ok' definida en nuestro backend
        if (res.data.ok) {
          // 1. Guardamos el token
          window.localStorage.setItem("token", res.data.token);
          
          // 2. Guardamos la cédula (id) para que el perfil pueda cargar los datos
          window.localStorage.setItem("cedula", res.data.id);
          
          // 3. Activamos la redirección
          this.setState({ 
            id: res.data.id, 
            redirect: true 
          });
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Correo o contraseña incorrectos. Verifique sus datos.");
      });
  };

  render() {
    // Si el login es exitoso, redireccionamos al perfil pasando la cédula en el estado
    if (this.state.redirect) {
      return (
        <Redirect 
          to={{ 
            pathname: "/profile", 
            state: { id: this.state.id } 
          }} 
        />
      );
    }

    return (
      <div className="my-5 d-flex justify-content-center">
        <Col md={5}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <Form onSubmit={this.handleSubmit}>
                <h3 className="text-center text-uppercase fw-bold mb-4 text-primary">
                  Ingreso de Usuario
                </h3>
                
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                  <Form.Control 
                    name="email" 
                    type="email" 
                    placeholder="ejemplo@correo.com"
                    onChange={this.handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Contraseña</Form.Label>
                  <Form.Control 
                    name="password" 
                    type="password" 
                    placeholder="Ingrese su clave"
                    onChange={this.handleChange} 
                    required 
                    
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold text-uppercase">
                  Entrar al Sistema
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-muted small">
                    ¿Aún no tienes una cuenta? <br />
                    <Link to="/signup" className="text-decoration-none fw-bold text-success">
                      Regístrate como Agricultor aquí
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}

// Componente principal que envuelve el formulario en un Container
export default class Login extends Component {
  render() {
    return (
      <Container>
        <LoginForm />
      </Container>
    );
  }
}