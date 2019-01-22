import * as React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {ProductType} from "../interfaces";

const styles = createStyles({
  addToBasketButton: {
    backgroundColor: '#00ADE4',
    color: '#ffffff',
    padding: '3px 45px',
    fontSize: 21,
    textTransform: 'none',
    borderRadius: 10,
    '&:hover': {
      backgroundColor: '#1892B9',
    }
  },
  productCoverContainer: {
    maxWidth: '20%',
    flexBasis: '20%'
  },
  productCover: {
    width: 128,
    height: 202,
  },
  productTitle: {
    fontWeight: 600,
    fontSize: 18
  },
  productPrice: {
    fontWeight: 600,
    fontSize: 24
  },
  priceContainer: {
    maxWidth: '30%',
    flexBasis: '30%',
  }
});

interface Props extends WithStyles<typeof styles> {
  product: ProductType;
  addToBasket: Function;
}

const Product: React.FunctionComponent<Props> = ({product, addToBasket, classes}: Props) => {
  return (
    <Grid
      container
      item
    >
      <Grid
        item
        xs={3}
        className={classes.productCoverContainer}
      >
        <img
          className={classes.productCover}
          src={product.coverImage}
        />
      </Grid>
      <Grid
        item
        container
        direction={'column'}
        xs={6}
      >
        <Grid item>
          <Typography className={classes.productTitle}>
            {product.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {product.description}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction={'column'}
        justify={'center'}
        alignItems={'center'}
        xs={3}
        spacing={8}
        className={classes.priceContainer}
      >
        <Grid item>
          <Typography className={classes.productPrice}>
            {`${product.price} руб.`}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.addToBasketButton}
            onClick={() => addToBasket()}
          >
            {'В корзину!'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Product);