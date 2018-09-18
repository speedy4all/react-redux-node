import React, { Component } from "react";
import "./App.css";
import { PRODUCTS_ROUTE } from "./Menu/Menu";
import Header from "./Header/Header";
import { getProducts } from "./Redux/Actions/products";
import { connect } from "react-redux";
import ProductsList from "./Products/ProductsList";
import { menuClicked, createSearchAction } from "./Redux/Actions/ui";
import { Layout, Navigation, Drawer, Content } from "react-mdl";

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
        <Layout>
          <Header
            handleSearch={this.props._handleSearch}
            isLoggedIn={this.props.ui.isLoggedIn}
            buttonHandler={() => this.onLogoutClickHandler()}
          />
          <Drawer>
            <Navigation>
              {this.props.ui.menu.map((item, index) => {
                return (
                  <span
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
            {this.props.ui.pending ? (
              <div className="Loader">LOADING</div>
            ) : selectedMenu && selectedMenu.route === PRODUCTS_ROUTE ? (
              <ProductsList products={this.props.products} />
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
  _menuClickHandler: index => dispatch(menuClicked(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
