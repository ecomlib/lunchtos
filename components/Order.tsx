const Order = (props: any) => {
  const { order } = props
  console.log(order)
  const list = order.map(item =>
    {
      return (
        <h5 key={item.id} className="card-subtitle">{item.name}</h5>
      )
    }
  )
  return (
    <div className="card" style={{
        position:  'fixed',
        bottom: 0,
        right: 30,
        width: '20%',
        minWidth: '20%',
      }}>
      <div className="card-body">
        <h4 className="card-title">Order:</h4>
        {list}
        <div className="row flex-spaces child-borders">
          <label className="paper-btn btn-success" htmlFor="modal-1" style={{alignSelf: 'flex-end'}}>Validate</label>
        </div>
      </div>
    </div>
  )
}

export default Order