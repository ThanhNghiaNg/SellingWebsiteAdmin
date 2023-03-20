import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductList from "../components/ProductList/ProductList";
import Card from "../components/UI/Card";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/global";
import { Pagination } from "antd";

function Products(props) {
  const [query, setQuery] = useState("");
  const [onReload, setOnReload] = useState(false);
  const [products, setProducts] = useState([]);
  const { sendRequest } = useHttp();
  const [numResult, setNumResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const changePageHandler = (values) => {
    setCurrentPage(values);
  };
  const onChangeQuery = (event) => {
    setQuery(event.target.value);
  };
  const toggleReloadHandler = () => {
    setOnReload((prev) => !prev);
  };
  useEffect(() => {
    sendRequest(
      {
        url: `${serverUrl}/search-products?query=${query}&&page=${currentPage}&&pageSize=${pageSize}`,
      },
      (data) => {
        console.log(data);
        setProducts(data.data);
        setNumResult(data.numResult);
      }
    );
  }, [query, onReload, currentPage]);
  return (
    <Card>
      <h5 className="my-3">Product</h5>
      <input
        type="text"
        placeholder="Enter Search"
        className="form-control w-25"
        onChange={onChangeQuery}
      ></input>
      <ProductList products={products} onReload={toggleReloadHandler} />
      <Pagination
        defaultCurrent={1}
        total={numResult}
        pageSize={pageSize}
        onChange={changePageHandler}
        className="d-flex justify-content-end"
      />
    </Card>
  );
}

export default Products;
