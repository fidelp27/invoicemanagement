import { useState, useEffect } from 'react';

const useGetItems = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.products);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  return { items, error };
};

export default useGetItems;
