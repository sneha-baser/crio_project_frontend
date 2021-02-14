import React, { useState , useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './Form.css'
import axios from 'axios';
const Edit = (props) =>{
    const[editinp,editinps]=useState({
        editcaption : "",
        editurl : "",
      });
      const editEvent = (event)=>{
        const value=event.target.value;
        const name=event.target.name;
        editinps((prevValue)=>{
          return{
            ...prevValue,
            [name]:value,
          };
        });
      }
      const editsave=  (event) =>{ 
        console.log(props.id);
        console.log("in edit save");

        const memeobj = {
          url : editinp.editurl,
          caption : editinp.editcaption  
        }
       
          axios.patch(`http://localhost:3001/memes/${props.id}`,memeobj)
        .then((res)=>{
          // console.log(memeobj.url);
          // console.log(memeobj.caption);
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        });
        editinp.editurl="";
        editinp.editcaption="";
   
    
    
      }
      return(
          <>
      <div class="modal-body">
      <form>
          <div class="form-group">
            <label for="Caption" class="col-form-label">Caption</label>
            <input type="text" 
            onChange={editEvent}
            class="form-control"
             id="Caption"
              name="editcaption"
              value={editinp.editcaption}
             />
            <label for="url" class="col-form-label">URL</label>
            <input type="url" 
            class="form-control"
            onChange={editEvent}
            id="url"
            name="editurl"
            value={editinp.editurl}

             />
            </div>
            </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onClick={editsave} data-dismiss="modal"  >Save</button>

      </div>
   
</>
      );
}
export default Edit;