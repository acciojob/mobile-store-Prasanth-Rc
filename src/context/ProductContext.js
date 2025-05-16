import { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'iPhone 13',
      description: 'Latest iPhone with A15 Bionic chip',
      price: 999,
      image: 'https://example.com/iphone13.jpg'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      description: 'Powerful Android flagship',
      price: 799,
      image: 'https://example.com/s21.jpg'
    },
  ]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};