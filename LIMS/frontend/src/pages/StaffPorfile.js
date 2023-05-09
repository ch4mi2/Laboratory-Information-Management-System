
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import '../css/StaffStyles/StaffStyles.css';
import moment from 'moment'

import Swal from 'sweetalert2';





const  StaffProfile = () => {
    const [Staff,setStaff] = useState(null)
    const [name,setname] = useState('')
    const [Eid,seteid] = useState('')
    const [time,setTime] = useState('')
    
    
    let [attendance,setatt] = useState('')
    
    
    const {user} = useAuthContext()


    useEffect(() => {

        const fetchProfile = async () => {
            const response = await fetch(`/api/Staff/${user.userid}`)
            const json = await response.json()

            if(response.ok)
            {
                setStaff(json)

                
            }
        }

       const fetchAtt = async () => {
            const response1 =  await fetch(`/api/Attendance/${user.eid}`)
            const json1 =  await response1.json()
            console.log(json1)

            if(response1.ok)
            {
                setatt(json1.attendance)
                setname(json1.name)
                seteid(json1.Eid)
                setTime(json1.updatedAt)

            }
        }
        if(user != null){
        fetchAtt()
        fetchProfile()}
    },[user])

    const AttMark = async (e) => {
        if(moment(time).format('DD') == '01')
        {
            attendance = 0
            
        
        if(moment(time).format('DD-MM-YYYY') != moment().format('DD-MM-YYYY')){
        attendance = attendance + 1
        console.log(attendance)
        

        try{

            const response = await fetch(`/api/Attendance/${user.eid}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    
                    attendance,
                })
              })
              if (response.ok) {
                Swal.fire(
                    {
                      title: 'Success',
                      text: 'Attendance has been updated',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 2000,
                      timerProgressBar: true  
                  }
                  )
              }
              console.log(attendance)
              console.log(name)
              console.log(Eid)

        }catch(error) {
            console.log(error)
          }
        }}
        else{
            Swal.fire(
                {
                  title:'Warning',
                  text: 'Attendance has already marked',
                  
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true  
              }
              )
              
        }
    }

    


    


    return(
        
        <div className="container">
            
        
            <h1>HELLO {Staff?.name ?? 'null'}!</h1><br/>
            <h2>Here is your profile details</h2>
            <br/><br/>

            <div className="formbox1">
                <p>Name           : {Staff?.name ?? 'null'}</p>
                <p>Employee ID    : {Staff?.Eid ?? 'null'}</p>
                <p>Position       : {Staff?.post ?? 'null'}</p>
                <p>Contact Number : {Staff?.contact ?? 'null'}</p>
                <p>NIC Number     : {Staff?.NIC ?? 'null'}</p>
                <p>Email     : {Staff?.email ?? 'null'}</p>


            </div><br></br>
            <br/>
            <a href="/UpdateProfile"><button className="btnupdate">Edit Profile</button></a>
            <button className="btnAttendance" onClick={AttMark}>Mark</button>
          


            
            
        
    </div>
    )

}

export default StaffProfile;