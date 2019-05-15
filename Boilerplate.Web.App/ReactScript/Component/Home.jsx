import React from 'react';
import { Header, Icon, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

const Home = () => (
    <div className='container-fluid' id="body-cover">
        <div className="homeDiv">
            <Header as='h2' icon>
                <Icon name='computer' />
                MVP Studio Internship
                    <Header.Subheader>Talent Developers - Onboarding Task </Header.Subheader>
            </Header>
        </div>
        <div className="homeButtons">
            <NavLink to="/customer">
                <button class="ui yellow inverted large button buttonSize">Customer</button>
            </NavLink>&emsp;
             <NavLink to="/product">
                <button class="ui green inverted large button buttonSize">Product</button>
            </NavLink>&emsp;
             <NavLink to="/store">
                <button class="ui violet inverted large button buttonSize">Store</button>
            </NavLink>&emsp;
             <NavLink to="/sales">
                <button class="ui red inverted large button buttonSize">Sales</button>
            </NavLink>
        </div>
    </div>

)

export default Home;