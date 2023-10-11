import { Carousel, Col, Image, Rate, Row, Typography } from "antd";
import { useContext } from "react";
import type { LoaderFunction } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getSingleProduct } from "../api";
import { CartContext } from "../contexts/CartContext";
import { SingleProductResponse } from "../types";
import { AddToCart } from "../components";

const { Text } = Typography;

export const loader: LoaderFunction = async ({ params }) => {
  const product = await getSingleProduct(Number(params.productId));
  return { product };
};
export const SingleProduct: React.FC = () => {
  const { product } = useLoaderData() as SingleProductResponse;

  const { cart, setCart } = useContext(CartContext);

  const isInCart = cart.some((item) => item.id === product.id);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  };

  return (
    <Row gutter={[14, 14]} style={{ marginTop: 16 }}>
      <Col sm={{ span: 24 }} md={{ span: 12 }}>
        <Carousel
          style={{
            objectFit: "scale-down",
            textAlign: "center",
          }}
          draggable
          infinite={false}
        >
          {product.images.map((image) => (
            <Image
              key={product.id}
              src={image}
              alt={product.title}
              preview={false}
              style={{ height: 500 }}
            />
          ))}
        </Carousel>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 12 }}>
        <Row align="middle" gutter={[8, 8]}>
          <Col span={24}>
            <Text strong style={{ fontSize: "2em" }}>
              {product.title}
            </Text>
          </Col>
          <Col flex="none">
            <Rate disabled allowHalf defaultValue={product.rating} />
          </Col>
          <Col flex="auto">
            <Text strong>{product.rating}</Text>
          </Col>
          <Col span={24}>
            <Text strong style={{ fontSize: "1.5em" }}>
              {product.brand}
            </Text>
          </Col>
          <Col span={24}>
            <Text style={{ fontSize: "1.2em" }}>
              Description: {product.description}
            </Text>
          </Col>
          <Col flex="none">
            <Text strong style={{ fontSize: "2.5em" }}>
              ${discountedPrice.toFixed(2)}
            </Text>
          </Col>
          <Col flex="auto">
            <Text delete type="secondary" style={{ fontSize: "2em" }}>
              ${product.price.toFixed(2)}
            </Text>
          </Col>
          <Col span={24}>
            <AddToCart
              isInCart={isInCart}
              addToCart={addToCart}
              disabled={product.stock < 1}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
