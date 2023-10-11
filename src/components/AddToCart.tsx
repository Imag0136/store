import { ArrowRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface AddToCartProps {
  isInCart: boolean;
  addToCart: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const AddToCart: React.FC<AddToCartProps> = ({
  isInCart,
  addToCart,
  disabled = false,
}) => {
  if (isInCart) {
    return (
      <Link to="/cart">
        <Button block icon={<ArrowRightOutlined />} size="large">
          In Cart
        </Button>
      </Link>
    );
  }

  return (
    <Button
      type="primary"
      block
      disabled={disabled}
      icon={<ShoppingCartOutlined />}
      size="large"
      onClick={addToCart}
    >
      Add to cart
    </Button>
  );
};
