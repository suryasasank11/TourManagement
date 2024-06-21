import React,{useState,useContext} from 'react'
import '../styles/login.css'
import {Container,Row,Col,Form,FormGroup,Button} from 'reactstrap'
import {Link,useNavigate} from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import {AuthContext} from './../context/AuthContext'
import {BASE_URL} from './../utils/config'


const Login = () => {

  const [credentials,setCredentials]=useState({
    email:undefined,
    password:undefined
})

const {dispatch} =useContext(AuthContext)
const navigate = useNavigate()


const handleChange = e=>{
setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
};

const handleClick = async e=>{
  e.preventDefault();
  dispatch({type:'LOGIN_START'})
  try{
    const res = await fetch(`${BASE_URL}/auth/login`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(credentials)
      })
      const result = await res.json()
      if(!res.ok) alert(result.message)

        dispatch({type:'LOGIN_SUCCESS',payload:result.data})
        navigate('/')
  }catch(err){
    dispatch({type:'LOGIN_FAILURE',payload:err.response.data})
  }
}




  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={loginImg} alt="login" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="user" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="email" placeholder='Email' required id='email'
                    onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                      <input type="password" placeholder='Password' required id='password'
                      onChange={handleChange}/>
                    </FormGroup>
                    <Button className='btn secondary_btn auth_btn'>Login</Button>
                    <p>Don't have an account? <Link to='/register'>Create one!</Link></p>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login