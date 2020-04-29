import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import ManageBook from '../manageBook'
import bookList from '../bookList'
import { Layout, Menu } from 'antd';
import './app.css'
const { Header, Footer  } = Layout;

const Active = () => {
  const path = window.location.pathname
  let setActive
  switch(path) {
    case '/':
      setActive = '1'
    break;
    case '/about-us':
      setActive = '2'
    break;
    case '/book-read':
      setActive = '3'
    break;
    case '/manage-read':
      setActive = '3'
    break;
    default:
      setActive = null
  }
  return setActive
}

const App = () => (
  <div className='layoutFlex'>
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[Active()]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/about-us">About Us</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/book-read">Manage Book</Link></Menu.Item>
 
      </Menu>
    </Header>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/book-read" component={bookList} />
      <Route exact path="/manage-read" component={ManageBook} />
    </main>
    <Footer style={{ textAlign: 'center' }}>
      Interview ©2018 Created by Promphat
    </Footer>
  </div>
)

export default App
