import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { ADD, DELETE, REMOVE } from "../redux/actions/action";

const CardDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useSelector((state) => state.cartReducer.carts);

  const increase = (e) => {
   
    dispatch(ADD(e));
  };

  const decrease = (e) =>{
dispatch(REMOVE(e))

  }
  const deleteItem = (id) => {
    dispatch(DELETE(id));

    navigate("/");
  };

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id == id;
    });

    setData(compareData);
  };

  useEffect(() => {
    compare();
  }, [id]);

  // console.log(data);
  return (
    <div className="container">
      <h2 className="text-center mt-2">Items Details Page</h2>
      <section className="container mt-3">
        {data.map((item, i) => {
          return (
            <div className="iteamsdetails" key={i}>
              <div className="items_img">
                <img src={item.imgdata} alt="" />
              </div>
              <div className="details">
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          <strong>Restrorent</strong>: {item.rname}
                        </p>
                        <p>
                          <strong>Price</strong>: ₹ {item.price}
                        </p>
                        <p>
                          <strong>Dishes</strong>: {item.address}
                        </p>
                        <p>
                          <strong>Total</strong>: ₹ {item.price * item.qnty}
                        </p>

                        <div
                          className="mt-5 d-flex justify-content-around align-items-center"
                          style={{
                            background: "#999",
                            color: "#111",
                            gap: "1rem",
                          }}
                        >
                          <span style={{ cursor: "pointer", fontSize: "24px" }} onClick={()=>{item.qnty <= 1 ? deleteItem(item.id) : decrease(item)}}>
                            -
                          </span>
                          <span style={{ fontSize: "20px" }}>{item.qnty}</span>
                          <span
                            style={{ cursor: "pointer", fontSize: "24px" }}
                            onClick={() => increase(item)}
                          >
                            +
                          </span>
                        </div>
                      </td>

                      <td>
                        <p>
                          <strong>Rating</strong>:{" "}
                          <span
                            style={{
                              backgroundColor: "green",
                              color: "#fff",
                              padding: "2px 5px",
                              borderRadius: "2px",
                            }}
                          >
                            {item.rating} <i className="fa-solid fa-star"></i>
                          </span>
                        </p>
                        <p>
                          <strong>Order Review</strong>:{" "}
                          <span>{item.somedata}</span>
                        </p>
                        <p>
                          <strong>Remove</strong>:{" "}
                          <span
                            onClick={() => deleteItem(item.id)}
                            style={{
                              color: "red",
                              padding: "2px 5px",
                              borderRadius: "2px",
                              fontSize: 24,
                              cursor: "pointer",
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default CardDetails;
