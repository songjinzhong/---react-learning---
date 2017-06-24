import React from 'react'
 
class ProductCategoryRow extends React.Component {
	render() {
		return <tr><th colSpan="2">{this.props.category}</th></tr>;
	}
}

class ProductRow extends React.Component {
	render() {
		var name = this.props.product.stocked ?
			this.props.product.name :
			<span style={{color: 'red'}}>
				{this.props.product.name}
			</span>;
		return (
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		);
	}
}

class ProductTable extends React.Component {
	render() {
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach((product) => {
            if(product.name.indexOf(this.props.filterText) === -1 || (this.props.onlyStock && !product.stocked)){
                return;
            }
			if (product.category !== lastCategory) {
				rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
			}
			rows.push(<ProductRow product={product} key={product.name} />);
			lastCategory = product.category;
		});
		return (
			<table style={{ margin: "0 auto" }}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

class SearchBar extends React.Component {
    constructor(props){
        super(props)
        this.handlerInputChange = this.handlerInputChange.bind(this)
        this.handleStockChange = this.handleStockChange.bind(this)
    }
    handlerInputChange(e){
        this.props.onFilterTextInput(e.target.value)
    }
    handleStockChange(e){
        this.props.onIsStockChange(e.target.checked)
    }
	render() {
		return (
			<form>
				<input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handlerInputChange}/>
				<p>
					<input type="checkbox"
                        checked={this.props.onlyStock}
                        onChange={this.handleStockChange}/>
					{' '}
					Only show products in stock
				</p>
			</form>
		);
	}
}

class FilterableProductTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filterText: "",
            onlyStock: false
        }
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this)
        this.handleStockChange = this.handleStockChange.bind(this)
    }
    handleFilterTextInput(text){
        this.setState({
            filterText: text
        })
    }
    handleStockChange(b){
        this.setState({
            onlyStock: b
        })
    }
	render() {
		return (
			<div>
				<SearchBar 
                    filterText={this.state.filterText}
                    onlyStock={this.state.onlyStock}
                    onFilterTextInput={this.handleFilterTextInput}
                    onIsStockChange={this.handleStockChange}/>
				<ProductTable 
                    products={this.props.products}
                    onlyStock={this.state.onlyStock}
                    filterText={this.state.filterText}/>
                <h2 style={{ color: "red" }}>
                    And that's it!
                </h2>
			</div>
		);
	}
}
 
export default FilterableProductTable