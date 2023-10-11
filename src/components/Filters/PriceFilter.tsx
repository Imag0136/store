import { Col, InputNumber, Row, Typography } from "antd";
import { useState } from "react";
import { filterOptions } from ".";
import { useLoaderData } from "react-router-dom";

const { Text } = Typography;

interface PriceFilterProp {
  updateFilter: (key: keyof filterOptions, value: number) => void;
}

interface Price {
  minPrice: number;
  maxPrice?: number;
}

export const PriceFilter: React.FC<PriceFilterProp> = ({ updateFilter }) => {
  const { minPrice, maxPrice } = useLoaderData() as {
    minPrice: string;
    maxPrice: string;
  };
  const [priceRange, setPriceRange] = useState<Price>({
    minPrice: 0,
  });

  const handleMinPriceChange = (minPrice: number | null) => {
    if (minPrice) {
      setPriceRange({
        ...priceRange,
        minPrice,
      });
      updateFilter("minPrice", minPrice);
    }
  };

  const handleMaxPriceChange = (maxPrice: number | null) => {
    if (maxPrice) {
      setPriceRange({
        ...priceRange,
        maxPrice,
      });
      updateFilter("maxPrice", maxPrice);
    }
  };

  return (
    <>
      <Text style={{ fontSize: "1rem" }}>Price</Text>
      <Row align="middle" gutter={[8, 0]}>
        <Col span={12}>
          <Text style={{ fontSize: "0.9em" }}>from</Text>
          <InputNumber
            style={{ width: "100%" }}
            defaultValue={Number(minPrice) || 0}
            min={0}
            max={priceRange.maxPrice ? priceRange.maxPrice + 1 : Infinity}
            value={priceRange.minPrice}
            onChange={handleMinPriceChange}
          />
        </Col>
        <Col span={12}>
          <Text style={{ fontSize: "0.9em" }}>to</Text>
          <InputNumber
            style={{ width: "100%" }}
            defaultValue={Number(maxPrice) || undefined}
            min={priceRange.minPrice - 1}
            value={priceRange.maxPrice}
            onChange={handleMaxPriceChange}
          />
        </Col>
      </Row>
    </>
  );
};
