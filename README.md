# ens-address

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe ens-address here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

## Using the Address component

You can basically call it from any component as stand-alone on any app.

```js
import styled from '@emotion/styled'


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
`

const className = {
  AutoComplete,
}

<Address
  className={className}
  provider={web3.givenProvider}
  placeholder="Search with ETH Address and ENS Names"
  onComplete={msg => YourMethodHandler(msg)}/>

```

### Props definition

| Props       | Definition                                                                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provider    | The provider is a web3 provider that is passed down to the Address component to use to resolve the inputs provided.                                       |
| ClassName   | ClassName is used to pass styles down to the component from the parent component.                                                                         |
| Placeholder | Placeholder is optional. If it is not provided, don't worry there is a default placeholder title.                                                         |
| onComplete  | The onComplete props is passed down to the Address Component so that the address component can send message back to the parent component as events happen |

You can rewrite the css to suite your UI.
I highly recommend using styled-components so that you can have the elements named same as what we have here.

