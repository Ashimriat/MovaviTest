import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Basket from './components/Basket';
import Product from './components/Product';
import {default as productsList} from './productsList.json';
import {ProductType} from './interfaces';

const styles = createStyles({
  app: {
    width: 1000,
    margin: '0 auto',
  },
  pageHeader: {
    backgroundColor: '#000000',
    height: 100,
    position: 'relative'
  },
  logo: {
    position: 'absolute',
    top: 23,
    left: 10
  },
  pageFooter: {
    backgroundColor: '#105468',
    height: 125,
  },
  pageContent: {
    backgroundColor: '#ffffff',
    padding: '33px 10px 65px',
    display: 'flex',
  },
  productsContainer: {
    width: '85%',
  },
  basketPosition: {
    position: 'sticky',
    top: 10,
    marginTop: 10
  }
});

interface Props extends  WithStyles<typeof styles> {}

interface State {
  basketItems: Array<ProductType> | [];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      basketItems: JSON.parse(localStorage.getItem('basketItems')) || []
    };
  };

  addItemToBasket(item: ProductType): void {
    this.setState(prevState => {
      const newBasketItems = [...prevState.basketItems];
      newBasketItems.push(item);
      localStorage.setItem('basketItems', JSON.stringify(newBasketItems));
      return {
        basketItems: newBasketItems
      };
    });
  }

  removeItemFromBasket(itemIndex: number): void {
    this.setState(prevState => {
      const newBasketItems = [...prevState.basketItems];
      newBasketItems.splice(itemIndex, 1);
      localStorage.setItem('basketItems', JSON.stringify(newBasketItems));
      return {
        basketItems: newBasketItems
      };
    })

  }

  render() {
    const { basketItems } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <header className={classes.pageHeader}>
          <img
            className={classes.logo}
            src={'assets/images/logo.png'}
          />
        </header>
        <div className={classes.pageContent}>
          <Grid
            container
            className={classes.productsContainer}
            spacing={16}
          >
            {
              productsList.products.map((item: ProductType, index: number) => {
                return (
                  <Product
                    key={`product-${index}`}
                    product={item}
                    addToBasket={this.addItemToBasket.bind(this, item)}
                  />
                );
              })
            }
          </Grid>
          <Basket
            className={classes.basketPosition}
            items={basketItems}
            removeFromBasket={this.removeItemFromBasket.bind(this)}
          />
        </div>
        <footer className={classes.pageFooter}></footer>
      </div>
    );
  }
}

export default withStyles(styles)(App);