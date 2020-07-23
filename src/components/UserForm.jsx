import React, { Component } from 'react'

const validate = values =>{
    const errors = {}
    if(!values.name){
        errors.name = 'Este campo es obligatorio';
    }
    if(!values.email){
        errors.email = 'Este campo es obligatorio';
    }
    if(!values.website){
        errors.website = 'Este campo es obligatorio';
    }
    return errors;
}

export default class UserForm extends Component{
    state = {
        errors: {}
    }
    constructor(props){
        super(props)
        this.state = {
            ...this.state,
            ...props.valoresIniciales,
        }
    }
    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        })
    }
    handleSubmit = e =>{
        e.preventDefault();
        const { errors, ...sinErrors } = this.state
        const result = validate(sinErrors);
        if(!Object.keys(result).length){
            //Enviar Form
            const { handleSubmit, valoresIniciales, handleUpdate } = this.props
            if (valoresIniciales.id){
                handleUpdate(valoresIniciales.id, sinErrors)
            }else{
                handleSubmit(sinErrors)
            }
        }else{
            this.setState({ errors : result})
        }
    }
    render() {
        const { errors } = this.state;
        const { valoresIniciales } = this.props
        return(
            <form onSubmit={this.handleSubmit}>
                <input name="name" defaultValue={valoresIniciales.name} onChange={this.handleChange} placeholder="name"/>
                {errors.name && <p>{errors.name}</p>}
                <input name="email" defaultValue={valoresIniciales.email} onChange={this.handleChange} placeholder="email"/>
                {errors.email && <p>{errors.email}</p>}
                <input name="website" defaultValue={valoresIniciales.website} onChange={this.handleChange} placeholder="website" />
                {errors.website && <p>{errors.website}</p>}
                <input type="submit" value="Enviar" />
            </form>
        )
    }
}