import React, { Component } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Container, Row, Col, Card, Table, Badge, Spinner } from "react-bootstrap";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default class ProductDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/products/")
      .then((res) => {
        this.setState({ products: res.data, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { products, loading } = this.state;

    if (loading) {
      return (
        <Container className="text-center my-5 p-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-3">Cargando estadísticas de inventario...</p>
        </Container>
      );
    }

    // Lógica 1: Conteo por Estado
    const activos = products.filter(p => p.estado === "activo").length;
    const inactivos = products.filter(p => p.estado === "inactivo").length;

    const barData = {
      labels: ["Disponibles (Activos)", "Agotados (Inactivos)"],
      datasets: [{
        label: "Cantidad de Productos",
        data: [activos, inactivos],
        backgroundColor: ["#28a745", "#dc3545"],
        borderRadius: 8,
      }]
    };

    // Lógica 2: Valor de Inventario (Top 5)
    const pieData = {
      labels: products.slice(0, 5).map(p => p.name),
      datasets: [{
        data: products.slice(0, 5).map(p => p.precio * parseInt(p.cantidad || 0)),
        backgroundColor: ["#2ecc71", "#3498db", "#f1c40f", "#e67e22", "#9b59b6"],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    };

    return (
      <Container className="my-5">
        <div className="mb-4">
          <h2 className="fw-bold text-dark">📊 Panel de Estadísticas</h2>
          <p className="text-muted">Resumen visual de tus existencias y valoración de inventario.</p>
        </div>
        
        <Row className="mb-4">
          <Col lg={7} className="mb-4 mb-lg-0">
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <Card.Body className="p-4">
                <Card.Title className="fw-bold mb-4 text-success">📦 Disponibilidad de Productos</Card.Title>
                <div style={{ height: '300px' }}>
                  <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={5}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <Card.Body className="p-4 text-center">
                <Card.Title className="fw-bold mb-4 text-success">💰 Valorización (Top 5)</Card.Title>
                <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
                  <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body className="p-4">
            <Card.Title className="fw-bold mb-4 text-success">📋 Detalle de Inversión por Producto</Card.Title>
            <Table hover responsive className="align-middle">
              <thead className="table-light">
                <tr>
                  <th className="border-0">Producto</th>
                  <th className="border-0">Precio Unitario</th>
                  <th className="border-0">Estado</th>
                  <th className="border-0 text-end">Inversión Estimada</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i}>
                    <td className="fw-bold">{p.name}</td>
                    <td>${Number(p.precio).toLocaleString()}</td>
                    <td>
                      <Badge bg={p.estado === "activo" ? "success" : "danger"} pill>
                        {p.estado.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="text-end fw-bold text-primary">
                      ${(p.precio * parseInt(p.cantidad || 0)).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {products.length === 0 && (
              <div className="text-center py-4 text-muted">No hay productos registrados para mostrar.</div>
            )}
          </Card.Body>
        </Card>
      </Container>
    );
  }
}