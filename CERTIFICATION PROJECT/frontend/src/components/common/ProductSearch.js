import React, { useState, Fragment } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useNavigate } from "react-router-dom";

function ProductSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const handleSearch = async (query) => {
    setIsLoading(true);

    await axios
      .get("http://localhost:8081/api/v1/products/name/" + query)
      .then((res) => {
        if (res.data.status === "success") {
          setOptions(res.data.products);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProductClick = (selected) => {
    if (selected !== undefined && selected.length === 1) {
      console.log(selected[0]._id);
      navigate("/products/" + selected[0]._id);
    }
  };
  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;
  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="async-example"
      isLoading={isLoading}
      labelKey="name"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a product..."
      onChange={(selected) => handleProductClick(selected)}
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <img
            alt={option.name}
            src={option.productImage}
            style={{
              height: "24px",
              marginRight: "10px",
              width: "24px",
              cursor: "pointer",
            }}
            onClick={(event) => handleProductClick(option._id, event)}
          />
          <span style={{ width: "200px" }}>{option.name}</span>
        </Fragment>
      )}
    />
  );
}

export default ProductSearch;
