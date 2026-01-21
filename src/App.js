import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Navegación
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// UI Bootstrap (Solo lo que realmente usamos)
import { Navbar, Container, Row, Col, Dropdown } from "react-bootstrap";

// Componentes del Proyecto
import CreateProduct from "./components/create-product.component";
import EditProduct from "./components/edit-product.component";
import ProductList from "./components/product-list.component";
import ProductDashboard from "./components/ProductDashboard"; 
import Home from "./components/home";
import Login from "./components/login/LoginForm.component";
import Register from "./components/login/register/RegisterForm.component";
import Profile from "./components/myperfil.component";

// --- Lógica de Autenticación ---
const isAuthenticated = () => {
  // Verifica si existe el token en el navegador
  return localStorage.getItem("token") !== null; 
};

// Componente para rutas que requieren login
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

function App() {
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Recarga y redirige al login
  };

  return (
    <Router>
      <div className="App">
        {/* --- NAVBAR --- */}
        <header className="App-header">
          <Navbar bg="black" variant="dark" expand="lg" className="py-3 shadow">
            <Container>
              <Navbar.Brand>
                <Link to={isAuth ? "/home" : "/"} className="text-decoration-none d-flex align-items-center">
                  <img alt="Logo" src="/laplaza.gif" width="50" height="50" className="me-2" />
                  <span className="text-white fw-bold">AGRO</span>
                </Link>
              </Navbar.Brand>

              {/* Menú de Gestión (Solo visible si está logueado) */}
              {isAuth && (
                <div className="d-flex gap-3 ms-auto me-4">
                  <Link to="/home" className="btn btn-sm btn-outline-light">Home</Link>
                  <Link to="/product-list" className="btn btn-sm btn-outline-light">Inventario</Link>
                  <Link to="/dashboard" className="btn btn-sm btn-primary">Gráficos</Link>
                </div>
              )}

              {/* Botones de Acceso o Perfil */}
              <div className="d-flex align-items-center">
                {!isAuth ? (
                  <div className="d-flex gap-2">
                    <Link to="/" className="btn btn-sm btn-light">Login</Link>
                    <Link to="/signup" className="btn btn-sm btn-warning">Registro</Link>
                  </div>
                ) : (
                  <Dropdown align="end">
                    <Dropdown.Toggle as="div" className="btn-profile" style={{ cursor: 'pointer' }}>
                      <img
                        alt="User"
                        src="https://i.pinimg.com/originals/a8/77/bd/a877bd50186346533f3d389fb59d2ca1.jpg"
                        width="40" height="40" className="rounded-circle border border-warning"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile">Mi Perfil</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout} className="text-danger">
                        Cerrar Sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </Container>
          </Navbar>
        </header>

        {/* --- RUTAS --- */}
        <Container className="mt-5 pb-5">
          <Row>
            <Col md={12}>
              <Switch>
                {/* Rutas Públicas */}
                <Route exact path="/" component={Login} />
                <Route path="/signup" component={Register} />

                {/* Rutas Protegidas */}
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/create-product" component={CreateProduct} />
                <PrivateRoute path="/edit-product/:id" component={EditProduct} />
                <PrivateRoute path="/product-list" component={ProductList} />
                <PrivateRoute path="/dashboard" component={ProductDashboard} />
                
                {/* Redirección automática si no existe la ruta */}
                <Redirect to="/" />
              </Switch>
            </Col>
          </Row>
        </Container>

        {/* --- FOOTER SIMPLIFICADO --- */}
        <footer className="bg-black text-white py-4 mt-auto border-top border-secondary text-center">
          <Container>
            <p className="mb-0 small text-muted">
              &copy; 2026 Agro - Sistema de Gestión de Inventarios
            </p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;