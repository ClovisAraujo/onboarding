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
                <Button inverted size='large' color='yellow'>
                    Customer
                </Button>
            </NavLink>&emsp;
             <NavLink to="/product">
                <Button inverted size='large' color='green'>
                    Product
            </Button>
            </NavLink>&emsp;
             <NavLink to="/store">
                <Button inverted size='large' color='violet'>
                    Store
         </Button>
            </NavLink>&emsp;
             <NavLink to="/sales">
                <Button inverted size='large' color='red'>
                    Sales
         </Button>
            </NavLink>
        </div>
    </div>

)

export default Home;