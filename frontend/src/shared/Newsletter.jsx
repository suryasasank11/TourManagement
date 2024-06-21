import React from 'react'
import './newsletter.css'

import { Container,Col,Row } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'

const Newsletter = () => {
  return (
    <section className='newsletter'>
        <Container>
            <Row>
                <Col lg="6">
                    <div className="newsletter__content">
                        <h2>Subscribe to our newsletter</h2>

                        <div className="newsletter_input">
                            <input type="text" placeholder="Enter your email address" />
                            <button className="btn newsletter_btn">Subscribe</button>
                        </div>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
                        </p>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="newsletter__img">
                        <img src={maleTourist} alt="male tourist" />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Newsletter