import React from "react";
import { Context } from "../../Context";
import { SIGNIN_UP } from "../../actions/ActionType";

export const NoCart = () => {
  const { state, dispatch } = React.useContext(Context);
  return (
    <>
      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row">
          <div className="col-3">
            <h2>My Cart</h2>
          </div>
          <div className="col-6" style={{textAlign: 'center'}}>
            <img
              src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
              alt=""
              width={500}
              height={400}
            />
            <h2>Missing Cart items?</h2>
            <div>Login to see the items you added previously</div>
            <div style={{ paddingTop: "10px" }}>
              <button
                style={{
                  padding: "10px",
                  width: "46%",
                  color: "#ffffff",
                  backgroundColor: "#fc8019",
                  textTransform: "uppercase",
                }}
                onClick={() =>
                  dispatch({
                    type: SIGNIN_UP,
                    payload: {
                      signInUpEnabled: true,
                    },
                  })
                }
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
