import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://630a26ddf8a20183f77c99c3.mockapi.io/pizzas/` + id,
        );
        setPizza(data);
      } catch (error) {
        navigate('/');
        alert('Такой пиццы нет :(');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>'Загрузка...'</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza-img" />
      <h2>{pizza.title}</h2>
      <span>{pizza.price}</span>
    </div>
  );
};
export default FullPizza;
