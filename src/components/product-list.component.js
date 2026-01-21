import React, { Component } from "react";
import axios from "axios";
import { Table, Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import ProductTableRow from "./ProductTableRow";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchTerm: "",
      statusFilter: "todos"
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    axios.get("http://localhost:4000/products/")
      .then((res) => {
        // ORDENAMIENTO AVANZADO:
        // 1. Convertimos a Date para comparar cronológicamente.
        // 2. Si las fechas son iguales (mismo día), usamos el ID de MongoDB 
        //    (los IDs son incrementales por tiempo) para desempatar.
        const sortedProducts = res.data.sort((a, b) => {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);
          
          if (dateB - dateA !== 0) {
            return dateB - dateA; // Ordenar por fecha más reciente
          }
          // Si es la misma fecha, el ID de MongoDB más largo/nuevo va primero
          return b._id.localeCompare(a._id);
        });

        this.setState({ products: sortedProducts });
      })
      .catch((error) => console.log(error));
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleStatusFilter = (e) => {
    this.setState({ statusFilter: e.target.value });
  };

  renderTableData() {
    const { products, searchTerm, statusFilter } = this.state;

    return products
      .filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "todos" || product.estado === statusFilter;
        return matchesName && matchesStatus;
      })
      .map((res, i) => {
        return <ProductTableRow obj={res} key={res._id || i} refreshTable={this.fetchProducts} />;
      });
  }

  render() {
    return (
      <Container className="my-5">
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="p-4">
            <h2 className="text-center mb-4 fw-bold text-success">📦 GESTIÓN DE INVENTARIO</h2>
            
            {/* Sección de Filtros Estilizada */}
            <Row className="mb-4 g-3 bg-light p-3 rounded-3 mx-0 border">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold text-muted">🔍 Buscar por nombre</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Escriba para filtrar..." 
                    onChange={this.handleSearch}
                    className="rounded-pill border-0 shadow-sm"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold text-muted">🚦 Filtrar por Estado</Form.Label>
                  <Form.Select 
                    onChange={this.handleStatusFilter}
                    className="rounded-pill border-0 shadow-sm"
                  >
                    <option value="todos">Todos los productos</option>
                    <option value="activo">Solo Disponibles (Activos)</option>
                    <option value="inactivo">Solo Agotados (Inactivos)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Table hover responsive className="align-middle">
              <thead className="table-success">
                <tr>
                  <th className="border-0">📅 Fecha</th>
                  <th className="border-0">🍎 Nombre</th>
                  <th className="border-0">📝 Descripción</th>
                  <th className="border-0">💰 Precio</th>
                  <th className="border-0">⚖️ Cant/Kg.</th>
                  <th className="border-0">📍 Estado</th>
                  <th className="border-0 text-center">⚙️ Acciones</th>
                </tr>
              </thead>
              <tbody>{this.renderTableData()}</tbody>
            </Table>

            {this.state.products.length === 0 && (
              <div className="text-center my-5 text-muted">
                <p>No se encontraron productos en el inventario.</p>
              </div>
            )}

            <hr className="my-4" />

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button variant="success" href="/create-product" className="px-4 py-2 rounded-pill fw-bold shadow-sm">
                + Crear Nuevo Producto
              </Button>
              <Button variant="outline-primary" href="/dashboard" className="px-4 py-2 rounded-pill fw-bold">
                📊 Ver Estadísticas
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}