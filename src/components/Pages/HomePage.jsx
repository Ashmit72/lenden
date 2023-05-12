import React from 'react'
import FormPay from '../FormPay'
import FormRecieve from '../FormRecieve'
import Button from '../Button'
import { useState } from 'react'
import MyCard from '../MyCard'


export default function HomePage() {
  const [activeForm,setActiveForm]=useState("FormRecieve");
  const toggleForm=(formName)=>{
setActiveForm(formName)
  }
  return (
    <div>
      
      <MyCard/>
        <div className="buttons-homepage" >
     <Button className=" btn btn-recieve" onClick={()=>toggleForm("FormRecieve")} style={{
      backgroundColor:activeForm==='FormRecieve'?"#3498db":"#e7e7e7",
      color:activeForm==='FormRecieve'?"white":"black"
      }}>

    Recieve

      </Button>
     <Button className=" btn btn-pay" onClick={()=>toggleForm("FormPay")} style={{
      backgroundColor:activeForm==='FormPay'?"#3498db":"#e7e7e7",
      color:activeForm==='FormPay'?"white":"black"
      }} >

      Pay
      </Button>

        </div>
      
     
     
  
    {activeForm==="FormRecieve"&& <FormRecieve/> }
    {activeForm==="FormPay"&&<FormPay/> }
      
    </div>
  )
}

