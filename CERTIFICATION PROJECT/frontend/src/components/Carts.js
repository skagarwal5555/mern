import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";

export function Cart() {
  let [products, setProducts] = useState([]);
  let [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetData() {
      await loadProductsFromCart();
      calculateGrandTotal();
    }
    fetData();
  }, []);
  const loadProductsFromCart = () => {
    let p = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(p);
  };
  const calculateGrandTotal = () => {
    let t = 0;
    products.forEach((p) => {
      t += p.cost;
    });
    setTotal(t);
  };
  const checkout = function () {
    navigate("/checkout");
  };

  return (
    <div className="w-75">
      <Row>
        <Col>
          <h2>Cart</h2>
        </Col>
      </Row>
      {products.map((p) => (
        <>
          <Row className="d-flex justify-content-end">
            <Col md={4}>
              <div>
                <div>
                  <span>{p.name}</span>
                </div>
                <div>
                  <span>Price ${p.cost}</span>
                </div>
                <div>
                  <span>Discount {p.discount_price}</span>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div>${p.cost}</div>
            </Col>
          </Row>
          <hr />
        </>
      ))}
      <Row className="d-flex ">
        <Col></Col>
        <Col>
          <Button variant="light" type="button" disabled>
            Grand Total ${total}
          </Button>
          <br />
          <Button variant="primary" type="button" onClick={checkout}>
            Checkout
          </Button>
        </Col>
      </Row>
    </div>
  );
}
