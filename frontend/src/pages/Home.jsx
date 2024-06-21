import React from 'react'
import '../styles/home.css'
import { Container ,Row,Col} from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import Subtitle from '../shared/Subtitle'
import SearchBar from '../shared/SearchBar'
import experience from '../assets/images/experience.png'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonials  from '../components/Testimonial/Testimonials'
import Newsletter from '../shared/Newsletter'
const Home = () => {
  return <>
  {/*==================Hero section start============ */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="hero_content">
              <div className="hero_subtitle d-flex align-items-center">
                <Subtitle subtitle={'Know before you go '} />
                <img src={worldImg} alt="" />
              </div>
              <h1>Travelling opens the door to creating {" "}
              <span className='highlight'> memories</span>
              </h1>
              <p>Travelling is a great way to learn about other cultures and to experience new things. It can also be a great way to
                relax and recharge your batteries. Travelling can be expensive, but there are ways to save money on your trip. One
                way to save money is to travel during the off-season. Another way to save money is to book your trip in advance. You can also save
                money by staying in hostels or camping instead of hotels. Travelling can be a great way to learn about other cultures and to experience new things
              </p>
            </div>
          </Col>
          <Col lg='2'>
              <div className='hero_img_box'>
                <img src={heroImg} alt="" />
              </div>
          </Col>
          
          <Col lg='2'>
              <div className='hero_img_box hero_video-box mt-4'>
                <video src={heroVideo} alt="" controls />
              </div>
          </Col>
          
          <Col lg='2'>
              <div className='hero_img_box mt-5'>
                <img src={heroImg02} alt="" />
              </div>
          </Col>
          <SearchBar />
        </Row>
      </Container>
    </section>
    {/*-------------Hero Section Ends---------------------- */}
    <section>
      <Container>
        <Row>
          <Col lg='3'>
            <h5 className='services_subtitle'>What we serve</h5>
            <h2 className='services_title'>We offer our best services</h2>
          </Col>
          <ServiceList/>
        </Row>
      </Container>
    </section>

    {/*==============featured tour section start======== */}
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5'>
            <Subtitle subtitle={'Explore'}/>
            <h2 className='featured_tour-title'>Our feature</h2>
          </Col>
          <FeaturedTourList/>
        </Row>
      </Container>
    </section>
    {/*==============featured tour section start======== */}
    
    {/*==============experience section start======== */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className='experience_content'>
              <Subtitle subtitle={'Experience'}/>
                <h2>With our all experience<br/> we will serve you</h2>
                <p>Great experince with all our hearts out we enoyed a laot 
                  <br />
                  dksjghoighn avahfvoG iyfgv VV,RVOHAV
                </p>
                <div className='counter_wrapper d-flex align-items-center gap-5'>
                  <div className="counter_box">
                    <span>12k+</span>
                    <h6>Successful Trip</h6>
                  </div>
                  <div className="counter_box">
                    <span>2k+</span>
                    <h6>Regular Clinets</h6>
                  </div>
                  <div className="counter_box">
                    <span>15</span>
                    <h6>Years experience</h6>
                  </div>
                </div>
            </div>
          </Col>
          <Col lg='6'>
            <div className='experience_img'>
              <img src={experience} alt="experience" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    {/*==============experience section end======== */}
    
     {/*==============gallery section start======== */}
     
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle subtitle={'Gallery'} />
              <h2 className='gallery_title'>Visit Our Customers Tour Gallery</h2>        
          </Col>
         <Col lg='12'>
          <MasonryImagesGallery />
          </Col>
        </Row>
      </Container>
    </section>
     {/*==============gallery section end======== */}
    
    
     {/*==============testimonial section end======== */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Fans Love'} />
              <h2 className='testimonial_title'>What Our Customers Say</h2>
            </Col>
            <Col lg='12'>
              <Testimonials/>
            </Col>
          </Row>
        </Container>
      </section>
     {/*==============testimonial section end======== */}
    <Newsletter />
  </>
}

export default Home