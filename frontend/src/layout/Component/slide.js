import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  height: '160px',
  fontSize: '40px',
  color: 'white',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'rgb(0,170,255)',
  margin: '0'
};
const ShowSlide = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>REALIABILITY</h3>
    </div>
    <div>
      <h3 style={contentStyle}>EXPANDING</h3>
    </div>
    <div>
      <h3 style={contentStyle}>ALWAYS KINDLY</h3>
    </div>
    <div>
      <h3 style={contentStyle}>ON TIME</h3>
    </div>
  </Carousel>
);
export default ShowSlide;