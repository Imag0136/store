import { Col, Row, Select, Typography } from "antd";
import { SortBy, filterOptions } from ".";
import { useLoaderData } from "react-router-dom";

interface SorterFilterProp {
  updateFilter: (key: keyof filterOptions, value: SortBy) => void;
}

export const SorterFilter: React.FC<SorterFilterProp> = ({ updateFilter }) => {
  const { sortBy } = useLoaderData() as { sortBy: SortBy };
  const handleSelectChange = (value: SortBy) => {
    updateFilter("sortBy", value);
  };
  return (
    <Row align="middle" gutter={14}>
      <Col flex="none">
        <Typography.Text style={{ fontSize: "1rem" }}>Sort By</Typography.Text>
      </Col>
      <Col flex="auto">
        <Select
          style={{ width: "100%" }}
          defaultValue={sortBy || "name-asc"}
          options={[
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
            { value: "price-asc", label: "Price (Lowest)" },
            { value: "price-desc", label: "Price (Highest)" },
            { value: "rating", label: "Rating" },
          ]}
          onChange={handleSelectChange}
        />
      </Col>
    </Row>
  );
};
