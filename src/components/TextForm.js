import React, {useState} from "react";
import PropTypes from 'prop-types'


export default function TextForm(props) {
  
    const handleUpClick = ()=>{
        
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Uppercase", "success");
    }
    const handleLowClick = ()=>{
       
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lowercase", "success");
        }
        
    const handleTitleClick = ()=>{
       
        let newText = text.split(" ").map((element)=>{
          return element.charAt(0).toUpperCase()+element.substr(1).toLowerCase();
        })
        setText(newText.join(' '));
        props.showAlert("Converted to Title Case", "success");
      
    }
    const handleCopy = ()=>{
        
          navigator.clipboard.writeText(text);
          props.showAlert("Copied to Clickboard", "success");
     
    }
    const handleRemove =()=>{
      let newText = text.split(/[  ]+/);
      setText(newText.join(' '));
      props.showAlert("Extra Spaces removed", "success");
    }
    const handleClear = ()=>{
      
        setText('');
        props.showAlert("Text Area Cleared", "success");
    }
    const handleOnChange = (event)=>{
      
        setText(event.target.value);
    }
    
  const [text, setText] = useState("");
  return (
      <>
    <div className="container" style={{color: props.mode==='light'?'black':'white'}}>
    <h1 className="mb-2">{props.heading} </h1>
      <div className="mb-3">
        <textarea style={{backgroundColor: props.mode==='light'?'white':'rgb(36,74,104)' ,
        color: props.mode==='light'?'black':'white'}}
          className="form-control"
          value = {text}
          onChange = {handleOnChange}
          id="myBox"
          rows="8"
        ></textarea>
      </div>
    <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert to Uppercase</button>
    <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleLowClick}>Convert to Lowercase</button>
    <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleTitleClick}>Convert to Title Case</button>
    <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleRemove}>Remove extra spaces</button>
    <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
    <button disabled={text.length===0} className="btn btn-danger mx-2 my-2" onClick={handleClear}>Clear text</button>
    </div>
    <div className="container my-3 " style={{color: props.mode==='light'?'black':'white'}}>
        <h2>Your text Summary</h2>
        <p><b>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length}</b> words and <b>{text.length}</b> characters</p>
        <p>Avg. time to read this much: <b>{0.008 * (text.split(/\s+/).filter((element)=>{return element.length!==0}).length)}</b> minutes</p>
    </div>
    </>
  );
}

TextForm.propTypes ={
    heading: PropTypes.string.isRequired
}

TextForm.defaultProps = {
    heading: "Enter your text"
}