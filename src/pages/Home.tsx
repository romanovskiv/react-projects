import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortItems, SortItemsList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const { items, status } = useSelector((state: RootState) => state.pizzas);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );
  const sortType = sort.sortProperty;

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    dispatch(fetchPizzas({ categoryId, sortType, currentPage }));
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortItems.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          //@ts-ignore
          sort: sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(8)].map((_, id) => <Skeleton key={id} />);
  const pizzasArr = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">?????? ??????????</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            ?????????????????? ???????????? <span>????</span>
          </h2>
          <p>?? ??????????????????, ?????????? ???????????? ???? ??????????????. ???????????????????? ?????????? ??????????</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzasArr}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
