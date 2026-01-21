import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    // Inicializamos fecha con el día actual para que el input no esté vacío
    const today = new Date().toISOString().substring(0, 10);

    this.state = {
      name: "",
      descripcion: "",
      precio: "",
      cantidad: "",
      estado: "activo", // Valor inicial por defecto
      fecha: today,     // Valor inicial (hoy)
      redirect: false
    };
  }

  // Manejador genérico para todos los inputs
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const productObject = {
      name: this.state.name,
      descripcion: this.state.descripcion,
      precio: this.state.precio,
      cantidad: this.state.cantidad,
      estado: this.state.estado,
      fecha: this.state.fecha,
    };

    axios.post("http://localhost:4000/products/create-product", productObject)
      .then((res) => {
        alert("¡Producto creado con éxito!");
        this.setState({ redirect: true });
      })
      .catch((error) => {
        console.error(error);
        alert("Error al guardar el producto. Verifique los campos obligatorios.");
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/product-list" />;
    }

    return (
      <Container className="my-5 d-flex justify-content-center">
        <div className="p-4 bg-light shadow rounded-4 w-75">
          <div className="d-flex align-items-center mb-4">
            <img
              alt="icon"
              src="https://cdn-icons-png.flaticon.com/512/2622/2622693.png"
              width="40" height="40"
              className="me-2"
            />
            <h3 className="mb-0">CREAR NUEVO PRODUCTO</h3>
          </div>

          <Form onSubmit={this.onSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nombre del Producto *</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Ej: Tomate Chonto"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Fecha de Ingreso *</Form.Label>
                  <Form.Control
                    name="fecha"
                    type="date"
                    value={this.state.fecha}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Estado Inicial</Form.Label>
              <Form.Select 
                name="estado" 
                value={this.state.estado} 
                onChange={this.handleChange}
              >
                <option value="activo">Activo (Disponible para venta)</option>
                <option value="inactivo">Inactivo (Borrador / Agotado)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Descripción Detallada *</Form.Label>
              <Form.Control
                name="descripcion"
                as="textarea"
                rows={3}
                placeholder="Calidad, tamaño, disponibilidad..."
                value={this.state.descripcion}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Precio ($) *</Form.Label>
                  <Form.Control
                    name="precio"
                    type="number"
                    placeholder="0.00"
                    value={this.state.precio}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Cantidad en Kilogramos</Form.Label>
                  <Form.Control
                    name="cantidad"
                    type="text"
                    placeholder="Ej: 50 Kg "
                    value={this.state.cantidad}
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-3 mt-4">
              <Button variant="success" type="submit" className="px-4 shadow-sm">
                Guardar Producto
              </Button>
              <Button variant="outline-secondary" href="/product-list">
                Cancelar
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    );
  }
}