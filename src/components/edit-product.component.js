import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      descripcion: "",
      precio: "",
      cantidad: "",
      estado: "",
      fecha: "", // Campo añadido para capturar la fecha de la DB
      redirect: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:4000/products/edit-product/${id}`)
      .then(res => {
        // Formateamos la fecha para que el input type="date" la reconozca (AAAA-MM-DD)
        const fechaDB = res.data.fecha ? res.data.fecha.substring(0, 10) : "";
        
        this.setState({
          name: res.data.name,
          descripcion: res.data.descripcion,
          precio: res.data.precio,
          cantidad: res.data.cantidad,
          estado: res.data.estado,
          fecha: fechaDB 
        });
      })
      .catch(err => {
        console.error("Error al cargar:", err);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    
    const updatedProduct = {
      name: this.state.name,
      descripcion: this.state.descripcion,
      precio: this.state.precio,
      cantidad: this.state.cantidad,
      estado: this.state.estado,
      fecha: this.state.fecha // Enviamos la fecha actualizada o mantenida
    };

    axios.put(`http://localhost:4000/products/update-product/${id}`, updatedProduct)
      .then((res) => {
        alert("Producto actualizado con éxito");
        this.setState({ redirect: true });
      })
      .catch((error) => {
        alert("Error al actualizar");
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/product-list" />;
    }

    return (
      <Container className="my-5 d-flex justify-content-center">
        <div className="p-4 bg-white shadow rounded-4 w-75 border">
          <h3 className="text-center mb-4 text-uppercase fw-bold">Editar Producto</h3>
          
          <Form onSubmit={this.onSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nombre</Form.Label>
                  <Form.Control name="name" type="text" value={this.state.name} onChange={this.handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Fecha de Registro</Form.Label>
                  <Form.Control 
                    name="fecha" 
                    type="date" // El navegador muestra el calendario
                    value={this.state.fecha} 
                    onChange={this.handleChange} 
                    required 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Estado</Form.Label>
              <Form.Select name="estado" value={this.state.estado} onChange={this.handleChange}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Descripción</Form.Label>
              <Form.Control name="descripcion" as="textarea" rows={3} value={this.state.descripcion} onChange={this.handleChange} required />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Precio</Form.Label>
                  <Form.Control name="precio" type="number" value={this.state.precio} onChange={this.handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Cantidad</Form.Label>
                  <Form.Control name="cantidad" type="text" value={this.state.cantidad} onChange={this.handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" href="/product-list">Cancelar</Button>
              <Button variant="primary" type="submit">Guardar Cambios</Button>
            </div>
          </Form>
        </div>
      </Container>
    );
  }
}