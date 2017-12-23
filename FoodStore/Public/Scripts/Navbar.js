/*
    Using Handlebars to render view components adds unneccessary whitespace
*/

class Navbar extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">Food and Stuff</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><a href="/Menu">Menu</a></li>
                            <li><a href="/Locations">Locations</a></li>
                        </ul>
                        <form className="navbar-form navbar-right">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Find Food!" />
                            </div>
                            <button type="submit" className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
                        </form>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#"><span className="glyphicon glyphicon-shopping-cart"></span> Cart </a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            )
    }
}

ReactDOM.render(<Navbar />, document.getElementById('navbar'));