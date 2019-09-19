import React, { useState } from 'react'
import Head from 'next/head'
import Item from '../components/Item'
import data from '../menu.json'
import Order from '../components/Order';

const Home = () => {
  let [order, setOrder] = useState([])
  const toggleItem = (item) => {
    if(order.some(i => i.id === item.id)) {
      setOrder(order.filter(i => i.id !== item.id))
    } else {
      setOrder([...order, {id: item.id, name: item.name}])
    }
  }
  data.menu.items.map(item => !item.available ? console.log(item.name) : null)
  const categories = (
    data.menu.categories.map(category => (
      <div key={category.id}>
        <h3>{category.name}</h3>
        {
          data.menu.items.map(item => 
            {
              const itemComp = item.category_id === category.id && item.available
              ? (<Item key={item.id} item={item}/>) 
              : null
              return (
              <div key={item.id} onClick={() => {toggleItem(item)}}>
                {itemComp}
              </div>
            )}
        )}
      </div>
    ))
  )
  return (
    <div className='main'>
      <Head>
        <title>Lunchtos</title>
        <link rel="stylesheet" href="/static/paper.min.css"/>
      </Head>
      <div className='header'>
        <h4>Lunchtos <span className="badge secondary">0.1</span></h4>
      </div>
      <div className='hero'>
        <h2>Restaurant : { data.restaurant.name }</h2>
        <div className='menu'>
          {categories}
        </div>
      </div>
      {order.length > 0 && <Order order={order} />}
      {/* modal start */}
      <input className="modal-state" id="modal-1" type="checkbox" />
      <div className="modal">
        <label className="modal-bg" htmlFor="modal-1"></label>
        <div className="modal-body">
          <label className="btn-close" htmlFor="modal-1">X</label>
          <h4 className="modal-title">Finalizing order</h4>
          <h5 className="modal-subtitle">Please double check your order and pick your name</h5>
          {order.map(item => <p className="modal-text">{item.name}</p>)}
          <div className="form-group">
            <label htmlFor="paperSelects1">Select</label>
            <select id="paperSelects1">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
        </div>
      </div>
      {/* modal end */}
      <style global jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          margin: 1em 2em;
        }
        .footer {
          margin: 1em 0;
          max-width: 20em;
        }
        .hero {
          margin: 0 auto;
          max-width: 42em;
          line-height: 1.5;
          padding: 0 1em;
          color: #555;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }
        .menu {
          display: flex;
          width: 90%;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }
        h2 {
          font-size: 3em;
          margin: 0;
        }
        h3 {
          margin-top: 0;
        }
      `}</style>
    </div>
  )
}

export default Home
