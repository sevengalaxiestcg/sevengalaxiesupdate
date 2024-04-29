import React from 'react';



function AvisoCompra(props) {

  const aviso = props.countCompra;

  return (
    aviso > 0
      ?
      <div className="compra-aviso">
        <div className="compra-linha" />
          Compre {aviso} card{aviso > 1 && 's'}!
        <div className="compra-linha" />
      </div>
      :
      <div className="compra-divisa">
        <div className="compra-linha" />
      </div>
  )

}

export default AvisoCompra;