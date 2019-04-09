import React from 'react';
import { Button, Form, Modal, Icon, ModalActions, Pagination } from 'semantic-ui-react'

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            appData: [],
            name: '',
            price: '',
            id: 0,
            createModalOpen: false,
            deleteModalOpen: false,
            editModalOpen: false
        };
    }

    componentDidMount() {
        this.loadData();

    }

    createProduct = () => {
        fetch("/Product/CreateProduct", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: this.state.name,
                Price: this.state.price
            })
        })
            .then(res => {
                if (res.ok) {
                    this.setState({ createModalOpen: false, name: '', price: '' });
                    this.loadData();
                    console.log(res);
                } else {
                    alert("ALERT!!!\n\nPlease check fields and try again\n\n\n\nName field: Max characters is 250\n\nPrice field: Accepts numbers and decimals ")
                }
            }).catch(err => err);
    }

    editProduct = (id) => {
        fetch("/Product/EditProduct/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: this.state.name,
                Price: this.state.price
            })
        }).then((res) => {
            if (res.ok) {
                this.setState({ createModalOpen: false, name: '', price: '' });
                this.loadData();
                console.log(res);
            } else {
                alert("ALERT!!!\n\nPlease check fields and try again\n\n\n\nName field: Max characters is 50\n\nPrice field: Accepts numbers and decimals ")
            }
        }).catch(err => err);
    }


    loadData = () => {
        fetch("/Product/ProductList")
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

    deleteProduct = (id) => {
        fetch("/Product/DeleteProduct/" + id, {
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
                    <td>{service.name}</td>
                    <td>${service.price}</td>
                    <td>
                        {/*Edit Modal*/}
                        <Modal open={this.state.editModalOpen} size={'tiny'} trigger={<Button icon color='yellow' labelPosition='left' onClick={() => this.setState({ editModalOpen: true, name:service.name, price:service.price })}><Icon name='edit' />EDIT</Button>}>
                            <Modal.Header>Edit product</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <label>NAME</label>
                                        <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} placeholder='Name' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>PRICE</label>
                                        <input value={this.state.price} onChange={(event) => this.setState({ price: event.target.value })} placeholder='Price' />
                                    </Form.Field>
                                </Form>
                            </Modal.Content>
                            <ModalActions>
                                <Button secondary onClick={() => this.setState({ editModalOpen: false, name: '', price: ''  })}>Cancel</Button>
                                <Button onClick={() => { this.editProduct(service.id) }} icon positive type='submit' labelPosition='right'><Icon name='check' />Edit</Button>
                            </ModalActions>
                        </Modal>
                    </td>

                    <td>
                        {/*Delete Modal*/}
                        <Modal open={this.state.deleteModalOpen} trigger={<Button icon color='red' labelPosition='left' onClick={() => this.setState({ deleteModalOpen: true })}> <Icon name='trash' />DELETE</Button>}>
                            <Modal.Header>Delete product</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <h4>Are you sure?</h4>
                                    </Form.Field>
                                </Form>
                            </Modal.Content>
                            <ModalActions>
                                <Button secondary onClick={() => this.setState({ deleteModalOpen: false })}>Cancel</Button>
                                <Button icon onClick={(id) => this.deleteProduct(service.id)} color='red' labelPosition='right' type='submit'><Icon name='cancel' />Delete</Button>
                            </ModalActions>
                        </Modal>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    {/*New product Modal*/}
                    <Modal open={this.state.createModalOpen} size={'tiny'} trigger={<Button primary onClick={() => this.setState({ createModalOpen: true })}>New Product</Button>}>
                        <Modal.Header>Create product</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <label>NAME</label>
                                    <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} placeholder='Name' />
                                </Form.Field>
                                <Form.Field>
                                    <label>PRICE</label>
                                    <input value={this.state.price} onChange={(event) => this.setState({ price: event.target.value })} placeholder='Price' />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <ModalActions>
                            <Button secondary onClick={() => this.setState({ createModalOpen: false, name: '', price: '' })}>Cancel</Button>
                            <Button onClick={this.createProduct} icon positive type='submit' labelPosition='right'><Icon name='check' />Create</Button>
                        </ModalActions>
                    </Modal>
                    <table className="ui fixed celled striped table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
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