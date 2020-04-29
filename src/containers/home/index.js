import React, { Component } from 'react';
import './home.css'
import { Layout} from 'antd';
const {Content} = Layout;

class Home extends Component {
  render(){
    return(
    <Layout className="layout"  style={{ height: '100%' }}>
      <Content>
        <h1 className='header'>Interview Test</h1>
        <div className="container">
      
          <h2 className="title">1. สร้างหน้าเว็บไซต์สำหรับบันทึกหนังสือที่อ่านแล้ว</h2>
          <p>
            โดยมี field มี่ต้องการ ชื่อหนังสือ ชื่อคนเขียน เนื้อหาโดยสรุปของหนังสือ และวันที่เวลาที่อ่านจบ ต้องสามารถกดบันทึกได้และต้องนำค่าที่บันทึกไปเก็บไว้ใน redux store 
          </p>
      
          <h2 className="title">2. สร้างหน้าโชว์ลิสท์รายการหนังสือที่อ่านแล้ว</h2>
          <p>
            นำลิสท์รายการหนังสือที่อยู่ใน store ที่ได้จากในข้อ 1 มาแสดง (ข้อ 1 และ 2 ต้องอยู่คนละหน้ากัน )
          </p>
        </div>
      </Content>
    </Layout>
  )}
}

export default Home
