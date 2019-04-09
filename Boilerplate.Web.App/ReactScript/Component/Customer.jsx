import React from 'react';
import { Button, Form, Modal, Icon, ModalActions, Pagination } from 'semantic-ui-react'

export default class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            appData: [],
            name: '',
            address: '',
            id: 0,
            createModalOpen: false,
            deleteModalOpen: false,
            editModalOpen: false
        };
    }

    componentDidMount() {
        this.loadData();

    }

    createCustomer = () => {
        fetch("/Customer/CreateCustomer", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: this.state.name,
                Address: this.state.address
            })
        })
            .then(res => {
                if (res.ok) {
                    this.setState({ createModalOpen: false, name: '', address: '' });
                    this.loadData();
                    console.log(res);
                } else {
                    alert("ALERT!!!\n\nPlease check fields and try again\n\n\n\nName field: Max number of characters is 50\n\Address field: Max number of characters is 250 ")
                }
            }).catch(err => err);
    }

    editCustomer = (id) => {
        fetch("/Customer/EditCustomer/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: this.state.name,
                Address: this.state.address
            })
        }).then((res) => {
            if (res.ok) {
                this.setState({ createModalOpen: false, name: '', address: '' });
                this.loadData();
                console.log(res);
            } else {
                alert("ALERT!!!\n\nPlease check fields and try again\n\n\n\nName field: Max number of characters is 50\n\Address field: Max number of characters is 250 ")
            }
        }).catch(err => err);
    }


    loadData = () => {
        fetch("/Customer/CustomerList")
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

    deleteCustomer = (id) => {
        fetch("/Customer/DeleteCustomer/" + id, {
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
                    <td>{service.address}</td>
                    <td>
                        {/*Edit Modal*/}
                        <Modal open={this.state.editModalOpen} size={'tiny'} trigger={<Button icon color='yellow' labelPosition='left' onClick={() => this.setState({ editModalOpen: true, name: service.name, address: service.address })}><Icon name='edit' />EDIT</Button>}>
                            <Modal.Header>Edit customer</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <label>NAME</label>
                                        <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} placeholder='Name' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>ADDRESS</label>
                                        <input value={this.state.address} onChange={(event) => this.setState({ address: event.target.value })} placeholder='Address' />
                                    </Form.Field>
                                </Form>
                            </Modal.Content>
                            <ModalActions>
                                <Button secondary onClick={() => this.setState({ editModalOpen: false, name: '', address: '' })}>Cancel</Button>
                                <Button onClick={() => { this.editCustomer(service.id) }} icon positive type='submit' labelPosition='right'><Icon name='check' />Edit</Button>
                            </ModalActions>
                        </Modal>
                    </td>

                    <td>
                        {/*Delete Modal*/}
                        <Modal open={this.state.deleteModalOpen} trigger={<Button icon color='red' labelPosition='left' onClick={() => this.setState({ deleteModalOpen: true })}> <Icon name='trash' />DELETE</Button>}>
                            <Modal.Header>Delete customer</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <h4>Are you sure?</h4>
                                    </Form.Field>
                                </Form>
                            </Modal.Content>
                            <ModalActions>
                                <Button secondary onClick={() => this.setState({ deleteModalOpen: false })}>Cancel</Button>
                                <Button icon onClick={(id) => this.deleteCustomer(service.id)} color='red' labelPosition='right' type='submit'><Icon name='cancel' />Delete</Button>
                            </ModalActions>
                        </Modal>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    {/*New customer Modal*/}
                    <Modal open={this.state.createModalOpen} size={'tiny'} trigger={<Button primary onClick={() => this.setState({ createModalOpen: true })}>New Customer</Button>}>
                        <Modal.Header>Create customer</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <label>NAME</label>
                                    <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} placeholder='Name' />
                                </Form.Field>
                                <Form.Field>
                                    <label>ADDRESS</label>
                                    <input value={this.state.address} onChange={(event) => this.setState({ address: event.target.value })} placeholder='Address' />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <ModalActions>
                            <Button secondary onClick={() => this.setState({ createModalOpen: false, name: '', address: '' })}>Cancel</Button>
                            <Button onClick={this.createCustomer} icon positive type='submit' labelPosition='right'><Icon name='check' />Create</Button>
                        </ModalActions>
                    </Modal>
                    <table className="ui fixed celled striped table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
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