import React from "react";
import { render } from "react-dom";
import Web3 from "web3";
import styled from "@emotion/styled";
import Address from "../../src/components/Address";
import "./style.css";

const AutoComplete = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: relative;
  z-index: 10000;
  height: 90px;
  input {
    padding: 20px 0 0 40px;
    width: 100%;
    border: none;
    border-radius: 0;
    font-size: 18px;
    font-family: Overpass;
    font-weight: 100;

    &:focus {
      outline: 0;
    }

    &::-webkit-input-placeholder {
      color: #ccd4da;
    }
  }

  .address,
  .searching {
    font-size: 18px;
    padding: 0 0 0 40px;
    font-family: Overpass;
    font-weight: 100;
  }
  .error {
    color: #cc0000;
    font-size: 18px;
    padding: 0 0 0 40px;
    font-family: Overpass;
    font-weight: 100;
  }
`;

const ClassName = {
  AutoComplete
};

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546", null, {});
const onComplete = data => {
  console.log("Response ", data);
};
const Demo = () => (
  <div className="container">
    <Address
      className={ClassName}
      provider={web3.givenProvider}
      onComplete={response => onComplete(response)}
      placeholder="Enter Address or ENS Name"
    />
  </div>
);

render(<Demo />, document.querySelector("#demo"));
