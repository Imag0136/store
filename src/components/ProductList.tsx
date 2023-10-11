import { Button, List } from "antd";
import { useLoaderData } from "react-router-dom";
import { ProductCard } from ".";
import { Product } from "../types";
import { useEffect, useState } from "react";

export const ProductList: React.FC = () => {
  const { products } = useLoaderData() as { products: Product[] };

  const [displayedProducts, setDisplayedProducts] = useState(
    products.slice(0, 24)
  );

  const [hasMore, setHasMore] = useState(products.length > 24);

  useEffect(() => {
    setDisplayedProducts(products.slice(0, 24));
    setHasMore(products.length > displayedProducts.length);
  }, [products]);

  const onLoadMore = () => {
    setDisplayedProducts((prevProducts) =>
      prevProducts.concat(
        products.slice(prevProducts.length, prevProducts.length + 24)
      )
    );
  };

  const loadMore = hasMore && (
    <Button
      style={{ marginBottom: 20 }}
      block
      type="primary"
      onClick={onLoadMore}
    >
      Load more
    </Button>
  );

  return (
    <List
      grid={{ gutter: 16, xs: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
      loadMore={loadMore}
      dataSource={displayedProducts}
      renderItem={(product) => (
        <List.Item>
          <ProductCard product={product} />
        </List.Item>
      )}
    />
  );
};
