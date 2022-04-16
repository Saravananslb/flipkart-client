import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Context } from "../../Context";
import "./SignInUp.css";
import { SIGNIN_UP } from "../../actions/ActionType";
import { signInUser, signUpUser, cookie } from "../../apiCall";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const CLOSE = require("../../assets/xmark-solid.svg");

export const SignInUp = () => {
  const [SiginInUp, setSiginInUp] = React.useState({
    siginInUp: "LOGIN",
    mobile: "",
    password: "",
  });

  const { state, dispatch } = React.useContext(Context);

  React.useEffect(() => {
    setSiginInUp({ ...SiginInUp, siginInUp: state.signInUpAction });
  }, [state.signInUpEnabled, state.signInUpAction]);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch({
      type: SIGNIN_UP,
      payload: {
        signInUpEnabled: open,
      },
    });
  };

  const handleSignInUp = (e) => {
    e.preventDefault();
    if (SiginInUp.siginInUp === "LOGIN") {
      signInUser(SiginInUp).then((res) => {
        if (res && res.data) {
          if (res.data.status) {
            cookie.set("Authorization", res.data.authToken);
            cookie.set("userId", res.data.id);
            cookie.set("mobile", res.data.mobile);
            dispatch({
              type: SIGNIN_UP,
              payload: {
                signInUpEnabled: false,
              },
            });
          }
        }
      });
    } else if (SiginInUp.siginInUp === "SIGNUP") {
      signUpUser(SiginInUp).then((res) => {
        if (res && res.data) {
          if (res.data.status) {
            setSiginInUp({ ...SiginInUp, siginInUp: "LOGIN" });
          }
        }
      });
    }
  };

  return (
    <div>
      <Modal
        open={state.signInUpEnabled}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        classes={""}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ position: "relative", top: "100px" }}>
          <div style={{ width: "700px", marginLeft: "20%" }}>
            
            <div className="container" >
              <div className="row" style={{height: '400px'}}>
                <div className="col-5 signin-left">
                  <div
                    className="row"
                    style={{ fontSize: "28px", fontWeight: "500" }}
                  >
                    {SiginInUp.siginInUp === 'LOGIN' ? 'LOGIN' : "Looks like you're new here!"}
                  </div>
                  <div className="row">
                  {SiginInUp.siginInUp === 'LOGIN' ? "Get access to your Orders, Wishlist and Recommendations" : "Sign up with your mobile number to get started"}
                  </div>
                  <div className="row">
                    <img
                      src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-7 signin-right">
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "40ch" },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSignInUp}
                  >
                    <div className="row" style={{marginTop: '20px'}}></div>
                    <div className="row">
                      <TextField
                        id="standard-basic"
                        label={SiginInUp.siginInUp === 'LOGIN' ? "Enter Mobile Number" : "Mobile Number"}
                        value={SiginInUp.mobile}
                        onChange={(e) =>
                          setSiginInUp({ ...SiginInUp, mobile: e.target.value })
                        }
                        variant="standard"
                      />
                      
                    </div>
                    <div className="row">
                      <TextField
                        id="standard-basic2"
                        label={SiginInUp.siginInUp === 'LOGIN' ? "Enter Password" : "Set Password"}
                        variant="standard"
                        type={"password"}
                        value={SiginInUp.password}
                        onChange={(e) =>
                          setSiginInUp({
                            ...SiginInUp,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="row" style={{color: '#878787', fontSize: '12px'}}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</div>
                    <div style={{ paddingTop: "10px" }}>
                      <button
                        style={{
                          padding: "10px",
                          width: "96%",
                          color: "#ffffff",
                          backgroundColor: "#fc8019",
                          textTransform: "uppercase",
                        }}
                        onClick={handleSignInUp}
                      >
                        {SiginInUp.siginInUp === 'LOGIN' ? 'Login' : 'Register'}
                      </button>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                      <button
                        style={{
                          padding: "10px",
                          width: "96%",
                        }}
                        className="existing-user"
                        onClick={(e) => {
                          e.preventDefault();
                          setSiginInUp({...SiginInUp, siginInUp: SiginInUp.siginInUp === 'LOGIN' ? 'SIGNUP' : 'LOGIN'});
                        }}
                      >
                        {SiginInUp.siginInUp === 'LOGIN' ? 'New to Flipkart? Create an account' : 'Existing User? Log in'}
                      </button>
                    </div>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
