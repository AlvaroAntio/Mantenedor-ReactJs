import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import ViewList from './components/ViewList';
import UserForm from './components/UserForm';

class App extends Component {
    state = {
        data : [],
        ruta : 'lista',
    }
    constructor(){
        super()
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(({ data }) => this.setState({ data }))
    }

    seleccionaUsuario = id =>{
        this.setState({
            ruta: 'formulario',
            usuarioSeleccionado: id,
        })
        console.log(id);
    }

    agregarNuevoUsuario = usuario =>{
        axios.post('https://jsonplaceholder.typicode.com/users', usuario)
        .then(({ data }) => {
            const newData = this.state.data.concat(data)
            this.setState({
                data: newData,
                ruta: 'lista'
            })
        })
    }
    actualizarUsuario = (id, values) =>{
        axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,values)
        .then(() => {
            const newData = this.state.data.map(x => x.id === id ? values : x)
            this.setState({
                data: newData,
                ruta: 'lista'
            })
        })
    }
    nuevoUsuario = () =>{
        this.setState ({
            ruta : 'formulario'
        })
    }
    render(){
        console.log(this.state);
        const { ruta, data, usuarioSeleccionado } = this.state;
        const valoresIniciales = usuarioSeleccionado && data.find(x => x.id === usuarioSeleccionado)
        console.log(valoresIniciales)
        return(
            <div className="App">
                {ruta === 'lista' && <ViewList 
                handleClick={this.seleccionaUsuario} 
                data={data} 
                nuevoUsuario={this.nuevoUsuario}/>}
                {ruta === 'formulario' && <UserForm handleUpdate={this.actualizarUsuario} valoresIniciales={valoresIniciales || {}} handleSubmit={this.agregarNuevoUsuario}/>}
            </div>
        );
    }
}
export default App;