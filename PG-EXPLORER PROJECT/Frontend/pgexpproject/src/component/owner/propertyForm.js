import React, { useState } from 'react';

function PropertyForm() {
  const initialState = {
    name: '',
    description: '',
    image: null,
  };

  const [property, setProperty] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProperty({ ...property, [name]: files[0] });
    } else {
      setProperty({ ...property, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log('Property data:', property);
    setProperty(initialState); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Property Name"
        value={property.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={property.description}
        onChange={handleChange}
      ></textarea>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PropertyForm;
