﻿import React from 'react';
import { Button, Form, Modal, Icon, ModalActions, Pagination, Dropdown } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import Moment from 'react-moment';


export default class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            appData: [],
            customerData: [],
            customer: '',
            productData: [],
            product: '',
            storeData: [],
            store: '',
            dateSold: '',
            id: 0,
            createModalOpen: false,
            deleteModalOpen: false,
            editModalOpen: false
        };
    }

    componentDidMount() {
        this.loadData();
        this.getCustomerList();
        this.getProductList();
        this.getStoreList();

    }

    getCustomerList = () => {
        fetch("/Customer/CustomerList")
            .then(res => res.json())
            .then((data) => {
                let thisList = data.map(list => { return { key: list.id, text: list.name, value: list.id } })
                this.setState({
                    customerData: [{ value: '', display: '(Select Customer)' }].concat(thisList),
                    isLoading: false
                });
            })

            .catch(error => {
                if (error.response) {
                    console.log(error.responderEnd);
                }
            })
    }

    getProductList = () => {
        fetch("/Product/ProductList")
            .then(res => res.json())
            .then((data) => {
                let thisList = data.map(list => { return { key: list.id, text: list.name, value: list.id } })
                this.setState({
                    productData: [{ value: '', display: '(Select Product)' }].concat(thisList),
                    isLoading: false
                });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.responderEnd);
                }
            })
    }


    getStoreList = () => {
        fetch("/Store/StoreList")
            .then(res => res.json())
            .then((data) => {
                let thisList = data.map(list => { return { key: list.id, text: list.name, value: list.id } })
                this.setState({
                    storeData: [{ value: '', display: '(Select Store)' }].concat(thisList),
                    isLoading: false
                });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.responderEnd);
                }
            })
    }

    createSale = () => {
        console.log("date " + this.state.dateSold + " cust " + this.state.customer + " store " + this.state.store + " product " + this.state.product)
        fetch("/Sales/CreateSales", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                DateSold: this.state.dateSold,
                CustomerId: this.state.customer,
                ProductId: this.state.product,
                StoreId: this.state.store
            })
        })
            .then(res => {
                this.setState({ createModalOpen: false, dateSold: '', customer: '', store: '', product: '' });
                this.loadData();
                console.log(res);
            }).catch(err => err);
    }

    editSale = (id) => {
        console.log("date " + this.state.dateSold + " cust " + this.state.customer + " store " + this.state.store + " product " + this.state.product)
        fetch("/Sales/EditSales/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                DateSold: this.state.dateSold,
                CustomerId: this.state.customer,
                ProductId: this.state.product,
                StoreId: this.state.store
            })
        }).then((res) => {
            this.setState({ editModalOpen: false, dateSold: '', customer: '', store: '', product: '' });
            this.loadData();
            console.log(res);
        }).catch(err => err);
    }

    loadData = () => {
        fetch("/Sales/SalesList")
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                this.setState({
                    appData: result,
                    isLoading: false
                });
            })

            .catch(error => {
                if (error.response) {
                    console.log(error.responderEnd);
                }
            })
    }

    deleteSale = (id) => {
        fetch("/Sales/DeleteSales/" + id, {
            method: 'DELETE'
        })
            .then(res => {
                this.setState({ deleteModalOpen: false });
                this.loadData();
                console.log(res);
            }).catch(err => err);
    }

    render() {

        let serviceList = this.state.appData;

        let tableData = null;

        if (serviceList != "") {

            tableData = serviceList.map(service =>

                <tr key={service.id}>
                    <td>{service.customer.name}</td>
                    <td>{service.product.name}</td>
                    <td>{service.store.name}</td>
                    <td><Moment format="MM/DD/YYYY">{service.dateSold}</Moment></td>


                    <td>
                        {/*Edit Modal*/}
                        <Modal open={this.state.editModalOpen} size={'tiny'} trigger={<Button icon color='yellow' labelPosition='left' onClick={() => this.setState({ editModalOpen: true, dateSold: new Date(service.dateSold).toLocaleDateString(), customer: service.customer.id, product: service.product.id, store: service.store.id })}><Icon name='edit' />EDIT</Button>}>
                            <Modal.Header>Edit sale</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <label>Date Sold</label>
                                        <DateInput
                                            name="dateSold"
                                            placeholder="Date Sold"
                                            value={this.state.dateSold}
                                            iconPosition="right"
                                            onChange={(event, { name, value }) => this.setState({ dateSold: value })}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Customer</label>
                                        <Dropdown
                                            placeholder='Select Customer'
                                            fluid
                                            selection
                                            options={this.state.customerData}
                                            value={this.state.customer}
                                            onChange={(event, { name, value }) => this.setState({ customer: value })}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Product</label>
                                        <Dropdown
                                            placeholder='Select Product'
                                            fluid
                                            selection
                                            options={this.state.productData}
                                            value={this.state.product}
                                            onChange={(event, { name, value }) => this.setState({ product: value })}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Store</label>
                                        <Dropdown
                                            placeholder='Select Store'
                                            fluid
                                            selection
                                            options={this.state.storeData}
                                            value={this.state.store}
                                            onChange={(event, { name, value }) => this.setState({ store: value })}
                                        />
                                    </Form.Field>
                                </Form>
                            </Modal.Content>
                            <ModalActions>
                                <Button secondary onClick={() => this.setState({ editModalOpen: false, dateSold: '', customer: '', store: '', product: '' })}>Cancel</Button>
                                <Button onClick={() => { this.editSale(service.id) }} icon positive type='submit' labelPosition='right'><Icon name='check' />Edit</Button>
                            </ModalActions>
                        </Modal>
                    </td>

                    <td>
                        {/*Delete Modal*/}
                        <Modal open={this.state.deleteModalOpen} trigger={<Button icon color='red' labelPosition='left' onClick={() => this.setState({ deleteModalOpen: true })}> <Icon name='trash' />DELETE</Button>}>
                            <Modal.Header>Delete sale</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <h4>Are you sure?</h4>
                                    </Form.Field>
                                </Form>
                            </Modal.Content>
                            <ModalActions>
                                <Button secondary onClick={() => this.setState({ deleteModalOpen: false })}>Cancel</Button>
                                <Button icon onClick={(id) => this.deleteSale(service.id)} color='red' labelPosition='right' type='submit'><Icon name='cancel' />Delete</Button>
                            </ModalActions>
                        </Modal>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    {/*New sale Modal*/}
                    <Modal open={this.state.createModalOpen} size={'tiny'} trigger={<Button primary onClick={() => this.setState({ createModalOpen: true })}>New Sale</Button>}>
                        <Modal.Header>Create sale</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <label>Date Sold</label>
                                    <DateInput
                                        name="dateSold"
                                        placeholder="Date Sold"
                                        value={this.state.dateSold}
                                        iconPosition="right"
                                        onChange={(event, { name, value }) => this.setState({ dateSold: value })}
                                    />

                                </Form.Field>
                                <Form.Field>
                                    <label>Customer</label>
                                    <Dropdown
                                        placeholder='Select Customer'
                                        fluid
                                        selection
                                        options={this.state.customerData}
                                        value={this.state.customer}
                                        onChange={(event, { name, value }) => this.setState({ customer: value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Product</label>
                                    <Dropdown
                                        placeholder='Select Product'
                                        fluid
                                        selection
                                        options={this.state.productData}
                                        value={this.state.product}
                                        onChange={(event, { name, value }) => this.setState({ product: value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Store</label>
                                    <Dropdown
                                        placeholder='Select Store'
                                        fluid
                                        selection
                                        options={this.state.storeData}
                                        value={this.state.store}
                                        onChange={(event, { name, value }) => this.setState({ store: value })}
                                    />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <ModalActions>
                            <Button secondary onClick={() => this.setState({ createModalOpen: false, dateSold: '', customer: '', store: '', product: '' })}>Cancel</Button>
                            <Button onClick={this.createSale} icon positive type='submit' labelPosition='right'><Icon name='check' />Create</Button>
                        </ModalActions>
                    </Modal>
                    <table className="ui fixed celled striped table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Store</th>
                                <th>Date sold</th>
                                <th>Actions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment >

        )
    }
}