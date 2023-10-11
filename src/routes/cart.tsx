import { DeleteFilled } from "@ant-design/icons";
import { Button, InputNumber, Table, Typography } from "antd";
import { useContext } from "react";
import { Link, type LoaderFunction } from "react-router-dom";
import { getAllProducts } from "../api";
import { CartContext } from "../contexts/CartContext";
import { CartItem, Cart as CartItems } from "../types";

export const loader: LoaderFunction = async () => {
  const cart: CartItems = JSON.parse(
    window.localStorage.getItem("cart") || "[]"
  );

  if (!cart.length) {
    return null;
  }

  const { products } = await getAllProducts();

  const updatedCart = cart.map((item) => {
    const product = products.find((product) => product.id === item.id);
    return { ...product, quantity: item.quantity };
  });

  window.localStorage.setItem("cart", JSON.stringify(updatedCart));

  return null;
};

interface CartItemWithDiscount extends CartItem {
  discountedPrice: number;
}

export const Cart: React.FC = () => {
  const { cart, setCart } = useContext(CartContext);

  const cartWithDiscountPrice = cart.map((product) => {
    return {
      ...product,
      discountedPrice: product.price * (1 - product.discountPercentage / 100),
    } as CartItemWithDiscount;
  });

  const removeProduct = (id: number) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  const changeQuantity = (quantity: number, productId: number) => {
    setCart((prevCart) => {
      return prevCart.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: quantity };
        } else {
          return product;
        }
      });
    });
  };

  return (
    <Table
      style={{ margin: "20px 0" }}
      pagination={false}
      dataSource={cartWithDiscountPrice}
      columns={[
        {
          title: "Item",
          dataIndex: "thumbnail",
          key: "img",
          width: 150,
          render: (thumbnail) => {
            return <img src={thumbnail} style={{ maxWidth: 150 }} />;
          },
        },
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
          render: (title, product) => {
            return <Link to={`/${product.id}`}>{title}</Link>;
          },
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          render: (price) => {
            return (
              <Typography.Text delete type="secondary">
                ${price}
              </Typography.Text>
            );
          },
        },
        {
          title: "Discounted Price",
          dataIndex: "discountedPrice",
          key: "discountedPrice",
          render: (discountedPrice) => {
            return <span>${discountedPrice.toFixed(2)}</span>;
          },
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
          render: (quantity, product) => {
            return (
              <InputNumber
                min={1}
                max={product.stock}
                defaultValue={quantity}
                onChange={(value) => changeQuantity(value, product.id)}
              />
            );
          },
        },
        {
          title: "Subtotal",
          dataIndex: "subtotal",
          key: "subtotal",
          render: (_, product) => {
            return (
              <span>
                ${(product.discountedPrice * product.quantity).toFixed(2)}
              </span>
            );
          },
        },
        {
          title: "",
          dataIndex: "",
          key: "x",
          width: 35,
          render: (_, product) => (
            <Button
              danger
              type="primary"
              icon={<DeleteFilled />}
              onClick={() => removeProduct(product.id)}
            />
          ),
        },
      ]}
      summary={(cart) => {
        const total = cart.reduce((acc, current) => {
          return acc + current.discountedPrice * current.quantity;
        }, 0);
        return (
          <Typography.Title level={3}>
            Total: ${total.toFixed(2)}
          </Typography.Title>
        );
      }}
    />
  );
};
