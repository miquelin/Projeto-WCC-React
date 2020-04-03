import React, { Component } from 'react';
import axios from 'axios'

const head = {
  Nome: 'Nome',
  Email: 'Email',
  Telefone: 'Telefone',
  Albuns: 'Albuns',
  Photos: 'Photos',
  Posts: 'Posts'
}
const keys = Object.keys(head)
const Head = ({keys}) => {
  return (
    <thead>
      <tr>
        {keys.map(key => <th key={key} align='left'>{key}</th>)}
      </tr>
    </thead>
  )
}

export default class Users extends Component {
  state = {
    users: [],
    url_base: 'https://jsonplaceholder.typicode.com/users/',
    table: []
  }

  componentDidMount = () => {
    var array = []
    this.getUsers()
      .then(retorno => {
        retorno.map(async (item) => (
          item.countAlbums = await this.getCountAlbums(item.id).then(resultado => resultado.length),
          item.countPhotos = await this.getCountPhotos(item.id).then(resultado => resultado.length),
          item.countPosts = await this.getCountPosts(item.id).then(resultado => resultado.length),
          array.push(<tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.countAlbums} </td>
            <td>{item.countPhotos}</td>
            <td>{item.countPosts}</td>
          </tr>),
          this.setState({ table: array })
        ))
      })
  }

  getUsers = async () => {
    const resultado = await axios.get(this.state.url_base);
    return resultado.data;
  }

  getCountAlbums = async (id) => {
    const resultado = await axios.get(this.state.url_base + id + '/albums');
    return resultado.data;
  }

  getCountPosts = async (id) => {
    const resultado = await axios.get(this.state.url_base + id + '/posts');
    return resultado.data;
  }

  getCountPhotos = async (id) => {
    const resultado = await axios.get(this.state.url_base + id + '/photos');
    return resultado.data;
  }

  render() {
    return (
      <table>
        <Head keys={keys} />
        <tbody>
        {this.state.table}
        </tbody>
      </table>
    );
  }
}