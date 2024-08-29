import React from 'react'
import Navbar from './Navbar';
import { useState, useEffect } from 'react';

export default function Plantilla(props) {

 // const [widhtNavbar, setWidthNavbar] = useState('0%');
  const [displayContent, setDisplayContent]=useState('flex');

  useEffect(() => { 
    function handleResize() {
      setDisplayContent('flex');
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 


  function handleClick() {
    if(displayContent==='none'){
      setDisplayContent('flex');
    }else{

      if(window.innerWidth<800){
        setDisplayContent('none');
        //setWidthNavbar('100%');
      }else{
        setDisplayContent('flex');
        //setWidthNavbar('30%')
      }
    }
  }


  return (
    <div style={{display: 'flex', width: '100vw', backgroundColor: '#FFFFFF'}}>

      <Navbar onClick={() => handleClick()} display={displayContent} ></Navbar>

      <div  style={{display: displayContent,justifyContent:'center', width: '100vw', height: 'auto'}}>
      {props.elemento}
      </div> 
    </div>
  )
}