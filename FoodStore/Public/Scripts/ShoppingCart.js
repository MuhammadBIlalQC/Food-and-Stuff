class CartItem extends React.Component {
    constructor(props)
    {
        super(props);
        this.paragraphStyle = {
            fontSize: '16px',
        }
    }

    render()
    {
        return (
            <div style={{ display: 'none' }}>
                <p style={this.paragraphStyle}>{this.props.itemName} <span style={{ textAlign: 'right' }}>${this.props.price}</span></p>
            </div>
            )
    }
}


class ShoppingCart extends React.Component {
    constructor(props)
    {
        super(props);
        this.containerStyle = {
            position: 'fixed',
            bottom: '0px',
            right: '0px',
        }
        this.buttonStyle = {
            textAlign: 'center',
            width: '120px',
        }

        this.expandedContainer = {
            position: 'absolute',
            right: '0px',
            bottom: '40px',
            display: 'block',
            width: '0px',
            height: '0px',
            padding: '15px',
            backgroundColor: 'rgba(255,255,255,1)',
            ZIndex: '10',
            overflowY: 'auto',
        }

        this.toggleCart = this.toggleCart.bind(this);
        this.state = { items: [] };

    }

    toggleCart()
    {
        const expandedContainer = $('#shoppingCart-expanded');
        if (expandedContainer.width() == 0)
        {
            expandedContainer.animate({
                minWidth: '300px',
                minHeight: '200px',
            });
            expandedContainer.children().fadeIn();
        }
        else
        {
            expandedContainer.children().fadeOut();
            expandedContainer.animate({
                minWidth: '0px',
                minHeight: '0px',
                maxWidth: '0px',
                maxHeight: '0px',
            });
        }
    }
    render()
    {

        const items = this.props.items.map(item => <CartItem itemName={item} price='3.49' />);
        const itemCountDisplay = items.length;
        return (
            <div style={this.containerStyle}>
                <div style={this.expandedContainer} id="shoppingCart-expanded">
                    {items}
                </div>
                <button id="shoppingCart-button" className="btn btn-primary" style={this.buttonStyle} onClick={this.toggleCart} > {itemCountDisplay} Cart  < span className="glyphicon glyphicon-shopping-cart"></span></button>
            </div>
            )
    }

}