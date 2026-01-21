import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Badge } from "react-bootstrap";

export default class ProductTableRow extends Component {
  // Se eliminó el constructor porque no era necesario para la lógica actual

  deleteProduct = () => {
    if (window.confirm(`¿Está seguro de eliminar el producto: ${this.props.obj.name}?`)) {
      axios
        .delete("http://localhost:4000/products/delete-product/" + this.props.obj._id)
        .then((res) => {
          console.log("Product successfully deleted!");
          // Esta función viene del padre (ProductList) para recargar los datos
          this.props.refreshTable(); 
        })
        .catch((error) => {
          console.log("Error al borrar:", error);
          alert("No se pudo eliminar el producto.");
        });
    }
  };

  render() {
    // Formateo de fecha para que sea legible
    const fechaObj = new Date(this.props.obj.fecha);
    const fechaFormateada = fechaObj.toLocaleDateString() + " " + fechaObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <tr>
        <td className="small text-muted">{fechaFormateada}</td>
        <td className="fw-bold">{this.props.obj.name}</td>
        <td>{this.props.obj.descripcion}</td>
        <td>
          <span className="text-success fw-bold">
            ${new Intl.NumberFormat().format(this.props.obj.precio)}
          </span>
        </td>
        <td>{this.props.obj.cantidad}</td>
        <td>
          <Badge bg={this.props.obj.estado === "activo" ? "success" : "danger"}>
            {this.props.obj.estado.toUpperCase()}
          </Badge>
        </td>
        <td>
          <div className="d-flex flex-column gap-1">
            <Link 
              className="btn btn-primary btn-sm" 
              to={"/edit-product/" + this.props.obj._id}
            >
              Editar
            </Link>
            <Button 
              onClick={this.deleteProduct} 
              size="sm" 
              variant="outline-danger"
            >
              Borrar
            </Button>
          </div>
        </td>
      </tr>
    );
  }
}