import React from 'react'
import Head from 'next/head'
import Item from '../components/Item'
import data from '../menu.json'
import Order from '../components/Order';

const Home = () => {
  const ids = []
  data.menu.items.map(item => !item.available ? console.log(item.name) : null)
  const categories = (
    data.menu.categories.map(category => (
      <div key={category.id}>
        <h2>{category.name}</h2>
        {
          data.menu.items.map(item => 
            {
              const itemComp = item.category_id === category.id && item.available
              ? (<Item key={item.id} item={item}/>) 
              : null
              return (
              <div key={item.id} onClick={() => {ids.push(item.id); console.log(ids)}}>
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
      <Order />
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
