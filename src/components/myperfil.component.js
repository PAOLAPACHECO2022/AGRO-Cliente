import React, { Component } from "react";
import { Form, Col, Row, Button, Container, Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      user: {
        nombres: "",
        apellidos: "",
        cedula: "",
        celular: "",
        telfijo: "",
        direccion: "",
        departamento: "",
        municipio: "",
        email: ""
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      user: { ...prevState.user, [name]: value },
    }));
  };

  componentDidMount() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario = () => {
    const token = window.localStorage.getItem("token");
    const cedulaGuardada = window.localStorage.getItem("cedula");

    if (cedulaGuardada) {
      axios
        .get(`http://localhost:4000/users/${cedulaGuardada}`, {
          headers: { "auth-token": token },
        })
        .then((res) => {
          // Limpiamos el password del estado para que no se vea el hash si el backend lo envía
          const userData = res.data;
          userData.password = ""; 
          this.setState({ user: userData });
        })
        .catch((error) => {
          console.error("Error al traer datos registrados:", error);
        });
    }
  };

  handleToggleEdit = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  handleActualizar = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const cedula = this.state.user.cedula;

    // Creamos una copia para enviar
    const datosEnviar = { ...this.state.user };
    
    // Si la contraseña está vacía, la eliminamos del objeto para no sobreescribir con vacío
    if (!datosEnviar.password) {
      delete datosEnviar.password;
    }

    axios
      .put(`http://localhost:4000/users/update/${cedula}`, datosEnviar, {
        headers: { "auth-token": token },
      })
      .then(() => {
        alert("Datos y/o contraseña actualizados correctamente");
        this.setState({ disabled: true });
        this.cargarDatosUsuario();
      })
      .catch((err) => alert("Error al actualizar datos"));
  };

  render() {
    const { user, disabled } = this.state;

    return (
      <Container className="my-5">
        <div className="p-4 bg-white rounded shadow-sm border">
          <h2 className="text-center font-weight-bold h4 text-success mb-4 text-uppercase">Mi Perfil Registrado</h2>
          
          <Form onSubmit={this.handleActualizar}>
            <fieldset disabled={disabled}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Nombres</Form.Label>
                    <Form.Control name="nombres" value={user.nombres} onChange={this.handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Apellidos</Form.Label>
                    <Form.Control name="apellidos" value={user.apellidos} onChange={this.handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Cédula (ID)</Form.Label>
                    <Form.Control name="cedula" value={user.cedula} readOnly className="bg-light" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Celular</Form.Label>
                    <Form.Control name="celular" value={user.celular} onChange={this.handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                    <Form.Control name="email" value={user.email} onChange={this.handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Municipio</Form.Label>
                    <Form.Control name="municipio" value={user.municipio} onChange={this.handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Departamento</Form.Label>
                    <Form.Control name="departamento" value={user.departamento} onChange={this.handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              
            </fieldset>

            <div className="d-flex gap-2 mt-3">
              <Button variant="success" onClick={this.handleToggleEdit}>
                {disabled ? "Editar datos" : "Cancelar Edición"}
              </Button>
              {!disabled && (
                <Button variant="primary" type="submit">Guardar Cambios</Button>
              )}
            </div>
            <Link to="/" className="btn btn-secondary mt-3">Regresar Inicio</Link>
          </Form>
        </div>

        <div className="mt-5 p-4 bg-white rounded shadow-sm border text-center">
          <h3 className="h5 text-dark mb-4 text-uppercase">Señor Usuario, gestione sus productos aquí</h3>
          <div className="d-grid gap-3 col-md-6 mx-auto">
            <Link to="/create-product" className="btn btn-success btn-lg shadow-sm">Crear Producto</Link>
            <Link to="/product-list" className="btn btn-success btn-lg shadow-sm">Listar Productos</Link>
          </div>

          <Accordion className="mt-5 text-start">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="fw-bold">INFORMACIÓN DE FRUTAS</Accordion.Header>
              <Accordion.Body>
                <Card.Img variant="top" src="https://www.spanish.cl/learn/fruit-in-spanish-frutas.jpg" className="mb-3 rounded w-50 mx-auto d-block" />
                <p className="text-muted">Información nutricional y de cosecha para frutas según su registro.</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="fw-bold">INFORMACIÓN DE VERDURAS</Accordion.Header>
              <Accordion.Body>
                <Card.Img variant="top" src="https://www.spanish.cl/learn/vegetables-in-spanish-verduras.jpg" className="mb-3 rounded w-50 mx-auto d-block" />
                <p className="text-muted">Guía de manejo de hortalizas y beneficios antioxidantes.</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    );
  }
}