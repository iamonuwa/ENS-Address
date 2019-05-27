import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ENS from "ethereum-ens";
import DefaultBlockies from "../Blockies";

export const SingleNameBlockies = styled(DefaultBlockies)`
  margin-right: 10px;
  border-radius: 50%;
  box-shadow: 2px 2px 9px 0 #e1e1e1;
  flex-shrink: 0;
`;

const Blockies = styled(SingleNameBlockies)`
  position: absolute;
  top: 40%;
  left: -10px;
`;

function useDebounce(value, timeout) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(
    function() {
      const timer = setTimeout(function() {
        setDebounceValue(value);
      }, timeout);

      return function() {
        clearTimeout(timer);
      };
    },
    [value]
  );
  return debounceValue;
}

async function resolveENSName(value, provider) {
  const ethereumRegEx = /^0x[a-fA-F0-9]{40}$/;
  const ens = new ENS(provider);
  if (ethereumRegEx.test(value)) {
    return await ens
      .reverse(value)
      .name()
      .then(async result => {
        const address = await ens.resolver(result).addr();
        if (value !== address) {
          return {
            type: "error",
            data: ""
          };
        } else {
          return {
            type: "success",
            data: {
              resolved: result,
              address: address
            }
          };
        }
      })
      .catch(err => {
        return {
          type: "error",
          data: ""
        };
      });
  } else {
    if (value.includes(".")) {
      return ens
        .resolver(value)
        .addr()
        .then(response => {
          return {
            type: "success",
            data: {
              resolved: response,
              address: response
            }
          };
        })
        .catch(err => {
          return {
            type: "error",
            data: err.toString()
          };
        });
    }
    return false;
  }
}

function Address({ className, provider, onComplete, placeholder }) {
  const { AutoComplete } = className;
  const [value, setValue] = useState(null);
  const [resolvedAddress, setResolvedAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const debounceSearchTerm = useDebounce(value, 300);

  useEffect(
    function() {
      if (debounceSearchTerm) {
        setIsSearching(true);

        resolveENSName(debounceSearchTerm, provider).then(response => {
          setIsSearching(false);
          if (response.type === "success") {
            setResolvedAddress(response.data);
            setErrorMessage(null);
          } else {
            setResolvedAddress(null);
            setErrorMessage(response.data);
          }
        });
      } else {
        setIsSearching(false);
      }
    },
    [debounceSearchTerm]
  );
  return (
    <AutoComplete>
      <input
        type="text"
        value={value ? value : ""}
        onChange={e => setValue(e.target.value)}
        onComplete={onComplete(resolvedAddress || errorMessage)}
        placeholder={placeholder}
      />
      {!isSearching && resolvedAddress && (
        <div>
          {resolvedAddress.address && (
            <Blockies address={resolvedAddress.address} imageSize={40} />
          )}
          <span className="address">{resolvedAddress.resolved}</span>
        </div>
      )}
      {isSearching && <span className="searching">Searching...</span>}
      {!isSearching && errorMessage && (
        <span className="error">{errorMessage}</span>
      )}
    </AutoComplete>
  );
}

Address.propTypes = {
  className: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

Address.defaultProps = {
  placeholder: "Enter Address or ENS Name"
};

export default Address;
