import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductForm from './ProductForm';

const AdminPanel = () => {
  const { products, deleteProduct } = useContext(ProductContext);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <ProductForm />
      <div className="admin-products">
        {products.map(product => (
          <div key={product.id} className="admin-product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link to={`/products/${product.id}/edit`} className="btn">
              Edit
            </Link>
            <button 
              onClick={() => deleteProduct(product.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;