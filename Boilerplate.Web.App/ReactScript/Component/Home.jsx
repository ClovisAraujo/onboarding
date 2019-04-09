import React from 'react';

const Home = () => (
    <div className='container-fluid' id="body-cover">
        <div className="row">
            <div className="col-md-1 hidden-xs">
            </div>
            <div className="col-md-3 col-xs-4">
                <div className="col">
                    <div className="card border-primary mb-4">
                        <img className="card-img-top" alt="Card image cap" src="https://semantic-ui.com/images/avatar/large/joe.jpg" />
                        <div className="card-body">
                            <h4 className="card-title"><a>Mirani</a></h4>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Button</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-7 col-xs-8">
                <div className="jumbotron col">
                    <h1>This is body </h1>
                </div>
                <div className="jumbotron col">
                    This is body
                         </div>
                <div className="jumbotron col">
                    This is body
                         </div>
            </div>
            <div className="col-md-1 hidden-xs">

            </div>
        </div>
        </div>

)

export default Home;