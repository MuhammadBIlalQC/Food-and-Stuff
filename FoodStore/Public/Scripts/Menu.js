
class Item extends React.Component {
    constructor(props) {
        super(props);
        this.class = 'col-md-2 ';

        this.hoverItemIn = this.hoverItemIn.bind(this);
        this.hoverItemOut = this.hoverItemOut.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.state = { button: <button className="btn btn-info" onClick={this.addToCart} > Add to Cart </button>, added: false };
    }

    hoverItemIn(e) {
        var img, p, button;
        const target = $(e.target);
        if (target.is('img')) {
            img = target;
            parent = target.parent();
            button = parent.children('button');
            p = parent.children('p');
        }
        if (target.is('p')) {
            p = target;
            parent = target.parent();
            button = parent.children('button');
            img = parent.children('img');
        }

        img.animate({ opacity: '.2' });
        button.css('display', 'block');
    }

    hoverItemOut(e) {
        if (this.state.added)
            return;
        var img, p, button;
        const target = $(e.target);
        if (target.is('img')) {
            img = target;
            parent = target.parent();
            button = parent.children('button');
            p = parent.children('p');
        }
        if (target.is('p')) {
            p = target;
            parent = target.parent();
            button = parent.children('button');
            img = parent.children('img');
        }

        img.animate({ opacity: '1' });
        button.css('display', 'none');
    }


    addToCart(e) {
        const superClass = this.props.superClass;
        //const cart = superClass.state.cartItems;
        var item = $(e.target);
        item = item.is('div') ? item : item.parent();
        //cart.push(item.attr('id'));
        //superClass.setState({ cartItems: cart });
        $.post('/shoppingcart/add', { FoodID: this.props.foodID }, data => console.log(data));
        this.setState({ button: <button className="btn btn-success"  > <span className="glyphicon glyphicon-ok"></span> Added </button>, added: true });
    }

    minimizeShoppingCart() {
        const expandedContainer = $('#shoppingCart-expanded');
        expandedContainer.children().fadeOut();
        expandedContainer.animate({
            minWidth: '0px',
            minHeight: '0px',
            maxWidth: '0px',
            maxHeight: '0px',
        });
    }


    render() {
        return (
            <div className={this.class + ' jqueryItemSelectorClass ' + this.props.type + ' ' + this.props.mealType}>
                <div className="item" id="example" dataName={this.props.name} dataType={this.props.type} dataMealtype={this.props.mealType} onMouseEnter={this.hoverItemIn} onMouseLeave={this.hoverItemOut}>
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
    constructor(props) {
        super(props);

        var featuredItems = [];
        const self = this;
        this.state = { menu: [], cartItems: [] };
        $.get('/items/get', function (data) {
            const menu = [];
            for (var i = 0; i < data.length; i++)
                menu.push({ name: data[i].Name, img: data[i].FoodID + '.jpg', price: data[i].Price, type: data[i].Type, mealType: data[i].MealType, foodID: data[i].FoodID });
            var menuToHtml = menu.map((elem, i) => <Item name={elem.name} imgSrc={elem.img} price={elem.price} foodID={elem.foodID} type={elem.type} mealType={elem.mealType} superClass={this} />);
            self.setState({ menu: menuToHtml });
        });

        /*
        $.get('/items/get', function (data) {
            for (var i = 0; i < data.length; i++)
            {
                featuredItems.push({ name: data[i].name, img: data[i].FoodID + '.jpg', price: '10.00', foodID: data[i].FoodID });
            }
            var featuredCollection = featuredItems.map((elem, i) => <Item name={elem.name} imgSrc={elem.img} foodID={elem.foodID} price={elem.price} offset={i == 0 ? '1' : (i % 4 == 0 ? '3' : null)} superClass={this} />);
            self.setState({ featuredCollection: featuredCollection });
        });
        */
    }


    render() {
        return (
            <div>
                {this.state.menu}
            </div>
        )
    }
}

ReactDOM.render(<Collection />, document.getElementById('MenuContainer'));

