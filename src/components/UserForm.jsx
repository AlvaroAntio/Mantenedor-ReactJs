import React, { Component } from 'react'

export default class UserForm extends Component{
    state = {}
    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        })
    }
    handleSubmit = () =>{

    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input name="name" onChange={this.handleChange} placeholder="name"/>
                <input name="email" onChange={this.handleChange} placeholder="email"/>
                <input name="website" onChange={this.handleChange} placeholder="website" />
                <input type="submit" value="Enviar" />
            </form>
        )
    }
}