import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background: rgb(250, 250, 250);
    color: #1a1a1a;
    touch-action: manipulation;
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
    font-size: 16px;
    text-transform: uppercase;
    height: 40px;
    width: 100%;
    background: #1a1a1a;
    color: rgb(250, 250, 250);
    transition: background-color .3s;
    :hover, :focus {
      background-color: #FF328B;
      outline: 0;
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

label .input				 {
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
}

input:focus ~ label, input:valid ~ label 		{
  top:-20px;
  font-size:14px;
  color:#9E9E9E;
}

.bar 	{ position:relative; display:block; width:100%; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom: 0px;
  position:absolute;
  background:#FF328B; 
  transition:0.2s ease all; 
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

textarea:focus ~ .bar:before, textarea:focus ~ .bar:after {
  width:50%;
}

.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
}

input:focus ~ .highlight {
  animation:inputHighlighter 0.3s ease;
}

@keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
`
