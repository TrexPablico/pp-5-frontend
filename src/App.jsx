import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios"; // reserba diyan ka lang muna
import useApi from "./utility/http";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import routes from "./routes";

const App = () => {
  const api = useApi();
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quantity_in_stock, setQuantityInStock] = useState("");
  const [product_name, setProductName] = useState("");
  const [branch_id, setBranchId] = useState("");
  const [supplier_id, setSupplierId] = useState("");

  useEffect(() => {
    getInventory();
  }, []);

  async function getInventory() {
    try {
      const response = await api.get("/inventory.php");
      setInventory(response.data);
    } catch (error) {
      console.error("Oops Error!", error);
    }
  }

  const handleOrderSubmit = async () => {
    try {
      const formData = {
        quantity_to_deliver: quantity_in_stock,
        product_name,
        branch_id,
        supplier_id,
      };

      const response = await api.post("/orders.php", formData);

      getInventory();
      console.log("Order added successfully:", response.data);
    } catch (error) {
      console.error("Oops Error!:", error);
    } finally {
      setShowModal(false);
    }
  };

  function handleChangePage(path) {
    console.log("Clicked path:", path);
    if (path === "/Orders") {
      setShowModal(true);
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center">
            <h1>Inventory</h1>
            <Table striped bordered hover size="lg">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Quantity in Stock</th>
                  <th>Product Name</th>
                  <th>Branch ID</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_id}</td>
                    <td>{item.quantity_in_stock}</td>
                    <td>{item.product_name}</td>
                    <td>{item.branch_id}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="buttons">
              {routes.map((route, index) => (
                <Button
                  key={index}
                  variant="success"
                  link
                  onClick={() => handleChangePage(route.path)}
                >
                  {route.name === "orders" ? "Place Order" : route.name}
                </Button>
              ))}
            </div>
          </div>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Place Order</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              <Form.Control
                id="quantityInput"
                type="text"
                placeholder="Quantity to deliver"
                className="mb-3"
                value={quantity_in_stock}
                onChange={(e) => setQuantityInStock(e.target.value)}
              />
              <Form.Select
                id="productNameSelect"
                aria-label="Default select example"
                className="mb-3"
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
              >
                <option>Product name</option>
                {inventory.map((item, index) => (
                  <option key={index}>{item.product_name}</option>
                ))}
              </Form.Select>
              <Form.Select
                id="branchSelect"
                aria-label="Default select example"
                className="mb-3"
                value={branch_id}
                onChange={(e) => setBranchId(e.target.value)}
              >
                <option>Branch to deliver</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
              <Form.Select
                id="supplierId"
                aria-label="Default select example"
                className="mb-3"
                value={supplier_id}
                onChange={(e) => setSupplierId(e.target.value)}
              >
                <option>Supplier Id</option>
                <option value="101">101</option>
                <option value="102">102</option>
                <option value="103">103</option>
              </Form.Select>
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleOrderSubmit}>
              Confirm order{" "}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </Container>
  );
};

export default App;
