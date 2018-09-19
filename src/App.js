import React, { Component } from "react";
import "./App.css";
import { PRODUCTS_ROUTE } from "./Menu/Menu";
import Header from "./Header/Header";
import { getProducts } from "./Redux/Actions/products";
import { connect } from "react-redux";
import ProductsList from "./Products/ProductsList";
import {
  menuClicked,
  createSearchAction,
  hideDialog,
  showOrderDialog,
  confirmAddToCart,
  updateProductQuantity
} from "./Redux/Actions/ui";
import {
  Layout,
  Navigation,
  Drawer,
  Content,
  Spinner,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Textfield
} from "react-mdl";

class App extends Component {
  constructor(props) {
    super(props);

    this.onQuantityChange = this.onQuantityChange.bind(this);
  }

  componentWillMount = () => {
    this.props._getProducts();
  };

  onLogoutClickHandler = event => {};

  onQuantityChange = e => {
    this.props._updateProductQuantity(parseInt(e.target.value));
  };

  render() {
    const selectedMenuList = this.props.ui.menu.filter(
      menuItem => menuItem.selected
    );
    const selectedMenu = selectedMenuList[0];
    return (
      <div className="App">
        <Layout>
          <Header
            handleSearch={this.props._handleSearch}
            isLoggedIn={this.props.ui.isLoggedIn}
            buttonHandler={() => this.onLogoutClickHandler()}
            orderCount={this.props.ui.shoppingCart.length}
          />
          <Drawer>
            <Navigation>
              {this.props.ui.menu.map((item, index) => {
                return (
                  <span
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props._menuClickHandler(index)}
                  >
                    {item.name}
                  </span>
                );
              })}
            </Navigation>
          </Drawer>

          <Content>
            <Dialog open={this.props.ui.orderInProgress}>
              <DialogTitle>
                Quantity for {this.props.ui.currentProduct.name}
              </DialogTitle>
              <DialogContent>
                <span>
                  {this.props.ui.shoppingCart.map(p => {
                    if (p.id === this.props.ui.currentProduct.id) {
                      return (
                        <div>
                          <span>Order quantity: {p.quantity}</span>
                          <br />
                        </div>
                      );
                    }
                  })}
                </span>
                <span>Total price: </span>
                <b>
                  {this.props.ui.currentProduct.quantity *
                    this.props.ui.currentProduct.unitPrice || 0}
                </b>
                <span> RON </span>
                <Textfield
                  onChange={this.onQuantityChange}
                  pattern="-?[0-9]*(\.[0-9]+)?"
                  error="Input is not a number!"
                  label="Quantity..."
                  required
                  floatingLabel
                  value={this.props.ui.currentProduct.quantity}
                />
              </DialogContent>
              <DialogActions fullWidth>
                <Button type="button" onClick={this.props._confirmAddToCart}>
                  Confirm
                </Button>
                <Button type="button" onClick={this.props._handleCloseDialog}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            {this.props.ui.pending ? (
              <Spinner />
            ) : selectedMenu && selectedMenu.route === PRODUCTS_ROUTE ? (
              <ProductsList
                products={this.props.products}
                onAddToCart={this.props._onAddToCart}
              />
            ) : null}
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  _handleSearch: val => dispatch(createSearchAction(val)),
  _getProducts: () => dispatch(getProducts()),
  _menuClickHandler: index => dispatch(menuClicked(index)),
  _handleCloseDialog: () => dispatch(hideDialog()),
  _onAddToCart: id => dispatch(showOrderDialog(id)),
  _confirmAddToCart: () => dispatch(confirmAddToCart()),
  _updateProductQuantity: quantity => dispatch(updateProductQuantity(quantity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
