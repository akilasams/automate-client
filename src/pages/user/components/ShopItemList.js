import React from 'react';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../../helpers/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ShopItem from './ShopItem';

import Grid from '@material-ui/core/Grid';
// import { Container } from '@material-ui/core';

const ShopItemList = () => {
  // if (props.items.length === 0) {
  //   return <div className='place-list center'>No Items Found</div>;
  // }
  const { authState } = useContext(AuthContext);
  const [shopItems, setShopItems] = useState([]);

  async function fetchItemsHandler() {
    // axios
    //   .get('https://automate-weapp-3y.herokuapp.com/shop/getItems')
    //   .then((res) => {
    //     // console.log(res.data);
    //     setShopItems(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const response = await fetch(
      'https://automate-weapp-3y.herokuapp.com/shop/getItems'
    );
    const data = await response.json();
    setShopItems(data);
  }

  useEffect(() => {
    fetchItemsHandler();
  }, []);

  return (
    <Grid container spacing={2}>
      {shopItems.map((shopItem) => (
        <Grid item xs={12} md={6} sm={4} lg={3} key={shopItem.id}>
          {shopItem.userId !== authState.id && <ShopItem details={shopItem} />}
        </Grid>
      ))}
    </Grid>
  );
};

export default ShopItemList;
