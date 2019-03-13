import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background: rgb(250, 250, 250);
    color: #1A1A1A;
  }

  ul, ol {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Dosis', sans-serif;
    margin: 0;
  }

  button, input[type=submit] {
    position: relative;
    padding: 12px 24px;
    overflow: hidden;
    border-width: 0;
    outline: none;
    border-radius: 2px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
    font-size: 14px;
    text-transform: uppercase;
    height: 40px;
    width: 100%;
    background: #1a1a1a;
    color: rgb(250, 250, 250);
    transition: background-color .3s;
    :hover, :focus {
      background-color: #FF328B;
    }
    > * {
      position: relative;
    }
    span {
      display: block;
      padding: 12px 24px;
    }
    :before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 0;
      padding-top: 0;
      border-radius: 100%;
      background-color: rgba(236, 240, 241, .3);
      transform: translate(-50%, -50%);
    }
    :active:before {
      width: 120%;
      padding-top: 120%;
      transition: width .2s ease-out, padding-top .2s ease-out;
    }
  }

  textarea:focus, input:focus{
    outline: none;
  }

  .form__group {
  position: relative;
  padding: 15px 0 0;
}

.form__field {
  margin-bottom: 20px;
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #d2d2d2;
  outline: 0;
  font-size: 16px;
  color: #212121;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 16px;
  cursor: text;
  top: 20px;
}

label,
.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 12px;
  color: #9b9b9b;
}

.form__field:focus ~ .form__label {
  color: #FF328B;
}

.form__field:focus {
  padding-bottom: 6px;
  border-bottom: 2px solid #FF328B;
}
`
