import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actDetailProductRequest, actUpdateProductRequest } from '../../actions';
import { connect } from 'react-redux';



class ProductActionPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      price: '',
      status: '',
    }
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      this.props.onEditProduct(id)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEditing) {
      var { itemEditing } = nextProps;
      this.setState({
        id: itemEditing.id,
        name: itemEditing.name,
        price: itemEditing.price,
        status: itemEditing.status
      })
    }
  }


  render() {
    var { name, price, status } = this.state;
    return (
      <form onSubmit={this.onSave}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={this.onChange}
            value={name} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            onChange={this.onChange}
            value={price} />
        </div>
        <div className="form-group form-check">
          <input type="checkbox"
            className="form-check-input"
            name="status"
            onChange={this.onChange}
            value={status}
            checked={status} />
          <label className="form-check-label">Status</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/product-list" className="btn btn-danger ml-2" >Go Back </Link>
      </form>
    );
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    })
  }

  onSave = (e) => {
    e.preventDefault();
    var { id, name, price, status } = this.state;
    var { history } = this.props;
    var product = {
      id: id,
      name: name,
      price: price,
      status: status
    }
    if (id) {
      this.props.onUpdateProduct(product);
    } else {
      this.props.onAddProduct(product);

    }
    history.goBack();

  }
}

const mapStateToProps = state => {
  return {
    itemEditing: state.itemEditing
  }
}

const mapDispatchToProp = (dispatch, props) => {
  return {
    onAddProduct: (product) => {
      dispatch(actAddProductRequest(product))
    },
    onEditProduct: (id) => {
      dispatch(actDetailProductRequest(id))
    },
    onUpdateProduct: (product) => {
      dispatch(actUpdateProductRequest(product))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(ProductActionPage)