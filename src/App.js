import React, { Component } from "react";
import "./App.css";
import Header from "./Header/Header";
import { getProducts, deleteProduct } from "./Redux/Actions/products";
import { connect } from "react-redux";
import ContentContainer from "./Containers/ContentContainer";
import {
  menuClicked,
  createSearchAction,
  hideDialog,
  showOrderDialog,
  confirmAddToCart,
  updateProductQuantity,
  showDeleteDialog,
  hideDeleteDialog
} from "./Redux/Actions/ui";
import { Layout, Content } from "react-mdl";
import NavigationComponent from "./Navigation/NavigationComponent";
import AddProductDialog from "./Products/AddProductDialog";
import DeleteProductDialog from "./Products/DeleteProductDialog";

class App extends Component {
  constructor(props) {
    super(props);
    this.idToBeDeleted = null;
    this.deleteInProgress = this.deleteInProgress.bind(this);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.shoppingCartAction = this.shoppingCartAction.bind(this);
  }

  componentWillMount = () => {
    this.props._getProducts();
  };

  onLogoutClickHandler = event => {};

  onQuantityChange = e => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      this.props._updateProductQuantity(val);
    } else {
      this.props._updateProductQuantity(null);
    }
  };

  shoppingCartAction = route => {
    this.props._menuClickHandler(route);
  };

  onDeleteConfirm = () => {
    this.props._onDeleteProduct(this.idToBeDeleted);
  };

  deleteInProgress = id => {
    this.idToBeDeleted = id;
    this.props._onDeleteInProgress();
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
            title={selectedMenu.name}
            handleSearch={this.props._handleSearch}
            isLoggedIn={this.props.ui.isLoggedIn}
            buttonHandler={() => this.onLogoutClickHandler()}
            orderCount={this.props.ui.shoppingCart.length}
            shoppingCartAction={this.shoppingCartAction}
          />
          <NavigationComponent
            menu={this.props.ui.menu}
            menuClickHandler={this.props._menuClickHandler}
          />

          <Content>
            <AddProductDialog
              open={this.props.ui.orderInProgress}
              shoppingCart={this.props.ui.shoppingCart}
              currentProduct={this.props.ui.currentProduct}
              onQuantityChange={this.onQuantityChange}
              confirmAddToCart={this.props._confirmAddToCart}
              handleCloseDialog={this.props._handleCloseDialog}
            />
            <DeleteProductDialog
              open={this.props.ui.deleteInProgress}
              onDeleteConfirm={this.onDeleteConfirm}
              onDeleteCancelled={this.props._onDeleteCancelled}
            />
            <ContentContainer
              loading={this.props.ui.pending}
              selectedMenu={selectedMenu}
              products={this.props.products}
              shoppingCart={this.props.ui.shoppingCart}
              onAddToCart={this.props._onAddToCart}
              deleteInProgress={this.deleteInProgress}
            />
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
  _menuClickHandler: route => dispatch(menuClicked(route)),
  _handleCloseDialog: () => dispatch(hideDialog()),
  _onAddToCart: id => dispatch(showOrderDialog(id)),
  _confirmAddToCart: () => dispatch(confirmAddToCart()),
  _updateProductQuantity: quantity => dispatch(updateProductQuantity(quantity)),
  _onDeleteProduct: productId => dispatch(deleteProduct(productId)),
  _onDeleteInProgress: () => dispatch(showDeleteDialog()),
  _onDeleteCancelled: () => dispatch(hideDeleteDialog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
