const Menu = (props: any) => {
  console.log(props)
  const { name, price, description, image } = props.item
  return (
    <div>
      <div className="card" style={{width: '20rem'}}>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <h5 className="card-subtitle">{price}</h5>
          <p className="card-text">{description}</p>
        </div>
        <img className="image-bottom" src={'https:' + image} alt="Yummy!" />
      </div>
    </div>
  )
}

export default Menu