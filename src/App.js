import React, { Component } from "react";
import "./App.css";
import Menu, { PRODUCTS_ROUTE } from "./Menu/Menu";
import Header from "./Header/Header";
import { getProducts } from "./Redux/Actions/products";
import { connect } from "react-redux";
import ProductsList from "./Products/ProductsList";
import { menuClicked } from "./Redux/Actions/ui";

class App extends Component {
  componentWillMount = () => {
    this.props._getProducts();
  };

  onLogoutClickHandler = event => {};

  render() {
    const selectedMenuList = this.props.ui.menu.filter(
      menuItem => menuItem.selected
    );
    const selectedMenu = selectedMenuList[0];
    return (
      <div className="App">
        <Header
          isLoggedIn={this.props.ui.isLoggedIn}
          buttonHandler={() => this.onLogoutClickHandler()}
        />
        <Menu
          clickHandler={this.props._menuClickHandler}
          items={this.props.ui.menu}
        />

        <div className="ContentContainer">
          {this.props.ui.pending ? (
            <div className="Loader">LOADING</div>
          ) : selectedMenu && selectedMenu.route === PRODUCTS_ROUTE ? (
            <ProductsList products={this.props.products} />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  _getProducts: () => dispatch(getProducts()),
  _menuClickHandler: index => dispatch(menuClicked(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
