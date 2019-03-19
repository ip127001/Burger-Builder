import React, { Component } from 'react';

import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredient: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: 'rohit kumawat',
                address: {
                    zipCode: '302017',
                    street: 'Malviya nagar',
                    country: 'India'
                },
                email: 'geekrk.01@gmail.com'
            },
            delivery: 'fastest',
            payment: 'cash'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => this.setState({loading: false}));
    }
    render() {
        let form = (
            <form>
                <input type="text" name="name" className={classes.Input} placeholder="Your Name" />
                <input type="email" name="email" className={classes.Input} placeholder="Your Mail" />
                <input type="text" name="street" className={classes.Input} placeholder="Street" />
                <input type="text" name="postal" className={classes.Input} placeholder="Postal" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;