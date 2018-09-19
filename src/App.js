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
  confirmAddToCart
} from "./Redux/Actions/ui";
import { Layout, Navigation, Drawer, Content, Spinner } from "react-mdl";
import OrderDialog from "./Products/OrderDialog";

class App extends Component {
  constructor(props) {
    super(props);
    this._quantityInput = React.createRef();
    this.onSubmitOrder = this.onSubmitOrder.bind(this);
  }

  componentWillMount = () => {
    this.props._getProducts();
  };

  onLogoutClickHandler = event => {};

  onSubmitOrder = e => {
    this._quantityInput.current.setState({ quantity: "" });
    this.props._handleCloseDialog();
    this.props._confirmAddToCart();
    e.preventDefault();
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
            orderCount={this.props.ui.orderIds.length}
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
            <OrderDialog
              currentProduct={this.props.ui.currentOrder}
              ref={this._quantityInput}
              open={this.props.ui.orderInProgress}
              _handleCloseDialog={this.props._handleCloseDialog}
              onSubmitOrder={this.onSubmitOrder}
            />

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
  _confirmAddToCart: () => dispatch(confirmAddToCart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
