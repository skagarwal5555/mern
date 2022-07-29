import { ProductCard } from "./Product-card";

export function Products(props) {
  const width = props.width;

  return (
    <>
      {props.products.map((product) => (
        <ProductCard product={product} width={width}></ProductCard>
      ))}
    </>
  );
}
