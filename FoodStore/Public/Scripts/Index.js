
class Item extends React.Component {
    constructor(props)
    {
        super(props);
        this.class = 'col-md-2 ';
        if (this.props.offset != null)
            this.class += ' col-md-offset-' + this.props.offset + ' ';

        


        this.hoverItemIn = this.hoverItemIn.bind(this);
        this.hoverItemOut = this.hoverItemOut.bind(this);
        this.addToCart = this.addToCart.bind(this);
        //this.minimizeShoppingCart = this.minimizeShoppingCart.bind(this);

        this.state = { button: <button className="btn btn-info" onClick={this.addToCart} > Add to Cart </button>, added: false };
    }

    hoverItemIn(e)
    {
        var img, p, button;
        const target = $(e.target);
        if (target.is('img'))
        {
            img = target;
            parent = target.parent();
            button = parent.children('button');
            p = parent.children('p');
        }
        if (target.is('p'))
        {
            p = target;
            parent = target.parent();
            button = parent.children('button');
            img = parent.children('img');
        }

        img.animate({ opacity: '.2' });
        button.css('display', 'block');
    }

    hoverItemOut(e)
    {
        if (this.state.added)
            return;
        var img, p, button;
        const target = $(e.target);
        if (target.is('img'))
        {
            img = target;
            parent = target.parent();
            button = parent.children('button');
            p = parent.children('p');
        }
        if (target.is('p'))
        {
            p = target;
            parent = target.parent();
            button = parent.children('button');
            img = parent.children('img');
        }

        img.animate({ opacity: '1' });
        button.css('display', 'none');
    }


    addToCart(e)
    {
        //this.minimizeShoppingCart();
        const superClass = this.props.superClass;
        const cart = superClass.state.cartItems;
        var item = $(e.target);
        item = item.is('div') ? item : item.parent();
        cart.push(item.attr('id'));
        superClass.setState({ cartItems: cart });

        $.post('/items/add', { itemName: item.attr('id'), count: 1 }, data => console.log(data));
        this.setState({ button: <button className="btn btn-success"  > <span className="glyphicon glyphicon-ok"></span> Added </button>, added: true });
    }

    /* for implementation of ShoppingCart.js */
    minimizeShoppingCart()
    {
        const expandedContainer = $('#shoppingCart-expanded');
        expandedContainer.children().fadeOut();
        expandedContainer.animate({
            minWidth: '0px',
            minHeight: '0px',
            maxWidth: '0px',
            maxHeight: '0px',
        });
    }
    

    render()
    {
        return (
            <div className={this.class}>
                <div className="item" id="pizza" onMouseEnter={this.hoverItemIn} onMouseLeave={this.hoverItemOut}>
                    <img src={"/images/" + this.props.imgSrc} style={{ width: '100%' }} />
                    <br />
                    <p>Price: ${this.props.price}</p>
                    {this.state.button}
                </div>
            </div>
            )
    }
}

class Collection extends React.Component {
    constructor(props)
    {
        super(props);

        var featuredItems = [];
        const self = this;
        this.state = { /*featuredCollection: featuredCollection, */ cartItems: [] };
        $.get('/repo', function (data) {
            for (var i = 0; i < data.length; i++)
                featuredItems.push({ name: data[i].name, img: data[i].FoodID + '.jpg', price: '10.00' });
            var featuredCollection = featuredItems.map((elem, i) => <Item name={elem.name} imgSrc={elem.img} price={elem.price} offset={i == 0 ? '1' : (i % 4 == 0 ? '3' : null)} superClass={this} />);
            self.setState({ featuredCollection: featuredCollection });
        });
        /*
        var featuredItems = [
            { name: 'cake', img: 'cake.jpg', price: '5' },
            { name: 'idk', img: 'idk.jpg', price: '7' },
            { name: 'pizza', img: 'pizza.jpg', price: '10' },
            { name: 'pretzel', img: 'pretzel.jpg', price: '3' },
            { name: 'cake', img: 'grilled.jpg', price: '6' },
            { name: 'cake', img: 'choc-pancakes.jpg', price: '3' },
            { name: 'cake', img: 'coffee.jpg', price: '2' },
            { name: 'cake', img: 'quark.jpg', price: '4' },
        ]; */

        this.collectionName = this.props.collectionName == null? null : this.props.collectionName.split(' ').map(word => <span>{word} <br /> </span>);
        //var featuredCollection = featuredItems.map((elem, i) => <Item name={elem.name} imgSrc={elem.img} price={elem.price} offset={i == 0 ? '1' : (i % 4 == 0 ? '3' : null)} superClass={this}/>);
       
    }


    render()
    {
        //<ShoppingCart items={this.state.cartItems} />
        return (
            <div className="row" style={{ paddingTop: '160px' }}>
                {
                    this.props.collectionName == null ? null :
                    <div className="col-md-2">
                        <h2 style={{ textAlign: 'right' }}>{this.collectionName}</h2>
                    </div>
                }
                {this.state.featuredCollection}

            </div>
            )
    }
}

ReactDOM.render(<Collection collectionName="Featured" />, document.getElementById('collection-featured'));

