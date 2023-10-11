import { Col, Row, Select, Typography } from "antd";
import { useLoaderData } from "react-router-dom";
import { filterOptions } from ".";

interface CategoryFilterProp {
  updateFilter: (key: keyof filterOptions, value: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProp> = ({
  updateFilter,
}) => {
  const { allCategories, category } = useLoaderData() as {
    allCategories: string[];
    category?: string;
  };

  const selectOptions = allCategories.map((category) => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1),
  }));

  return (
    <Row align="middle" gutter={14}>
      <Col flex="none">
        <Typography.Text style={{ fontSize: "1rem" }}>Category</Typography.Text>
      </Col>
      <Col flex="auto">
        <Select
          defaultValue={category}
          style={{ width: "100%" }}
          allowClear
          options={selectOptions}
          onClear={() => updateFilter("category", "")}
          onChange={(value) => updateFilter("category", value)}
        />
      </Col>
    </Row>
  );
};
