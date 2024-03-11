import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Menu from "@mui/material/Menu";

// import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { DELETE } from "../redux/actions/action";

const Header = () => {
  const getData = useSelector((state) => state.cartReducer.carts);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const deleteItem = (id) => {
    dispatch(DELETE(id));
  };

  const total = () => {
    let price = 0;

    getData.map((ele, k) => {
      price = ele.price * ele.qnty + price;
      return price;
    });
    setPrice(price);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    total();
  }, [total]);

  return (
    <>
      <Navbar bg="dark" className="py-4" data-bs-theme="dark">
        <Container>
          <NavLink
            to="/"
            className="text-decoration-none text-light mx-3 text-uppercase border border-success py-1 px-3"
          >
            Add To Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getData.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getData.length > 0 ? (
            <div
              className="card_details"
              style={{ width: "20rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurent Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((data, i) => {
                    return (
                      <Fragment key={i}>
                        <tr>
                          <td>
                            <NavLink
                              to={`/cart/${data.id}`}
                              onClick={handleClose}
                            >
                              <img
                                src={data.imgdata}
                                style={{ height: "5rem", width: "5rem" }}
                                alt={data.rname}
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{data.rname}</p>
                            <p>Price: ₹ {data.price}</p>
                            <p>Quantity: {data.qnty}</p>
                            <p>
                              <i
                                className="fas fa-trash smalltrash"
                                onClick={() => deleteItem(data.id)}
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                              ></i>
                            </p>
                          </td>
                          <td className="mt-5">
                            <i
                              className="fas fa-trash largetrash"
                              onClick={() => deleteItem(data.id)}
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                            ></i>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
                <tfoot className="text-center">
                  <tr>
                    <td>
                      <strong>Total : ₹ {price}</strong>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-content-center"
              style={{ width: "20rem", padding: 10, position: "relative" }}
            >
              <i
                className="fas fa-close smallclose"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: 22 }}>Your Cart is Empty.</p>
              <img
                src="cart.gif"
                alt="cart img"
                className="emptycart_img"
                style={{ width: "5rem", padding: 10 }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
