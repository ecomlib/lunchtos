import { useState } from "react";

const Item = (props: any) => {
  const { name, price, description, image } = props.item
  let image225 = ''
  if(image) {
    image225 = image.replace(/{w}/, '225')
    image225 = image225.replace(/{h}/, '225')
  }
  const [selected, setSelected] = useState(false)
  return (
    <div onClick={() => setSelected(!selected)}>
      <div className={selected ? 'card background-success' : 'card'}>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <h5 className="card-subtitle">{price}</h5>
          <p className="card-text">{description}</p>
        </div>
        {image && <img className="image-bottom" src={'https:' + image225} alt="Yummy!" />}
      </div>
      <style global jsx>{`
        .card {
          flex-direction: row;
          min-width: 100%;
          heigth: 225px;
          margin-bottom: 30px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default Item