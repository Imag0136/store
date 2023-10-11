import axios from "axios";
import { Product, ProductsResponse } from "../types";

const productsApi = axios.create({
  baseURL: "https://dummyjson.com/products",
});

export const getAllProducts = async (
  limit: number = 0,
  skip?: number,
  select?: (keyof Product)[]
): Promise<ProductsResponse> => {
  const { data } = await productsApi.get("/", {
    params: {
      limit,
      skip,
      select: select?.join(","),
    },
  });

  return data;
};

export const getSingleProduct = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get(`/${id}`);
  return data;
};

export const getProductsByCategory = async (
  category: string
): Promise<ProductsResponse> => {
  const { data } = await productsApi.get(`/category/${category}`);
  return data;
};

export const getAllCategories = async (): Promise<string[]> => {
  const { data } = await productsApi.get("/categories");
  return data;
};

export const searchProducts = async (
  q: string,
  limit: number = 0,
  skip?: number,
  select?: (keyof Product)[]
): Promise<ProductsResponse> => {
  const { data } = await productsApi.get("/search", {
    params: {
      q,
      limit,
      skip,
      select: select?.join(","),
    },
  });

  return data;
};

interface PostCart {
  userId: number;
  products: [
    {
      id: number;
      quantity: number;
    }
  ];
}

export const postCart = async (data: PostCart) => {
  try {
    const response = await axios.post("https://dummyjson.com/carts/add", data);
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
