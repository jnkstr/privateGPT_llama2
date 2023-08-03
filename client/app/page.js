"use client"
import styles from '@styles/main.css'
import {Row,Container,Col,Stack  } from "react-bootstrap"
import ConfigSideNav from '@components/ConfigSideNav'
import MainContainer from '@components/MainContainer'
import { ToastContainer, toast } from 'react-toastify';
import Image from "next/image";
import logo from '/public/fi-ts_logo.svg'

export default function Home() {
  return (
    <>
      <Row className='pe-3 vh-100 overflow-hidden g-0'>
        <Col className="side-bar-col d-flex flex-column" lg={3} xs={3}>
          <div className='d-flex align-items-start justify-content-start'>
            <Image src={logo} width={350} height={350} />
          </div>
          <div className="mt-auto pb-3">
            <div className='d-flex align-items-center justify-content-center py-4'></div>
            <ConfigSideNav />
          </div>
        </Col>
        <Col lg={9} xs={9} className="main-chat-col mt-3">
          <MainContainer />
        </Col>
        <ToastContainer />
      </Row>
    </>
  );
  
  
}
