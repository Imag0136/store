import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Layout } from "antd";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";

export const Header: React.FC = () => {
  const { cart } = useContext(CartContext);

  return (
    <Layout.Header style={headerStyle}>
      <Link to={"/"} style={logoStyle}>
        E-Store
      </Link>
      <Link to={"/cart"}>
        <Badge count={cart.length}>
          <Button type="primary" icon={<ShoppingCartOutlined />} size="large">
            Cart
          </Button>
        </Badge>
      </Link>
    </Layout.Header>
  );
};

const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: "2.2rem",
};
