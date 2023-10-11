import { Card, Col, Rate, Row, Typography } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { Product } from "../types";
import { AddToCart } from "./AddToCart";

const { Meta } = Card;
const { Text } = Typography;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const isInCart = cart.some((item) => item.id === product.id);

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  };

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Link to={`/${product.id}`}>
      <Card
        hoverable
        cover={
          <img alt={product.title} src={product.images[0]} style={cardImage} />
        }
      >
        <Row align="middle" gutter={[8, 16]}>
          <Col span={24}>
            <Meta title={product.title} />
          </Col>
          <Col flex="none">
            <Rate disabled allowHalf defaultValue={product.rating} />
          </Col>
          <Col flex="auto">
            <Text strong>{product.rating}</Text>
          </Col>
        </Row>
        <Row align="middle" gutter={[8, 10]}>
          <Col flex="none">
            <Text strong style={{ fontSize: "1.7em" }}>
              ${discountedPrice.toFixed(2)}
            </Text>
          </Col>
          <Col flex="auto">
            <Text delete type="secondary" style={{ fontSize: "1.1em" }}>
              ${product.price.toFixed(2)}
            </Text>
          </Col>
          <Col span={24}>
            <AddToCart
              isInCart={isInCart}
              addToCart={(event) => addToCart(event)}
              disabled={product.stock < 1}
            />
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

const cardImage: React.CSSProperties = {
  height: 200,
  objectFit: "scale-down",
};
