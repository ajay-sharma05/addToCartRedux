import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Cardsdata from "./CardsData";
import {useDispatch} from "react-redux"
import "./style.css"
import { Send } from '@mui/icons-material';
import { ADD} from "../redux/actions/action"
const Cards = () => {
  const [data, setdata] = useState(Cardsdata);

const dispatch = useDispatch()


const send = (e) =>{

  dispatch(ADD(e));
}

  return (
<div className="container mt-3 ">
  <h2 className='text-center'>Add to Cart Projects</h2>
  <div className="row d-flex justify-content-center align-content-center">
    {data.map((card) => {
let {id, rname, imgdata, price} = card;
return (
<Card style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style" key={id}>
      <Card.Img variant="top" src={imgdata} alt={rname} style={{height: "16rem", objectFit:"cover",}} className='mt-3' />
      <Card.Body>
        <Card.Title>{rname}</Card.Title>
        <Card.Text>
          Price: ₹ {price} 
        </Card.Text>
        <div className='button_div d-flex justify-content-center'></div>

        <Button variant="primary" className='w-100' onClick={() => send(card)}>Add to Cart</Button>
      </Card.Body>
    </Card>
)
    })}
    
  </div>
</div>
  )
}

export default Cards