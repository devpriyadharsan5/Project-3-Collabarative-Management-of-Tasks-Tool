import React ,{useEffect,useState}from "react";
import "./Setting.css";
import { RxCross2 } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { HOST, addTeam, defaultSetting, deleteMail, getSetting, setting, settingShare } from "./API";
import ReactSwitch from 'react-switch';
import { auth } from "./firebase";
import { getTeam } from "./API";

function Setting() {
  const auths = Cookies.get("uId");
    const navigate =useNavigate();
    const[userTeam,setUserTeam]=useState("");
  const [teamList, setTeam] = useState("");
  const clcName = Cookies.get("uId");

    const[mailList,setMailList]=useState([]);
    const [groupList,setGroupList]=useState([]);
   const defaultMail = Cookies.get("email");
   const goBackHandler=async()=>{
    const id= Cookies.get("uId");
    window.location.pathname = `/getTask/${id}`;

   }

  //  const handleChange = (val) => {
  //   setIsPublic(val)
  //   updateShare(val);
    
  // }



  // const getMailHandler=async()=>{
  //   const clcName = Cookies.get("uId");
  //   axios.get(`${getSetting}/${clcName}`).then((res)=>{
  //     // console.log(res);
  //     setMailList(res.data);
  //     setIsPublic(res.data[0].isPublic);

  //   }).catch((err)=>{
  //     console.log(err); 
  //     if(err){

  //       toast.warn("Error fetching Email!!")
  //     }
    
  //   })

   
  // }
  
  // const updateShare=async(val)=>{
  //   const clcName = Cookies.get("uId");
  //   const isPublic = val;
  //   axios
  //       .post(`${settingShare}`, {
  //         clcName,isPublic
  //       })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           toast.success("Accessbility changed!");
  //         }
  //       });
  // }


useEffect(() => {
  if(!auths){
    navigate("/");
    toast.info("Login to access the Setting!!");
  }

  // addDefaultMail();
  // addMailHandler(Cookies.get("email"));
  getTeamHandler();


}, [])

    
const getTeamHandler=()=>{
const clcName=Cookies.get("uId");
axios.get(`${getTeam}/${clcName}`).then((res)=>{
  console.log(res);
  setGroupList(res.data);
}).catch((err)=>{
  console.log(err);
});
}
// const addMailHandler=async(mail)=>{
//     if(mail){
          
//               const clcName = Cookies.get("uId");
//               axios.post(setting,{
//                   clcName,
//                   mail,isPublic
//               }).then((response)=>{
//                   console.log(response);
//                   if(response.status ===200){
//                       // setUserMail("");
//                       getMailHandler();
//                       toast.success("Email added!!")
//                   }
//               }).catch((err)=>{
//                 if(err.response.data.error==="Invalid Mail")
//                 {
//                   toast.warn("Invalid Mail");
                  
//                 }
              
//                   console.log(err);
//               })
          
//     }
//     else{
//       toast.info("Enter Email to Add!!");

//     }
    
// }



const mailDeleteHandler=async(id)=>{

  // console.log(id);
const clcName=Cookies.get("uId");
  axios.post(deleteMail,{
      clcName,
      id

  }).then((res)=>{
    // console.log(res);
    if(res.status===200){
      toast.success("Mail deleted successfully!!");
      // getMailHandler();
    }
  }).then((err)=>{
    if(err){
      toast.error("Some Error Occured!");
    }
  })


}



const addTeamHandler=async()=>{
  const owner=clcName.toLowerCase();
  if (auth.currentUser) {

    if(userTeam){
      const team=teamList?.split(',');
      axios.post(addTeam,{
        owner,
        userTeam,
        team,
  
      }).then((res)=>{
        // console.log(res);
        if(res.status===200){
          toast.success("Team Created Successfully!!")
          setTeam("")
          setUserTeam("")
          getTeamHandler();
        }
      }).then((err)=>{
   console.log(err);
      })
    }
    else{
      toast.info("Enter team Details!!")
    }
   

  }
}



  return (
    <>
<div className="backBtn" onClick={goBackHandler}>
<BiArrowBack className="mb-4"/>
</div>
      <div className="settingMain">
        {/* <div className="setting">
          <p>Private</p>
          <ReactSwitch
        checked={isPublic}
        onChange={handleChange}
      />

          <p>Public</p>
        </div> */}
        {/* <div>
          <button className="copyLink" onClick={
            ()=>{navigator.clipboard.writeText(`${HOST}/share/${auths}`)
          toast.success("Link Copied!!")
          }
          }>Copy Link </button>
        </div> */}


        <div className="accessDiv">
          <p>Create Team</p>
          <input className="mailInput" required value={userTeam} onChange={(e)=>setUserTeam
        (e.target.value)} type="email" placeholder="Enter Team Name" />
         <textarea type="text" className="mailInput"  placeholder="Enter Emails (Seperate by comma)" value={teamList}  onChange={(e)=>setTeam(e.target.value)} />
          <button className="addBtn" onClick={()=>addTeamHandler()} >Add</button>
        </div>
        <div>
            <div className="tagDiv">
              {
                groupList?.map((elem,index)=>{
                  return(
                    <>
                    <div key={index} className="tag p-3 rounded-5">
                    <h4>{elem.userTeam}</h4>
                    {
                      elem.team.map((elem,index)=>{
                        return(
                          <p key={index}>{elem}</p>
                        )
                      })
                    } 
                    {/* {
                      (elem.mail!==defaultMail)&&(
                        <button className="tagBtn" onClick={()=>mailDeleteHandler(elem._id)}><RxCross2/></button>

                      )
                    } */}
                </div>
                    </>
                  );
                })
              }
                
               
            </div>
        </div>
      </div>

      {/* <div className="settingDiv">

        <div className="accessDiv">
          <input type="text" className="mailInput" placeholder="Team Name"  />
          <textarea type="text" className="mailInput"  placeholder="Enter Emails (Seperate by comma)"  />
          <button className="addBtn" onClick={()=>addMailHandler(userMail)} >Add</button>
        </div>


      </div> */}
    </>
  );
}

export default Setting;
