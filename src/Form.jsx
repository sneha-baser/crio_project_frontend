import React, { useState , useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './Form.css'
import axios from 'axios';
import Edit from './Edit';
//Form Component
function Form() {
  
  //useState to set Input
  const [inps,newinp]=useState({
    memeowner : "",
    memecaption : "",
    memeurl : "",
  });
  const [meme,setMeme]=useState([]);
  //useEffect to render changes automatically
  useEffect(()=>{
    getMeme();
  } );
  //function call when any changes on input field
  const inputEvent = (event)=>{
    const value=event.target.value;
    const name=event.target.name;
    newinp((prevValue)=>{
      return{
        ...prevValue,
        [name]:value,
      };
    });
  }
  //fuction called to get all memes
  const getMeme = ()=>{  
   axios.get('http://localhost:3001/memes').then((res)=>{
     setMeme(res);

   }).catch((err)=>{
      console.log(err);
    })
 }
 
  //function called when submit button of form is clicked
  const submitbtn=  (event) =>{
    event.preventDefault();
    const memeobject = {
      name : inps.memeowner,
      url : inps.memeurl,
      caption : inps.memecaption  
    }
    //Post method
    axios.post('http://localhost:3001/memes',memeobject)
    .then((res)=>{
      console.log(res.data);
    }).catch(err => { if(err.request){ console.log(err.request) } if(err.response){ console.log(err.response) } });
    inps.memeowner="";
    inps.memeurl="";
    inps.memecaption="";
  }
  return (
    <>
    <div className="container">
    <h2>Meme Stream</h2>
    <form>
  <div className="form-group">
    <label for="exampleName">Meme Owner</label>
    <input type="text"
     name="memeowner"
    value={inps.memeowner}
     class="form-control" 
     id="exampleName" 
      placeholder="Enter your full name" onChange={inputEvent}/>
  </div>
  <div className="form-group">
    <label for="exampleCaption">Caption</label>
    <input type="text"
    name="memecaption"
    value={inps.memecaption}
     class="form-control"
      id="exampleCaption"
       placeholder="Be creative with the caption" onChange={inputEvent}/>
  </div>

      <label for="memeurl">Meme URL</label>
      <div className="buttonIn">
      <input type="url"
      name="memeurl"
      value={inps.memeurl}
       class="form-control" 
       id="memeurl" 
       placeholder="Enter url of meme here"   onChange={inputEvent} required="true"/>
      <button onClick={submitbtn} className="btn btn-primary" type="submit">Submit Meme</button>
      </div>
     
  </form>
      <div>
      {
        meme.data && meme.data.map((singlememe,index)=>{
          const idd=singlememe._id;
        return (
          <div key={index} class="card" style= {{width: "30rem"}} >
  <div class="card-body">
  
  <button type="button" class="btn btn-primary pull-right " data-toggle="modal" data-target="#exampleModal">
  Edit
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Meme</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <Edit id={singlememe._id}></Edit>
      </div>
  </div>
</div>
  
    <h5 class="card-title" >{singlememe.name}</h5>
    <p class="card-text">{singlememe.caption}</p>
  </div>
  <img class="card-img-top" src={singlememe.url} alt="Card image cap"/>

  

</div>
     
        );
        })
      }
      </div>

  

  </div>
  </>
    );
}
  export default Form;