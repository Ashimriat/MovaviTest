import * as React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import {ProductType} from '../interfaces';

const styles = createStyles({
  basketContainer: {
    border: '1px solid #D4D4D4',
    borderRadius: 5,
    width: 228,
    padding: '14px 12px',
    height: 'fit-content'
  },
  purchaseButton: {
    backgroundColor: '#29D807',
    color: '#ffffff',
    fontSize: 21,
    borderRadius: 10,
    textTransform: 'none',
    padding: '3px 21px',
    '&:hover': {
      backgroundColor: '#34AB17',
    }
  },
  closeIcon: {
    background: 'url(assets/images/cross.png) no-repeat',
    height: 10,
    width: 10,
    flexBasis: '10%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  productTitle: {
    flexBasis: '53%',
    fontSize: 12
  },
  basketTitle: {
    fontSize: 18,
  },
  boldText: {
    fontWeight: 600
  },
  divider: {
    width: '95%'
  },
  productsContainer: {
    maxHeight: 300,
    padding: 4,
    overflow: 'hidden auto',
    '&::-webkit-scrollbar': {
      width: 4,
      display: 'none',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#A9A9A9',
      outline: '1px solid #708090',
    },
    '&:hover::-webkit-scrollbar': {
      display: 'initial'
    }
  },
  productPrice: {
    flexBasis: '34%',
    textAlign: 'right',
    fontWeight: 600,
  },
  totalPrice: {
    width: '100%'
  }
});

interface Props extends WithStyles<typeof styles> {
  items: Array<ProductType>;
  removeFromBasket: Function;
  className?: string;
}

const Basket: React.FunctionComponent<Props> = ({items, removeFromBasket, className, classes}: Props) => {
  let itemsList = [],
    totalPrice = 0;
  items.forEach((item: ProductType) => {
    itemsList.push(item.title);
    totalPrice += item.price;
  });
  let alertMessage = totalPrice ?
    `Вы добавили в корзину ${itemsList.join(', ')} на сумму ${totalPrice} рублей.`
    : 'Для оформления заказа добавьте товары в корзину!'
  ;

  return (
    <div className={classNames(classes.basketContainer, className)}>
      <Grid
        container
        direction={'column'}
        alignItems={'center'}
        spacing={8}
      >
        <Grid
          item
          container
          justify={'space-evenly'}
          alignItems={'center'}
        >
          <img src={'assets/images/basket.png'}/>
          <Typography className={classNames(classes.basketTitle, classes.boldText)}>
            {'Корзина'}
          </Typography>
        </Grid>
        <div className={classes.productsContainer}>
          <Grid
            item
            container
            direction={'column'}
            spacing={16}
          >
            {
              items.map((item, index) => {
                return (
                  <Grid
                    key={`basketItem-${index}`}
                    item
                    container
                    justify={'space-evenly'}
                    alignItems={'baseline'}
                  >
                    <div
                      className={classes.closeIcon}
                      onClick={() => removeFromBasket(index)}
                    />
                    <Typography className={classes.productTitle}>
                      {item.title}
                    </Typography>
                    <Typography className={classes.productPrice}>
                      {`${item.price} руб.`}
                    </Typography>
                  </Grid>
                );
              })
            }
          </Grid>
        </div>
        <Divider className={classes.divider}/>
        <Grid
          item
          container
          spacing={24}
        >
          <Grid
            item
            container
          >
            <Typography
              align={'right'}
              className={classes.totalPrice}
            >
              {'Всего: '}
              <span className={classes.boldText}>
                {`${totalPrice || '0.00'} руб.`}
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.purchaseButton}
              onClick={() => alert(alertMessage)}
            >
              {'Оформить заказ'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Basket);