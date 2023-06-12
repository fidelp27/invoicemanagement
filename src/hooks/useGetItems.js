import { useState, useEffect } from 'react';

const useGetItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.products);
      });
  }, []);
  return items;
};

export default useGetItems;
