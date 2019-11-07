import React, { useState } from 'react'
import Head from 'next/head'
import Item from '../components/Item'
import data from '../menu.json'
import people from '../people.json'
import Order from '../components/Order';
import * as firebase from 'firebase/app'
import values from 'lodash/values'
import flatten from 'lodash/flatten'
import groupBy from 'lodash/groupBy'
import 'firebase/database'

const Home = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBeM7BksShySGf6rDg2e8AMUILcTUeJvnY",
    authDomain: "lunchtos.firebaseapp.com",
    databaseURL: "https://lunchtos.firebaseio.com",
    projectId: "lunchtos",
    storageBucket: "lunchtos.appspot.com",
    messagingSenderId: "127241441040",
    appId: "1:127241441040:web:cfbdd4af5043b564d91f95"
  }
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.database().ref('orders')
  let [order, setOrder] = useState([])
  let [name, setName] = useState()
  let [complete, setComplete] = useState(false)
  db.on('value', (snap) => {
    const raw = values(snap.toJSON())
    const items = raw.map(request => values(request.order).map(order => ({id: order.id, name: order.name})))
    const sorted = groupBy(flatten(items), 'name')
    values(sorted).map(i => console.log(i[0].name, i.length))
    const numberOfOrders = raw.length
    console.log('Number of orders: ', numberOfOrders)
  })
  const saveOrder = () => {
    const finalOrder = {
      name: name,
      order: order.map(ord => ({id: ord.id, name: ord.name}))
    }
    db.push(finalOrder)
    setComplete(true)
  }
  const handleChange = (e) => {
    const {value} = e.target
    setName(value)
  }
  const toggleItem = (item) => {
    if(order.some(i => i.id === item.id)) {
      setOrder(order.filter(i => i.id !== item.id))
    } else {
      setOrder([...order, {id: item.id, name: item.name}])
    }
  }
  // data.menu.items.map(item => !item.available ? console.log(item.name) : null)
  const categories = (
    data.menu.categories.map(category => (
      <div key={category.id}>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        {
          data.menu.items.map(item => 
            {
              const itemComp = item.category_id === category.id && item.available && item.raw_price < 10
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
        <h4>Lunchtos <span className="badge secondary">0.2</span></h4>
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
          {order.map(item => <p className="modal-text" key={item.id}>{item.name}</p>)}
          <div className="form-group">
            <label htmlFor="paperSelects1">Select your name</label>
            <select id="paperSelects1" onChange={handleChange}>
              {people.map(ppl => <option key={ppl} value={ppl}>{ppl}</option>)}
            </select>
            <button onClick={() => saveOrder()} disabled={complete}>Send order</button>
            {complete ? <img src="/static/success.gif" /> : null}
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
