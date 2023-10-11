import { Button, Col, Input, Row } from "antd";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { SorterFilter } from "./SorterFilter";
import { useState } from "react";

const { Search } = Input;

export type SortBy =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "rating";

export interface filterOptions {
  q?: string;
  sortBy?: SortBy;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface searchParams {
  q: string;
  category: string;
  sortBy: SortBy;
  minPrice: string;
  maxPrice: string;
}

export const Filters: React.FC = () => {
  const { q, category, sortBy, minPrice, maxPrice } =
    useLoaderData() as searchParams;
  const [filterOptions, setFilterOptions] = useState<filterOptions>({
    q,
    category,
    sortBy,
    minPrice: Number(minPrice),
    maxPrice: Number(maxPrice),
  });
  const submit = useSubmit();

  const updateFilter = (key: keyof filterOptions, value: string | number) => {
    setFilterOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div style={{ position: "sticky", top: 80 }}>
      <Form>
        <Row gutter={[0, 14]}>
          <Col span={24}>
            <Search
              defaultValue={q}
              placeholder="Search"
              onChange={(event) => updateFilter("q", event.target.value)}
              onSearch={(value) => submit(`q=${value}`)}
            />
          </Col>
          <Col span={24}>
            <SorterFilter updateFilter={updateFilter} />
          </Col>
          <Col span={24}>
            <CategoryFilter updateFilter={updateFilter} />
          </Col>
          <Col span={24}>
            <PriceFilter updateFilter={updateFilter} />
          </Col>
          <Button htmlType="submit" type="primary" block>
            Apply Filters
          </Button>
        </Row>
        <input type="hidden" name="q" value={filterOptions.q} />
        <input type="hidden" name="sortBy" value={filterOptions.sortBy} />
        <input type="hidden" name="category" value={filterOptions.category} />
        <input type="hidden" name="minPrice" value={filterOptions.minPrice} />
        <input type="hidden" name="maxPrice" value={filterOptions.maxPrice} />
      </Form>
    </div>
  );
};
