class CheckoutItem extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div className="row" style={{marginTop: '20px' }}>
                <div className="col-md-3">
                    <img src={"/Images/" + this.props.foodID + '.jpg'} style={{ width: '100%' }} />
                </div>
                <div className="col-md-5" style={{}}>
                    <div>
                        <h3 style={{}}>{this.props.name}</h3>
                        <h3>$10</h3>
                    </div>
                </div>
                <div className="col-md-4" style={{}}>
                    <div>
                        <button className="btn btn-danger">Remove</button>
                    </div>
                </div>
            </div>
            )
    }
}


class Checkout extends React.Component {
    constructor(props)
    {
        super(props);
        const items = [];
        var subTotal = 0;
        this.state = { items: items, deliveryCost: 2, subTotal: subTotal, display: 'none'};
        $.get('/shoppingcart/get', data => {
            for (var i = 0; i < data.length; i++)
            {
                items.push(<CheckoutItem name={data[i].Name} foodID={data[i].FoodID} price={data[i].Price} />);
                subTotal += parseInt(data[i].Price);
            }
            var display = data.length > 0 ? 'block' : 'none';
            var noDisplay = data.length > 0 ? 'none' : 'block';
            this.setState({ items: items, subTotal: subTotal, display: display, noDisplay: noDisplay});
        });
    }

    render()
    {
        return (
            <div style={{ marginTop: '100px' }}>
                <div>
                    {this.state.items}
                    <div className="row" style={{ marginTop: '100px', }}>
                        <div className="col-md-12" style={{ position: 'relative', display: this.state.noDisplay }} >
                            <h3>Oops! Looks like your shopping cart is empty. Click on <a href="/menu">Menu</a> to Add Items!</h3>
                        </div>
                         <div className="col-md-4" style={{position: 'relative', display: this.state.display }} >
                                <h3 style={{ width: '120px' }}>Subtotal: <span style={{ position: 'absolute', right: '5px' }}>${this.state.subTotal}</span></h3>
                                <h3 style={{ width: '120px' }}>Delivery: <span style={{ position: 'absolute', right: '5px' }}>${this.state.deliveryCost}</span></h3>
                                <h3 style={{ width: '120px' }}>Total: <span style={{ position: 'absolute', right: '5px' }}>${this.state.subTotal + this.state.deliveryCost}</span></h3>
                                <button className="btn btn-success" style={{ marginTop: '50px', }}>Continue to Checkout</button>
                         </div>
                    </div>
                </div>
            </div>
            )
    };
}

ReactDOM.render(<Checkout />, document.getElementById('ShoppingCart-List'));