import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function FormatPage({children}) {
  return (
    <>
    <Nav></Nav>
    {children}
    <Footer></Footer>
    
    </>
  )
}
