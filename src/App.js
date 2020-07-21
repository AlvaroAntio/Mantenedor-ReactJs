import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import ViewList from './components/ViewList';
import UserForm from './components/UserForm';

class App extends Component {
    state = {
        data : [],
        ruta : 'formulario',
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
    nuevoUsuario = () =>{
        this.setState ({
            ruta : 'formulario'
        })
    }
    render(){
        console.log(this.state);
        const { ruta, data } = this.state;
        return(
            <div className="App">
                {ruta === 'lista' && <ViewList 
                handleClick={this.seleccionaUsuario} 
                data={data} 
                nuevoUsuario={this.nuevoUsuario}/>}
                {ruta === 'formulario' && <UserForm />}
            </div>
        );
    }
}
export default App;