import React from 'react'
import Head from 'next/head'
import Menu from '../components/Menu'

const Home = () => {
  return (
    <div className='main'>
      <Head>
        <title>Artos REPL</title>
        <meta name="description" content="" />
        <link rel="canonical" href="https://repl-signing.pierreferay-ferrand.now.sh/" />
        <link rel="stylesheet" href="/static/paper.min.css"/>
      </Head>
      <div className='header'>
        <h4>Lunchtos <span className="badge secondary">0.1</span></h4>
      </div>
      <div className='hero'>
        <h2>Lunchtos</h2>
        <Menu />
      </div>
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
