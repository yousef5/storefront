type ProductOrder = {
  id?: number;
  order_id: number;
  product_id: number;
  qty: number;
  product_name?: string;
  product_desc?: string;
  product_price?: number;
  product_catg?: string;
};

export default ProductOrder;
