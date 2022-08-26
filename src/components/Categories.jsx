import React from 'react';

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onClickCategory = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((val, index) => {
          return (
            <li
              onClick={() => onClickCategory(index)}
              className={activeIndex === index ? 'active' : ''}>
              {val}
            </li>
          );
        })}
        {/*  */}
      </ul>
    </div>
  );
}
export default Categories;
