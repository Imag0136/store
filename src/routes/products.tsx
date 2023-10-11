import { Button, Col, Grid, Modal, Row } from "antd";
import { type LoaderFunction } from "react-router-dom";
import {
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from "../api";
import { Filters, ProductList } from "../components";
import { Product } from "../types";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  let products: Product[] = [];

  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const category = url.searchParams.get("category");
  const sortBy = url.searchParams.get("sortBy");
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");

  if (q && category) {
    const [searchResults, categoryResults] = await Promise.all([
      searchProducts(q),
      getProductsByCategory(category),
    ]);
    products = searchResults.products.filter((p) =>
      categoryResults.products.find((cp) => cp.id === p.id)
    );
  } else if (q) {
    const data = await searchProducts(q);
    products = data.products;
  } else if (category) {
    const data = await getProductsByCategory(category);
    products = data.products;
  } else {
    const data = await getAllProducts();
    products = data.products;
  }

  if (minPrice) {
    products = products.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    products = products.filter((p) => p.price <= Number(maxPrice));
  }

  if (sortBy) {
    products.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "name-desc") {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }
      if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  }

  const allCategories = await getAllCategories();
  const params = Object.fromEntries(url.searchParams);

  return { products, allCategories, ...params };
};

export const Products: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lg } = Grid.useBreakpoint();
  return (
    <Row wrap={!lg} gutter={[14, 14]} style={{ marginTop: 16 }}>
      {lg ? (
        <Col span={6}>
          <Filters />
        </Col>
      ) : (
        <Col span={24}>
          <Button block onClick={() => setIsModalOpen(true)}>
            Filters
          </Button>
          <Modal
            title="Filters"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            width={350}
          >
            <Filters />
          </Modal>
        </Col>
      )}
      <Col flex="auto">
        <ProductList />
      </Col>
    </Row>
  );
};
