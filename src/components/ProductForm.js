// components/ProductForm.js
import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const ProductForm = () => {
  const { id } = useParams();
  const { products, addProduct, updateProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  
  const isEditing = !!id;
  const productToEdit = isEditing ? products.find(p => p.id === parseInt(id)) : null;
  
  const [formData, setFormData] = useState({
    name: productToEdit?.name || '',
    description: productToEdit?.description || '',
    price: productToEdit?.price || '',
    image: productToEdit?.image || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(parseInt(id), formData);
      navigate('/admin');
    } else {
      addProduct(formData);
      setFormData({
        name: '',
        description: '',
        price: '',
        image: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {isEditing ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;