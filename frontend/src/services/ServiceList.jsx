import React from 'react'
import ServiceCard from './ServiceCard'
import {Col} from "reactstrap"

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData =[
    {
        imageUrl:weatherImg,
        title:'Calculate Weather',
        desc:'Calculate the weather for any location in the world'
    },
    {
        imageUrl:guideImg,
        title:'Best Tour Guide',
        desc:'Calculate the weather for any location in the world'
    },
    {
        imageUrl:customizationImg,
        title:'Customization',
        desc:'Calculate the weather for any location in the world'
    }
]

const Services = () => {
  return (
    <>
        {servicesData.map((item,index)=>(
            <Col lg='3' md='6' sm='12' className='mb-4'key={index}>
                <ServiceCard item={item} />
            </Col>
        ))}
    </>
  )
}

export default Services