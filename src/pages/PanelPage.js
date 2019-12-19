/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Form, Col, Row, Image, Button, Modal  } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import '../css/HeaderStyle.css';
import { GoogleLogin } from 'react-google-login';
import 'react-phone-input-2/dist/style.css'


export default class google extends Component {
  constructor(props, context) {
    super(props, context);
    this.gen_otp = this.gen_otp.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.verify_otp = this.verify_otp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.curriculum = React.createRef()
    this.curriculum_img = React.createRef()
  }
  state = {
    isLoggedIn: false,
    givenName: '',
    familyName: '',
    email:'',
    googleId: '',
    mobileNo: '',
    otp: 0,
    file: null,
    res_data: {},
    domain: '',
    img_url: '',
    role: '',
    skills: '',
    img:'',
    interview_type:'',
    Designation:'',
    num_interview: '',
    linkedin_url: '',
  };

  responseGoogle = response => {
    this.setState({
      isLoggedIn: true,
      givenName: response.givenName,
      familyName: response.familyName,
      email: response.email,
      img_url: response.imageUrl,
      googleId: response.googleId,

      // givenName:response.profileObj.givenName,
      // familyName: response.profileObj.familyName,
      // email:response.profileObj.email,
      // img_url:response.profileObj.imageUrl,
      // googleId: response.profileObj.googleId,

    })
  }

  imgChangeHandler = res => {
    const name = this.curriculum_img.current.files[0].name
    console.log(this.curriculum_img.current.files);
     const ext = (name.split('.').reverse()[0]).toLowerCase();
    console.log(ext);
    if (ext === 'jpeg' || ext === 'png' || ext === 'jpg' || ext === 'bmp' ) {
      const load_img = new FormData();
      load_img.append(name, this.curriculum_img.current.files[0]);
      const xhr = new XMLHttpRequest();
      
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const res_datas = JSON.parse(xhr.response)
          if (res_datas.status === 'E') {
            alert(res_datas.error);
            return 0
          } else {
            for (const key in res_datas) {
              if (key !== "status" && res_datas[key] !== null) {
              this.setState({
                  [key]: res_datas[key]
                })
              }
            };
            console.log(this.state);
            return 0
          }
        }
      }
      xhr.open('POST', `https://recruiter_api.achyutas.com/dp?mobileNo=${this.state.mobileNo}`);
      xhr.send(load_img);
    }
    else {
      alert('Please upload image.')
    }
  };

  onFileChangeHandler = res => {
    const name = this.curriculum.current.files[0].name
    console.log(name);
    const ext = name.split('.').reverse()[0]
    if (ext === 'pdf' || ext === 'docx') {
      const payload = new FormData();
      payload.append(name, this.curriculum.current.files[0]);
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const res_data = JSON.parse(xhr.response)
          if (res_data.status === 'E') {
            alert(res_data.error);
            return 0
          } else {
            for (const key in res_data) {
              if (key !== "status" && res_data[key] !== null) {
              this.setState({
                  [key]: res_data[key],
                })
              }
            };
          }
        }
      }
      xhr.open('POST', `https://recruiter_api.achyutas.com/resume?mobileNo=${this.state.mobileNo}`);
      xhr.send(payload);
    }
    else {
      alert('Please upload pdf/docx file.')
    }
  };
  handleOnChange = response => {
      this.setState({
        [response.target.name]: response.target.value
      })
    }

  handleClose() {
    this.setState({ show: false });
  }
  gen_otp() {
    const json_data = { 'mobileNo': this.state.mobileNo }
    this.api_call(json_data, 'otp')
    this.setState({ show: true });
  }
  verify_otp() {
    const json_data = { 'otp': this.state.otp }
    this.api_call(json_data, 'verify', 0)
    this.setState({ show: false });
  this.setState({
    bgColor: 'green',
    borderColor: 'green',
    readOnly: true ,
  })
  }

  api_call(json_data, endpoint, custom_error = 0) {
    fetch(`https://recruiter_api.achyutas.com/${endpoint}?mobileNo=${this.state.mobileNo}`, {
      method: 'POST',
      body: JSON.stringify({ content: json_data }),
    }).then(response => {
      return response.json()
    }).then(data => {
      if (data.status === 'E') {
        if (custom_error === 0) {
          alert(data.error);
        }
        return 0
      } else {
        return data;
      }
    })
      .catch(error => {
        console.log("OOPS! got an error");
        console.log(error);
      });
  }
  handleSubmit(event) {
    event.preventDefault();
     this.api_call(this.state,"form_post")
     this.props.history.push("/InterviewTimeSchedule")
  }
  render() {
    let gcontent;
    if (this.state.isLoggedIn) {
      gcontent = (
        <div>
          <Navbar expand="lg" className="bor_stlreg d-flex">
            <Image src="../logo.png" className="logo_stl" /> 
            <h6 className="lan_page d-flex align-self-center mb-0">
                                Achyutas Solutions
                             </h6>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto links">
              </Nav>
              <Nav className="links">
                <Link to="/LoginPage" className="lan_page nav-link text-dark font-weight-bold">LogOut</Link>
                <Link to="/" className="lan_page nav-link text-dark font-weight-bold" >Help</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="p-5">
            <div className="reg_main">
              <Form onSubmit={this.handleSubmit}>
                <div className="">
                  <h4 className="">Personal Information</h4>
                  <Row>
                    <Col md={3} className="pt-4 text-center p-0">
                      <Image src={this.state.img_url} height="130px" width="130px" roundedCircle thumbnail className="mb-4" />
                      <div className="content-section implementation">
                      <span className="p-button p-fileupload-choose p-component p-button-text-icon-left">
                      <span className="p-button p-fileupload-choose p-component p-button-text-icon-left">
                        <span className="p-button-icon-left pi pi-plus"></span>
                        <span className="p-button-text p-clickable">Change your Profile</span>
                        <input type="file" className="form-control" name="img" ref={this.curriculum_img}
                            onChange={this.imgChangeHandler.bind(this)} />
                        </span>
                        </span>
                      </div>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={8}>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstName" >
                          <Form.Label className="float-left">First Name</Form.Label>
                          <span className="requiredStars float-left text-danger mx-1">*</span>
                          <Form.Control type="text" defaultValue={this.state.givenName} name="givenName" 
                          onChange={this.handleOnChange.bind(this)} required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridLastName">
                          <Form.Label className="float-left">Last Name</Form.Label>
                          <span className="requiredStars float-left text-danger mx-1">*</span>
                          <Form.Control type="text" defaultValue={this.state.familyName} name="familyName" 
                          onChange={this.handleOnChange.bind(this)}/>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group className="col-md-5" controlId="formGridMbNo">
                          <Form.Label className="float-left">Mobile Number</Form.Label>
                          <span className="float-left text-danger mx-1">*</span>
                          <Form.Control type="text" value={this.state.mobileNo}  name="mobileNo" placeholder="Enter Mobile Number"
                          onChange={this.handleOnChange.bind(this)}  style={{borderColor:this.state.borderColor}} readOnly={this.state.readOnly}   required />
                        </Form.Group>
     
                        <Form.Group className="col-md-1" controlId="" style={{ paddingTop: "35px" }}>
                          <Button type="submit" variant="primary" onClick={this.gen_otp} className="btn-sm btnotp">Get OTP</Button>
                          <Modal show={this.state.show} onHide={this.handleClose} keyboard={false}   >
                            <Modal.Body> <Form.Label className="float-left">OTP</Form.Label>
                              <Form.Control type="text" value={this.state.otp} name="otp" placeholder="Enter Otp"
                                onChange={this.handleOnChange.bind(this)} required /></Modal.Body>
                            <Modal.Footer>
                              <Button variant="primary" onClick={this.verify_otp} ref="button1" >
                                Save
                                 </Button> 
                                 <Button type="submit" variant="primary" onClick={this.gen_otp} >
                                   Resend OTP
                                 </Button>
                            </Modal.Footer>
                          </Modal>
                        </Form.Group>

                        <Form.Group className="col-md-6" controlId="formGridEmail">
                          <Form.Label className="float-left">Email</Form.Label>
                          <span className="requiredStars float-left text-danger mx-1">*</span>
                          <Form.Control type="email" name="email" defaultValue={this.state.email} className="w-100" 
                          onChange={this.handleOnChange.bind(this)} required />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                      <div className="content-section implementation">
                      <span className="p-button p-fileupload-choose p-component p-button-text-icon-left">
                      <span className="p-button p-fileupload-choose p-component p-button-text-icon-left">
                        <span className="p-button-icon-left pi pi-plus"></span>
                         <span className="p-button-text p-clickable">Upload Resume</span>
                        <input type="file" className="form-control" name="file" ref={this.curriculum}
                            onChange={this.onFileChangeHandler.bind(this)} />
                        </span>
                        </span>
                      </div>
                      </Form.Row>
                      <br />
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridTypeofIntw">
                          <Form.Label className="float-left">Type of Interviews Taken</Form.Label>
                          <span className="requiredStars float-left text-danger mx-1">*</span>
                          <Form.Control as="select" required name='interview_type' onChange={this.handleOnChange.bind(this)}>
                            <option>Select</option>
                            <option>Online</option>
                            <option>Phone</option>
                            <option>In-Person</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridIntwNo">
                          <Form.Label className="float-left">Number of Interviews Taken so far</Form.Label>
                          <span className="requiredStars float-left text-danger mx-1">*</span>
                          <Form.Control type="number" placeholder="Number of Interviews" onChange={this.handleOnChange.bind(this)}
                          name="num_interview" required />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row >
                        <Form.Group as={Col} controlId="formGridTypeofIntw" className="d-block ">
                          <Form.Label className="float-left">LinkedIn : </Form.Label>
                          <span className="requiredStars float-left text-danger mx-1">*</span>
                            <Form.Control type="url" placeholder="Enter URL" onChange={this.handleOnChange.bind(this)}
                            name="linkedin_url" required  />
                        </Form.Group>
                        <Form.Group controlId="formGridDesignation">
                        <Form.Label className="float-left">Skills</Form.Label>
                        <span className="requiredStars float-left text-danger mx-1">*</span>
                        <Form.Control type="text" defaultValue={this.state.skills} placeholder="skills"  
                        onChange={this.handleOnChange.bind(this)} name="skills" required />
                      </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridRole">
                          <Form.Label className="float-left">Role</Form.Label>
                          <span className="requiredStars float-left text-danger mx-1">*</span>
                          <Form.Control type="text" defaultValue={this.state.role}
                          onChange={this.handleOnChange.bind(this)} placeholder="Role" name="role" required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDesignation">
                          <Form.Label className="float-left">Designation</Form.Label>
                          <span className="requiredStars float-left text-danger mx-1">*</span>
                          <Form.Control type="text" defaultValue={this.state.domain} placeholder="domain" name="domain" 
                          onChange={this.handleOnChange.bind(this)} required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCmpnyName">
                          <Form.Label className="float-left">Company Name</Form.Label>
                          <span className="requiredStars float-left text-danger mx-1">*</span>
                          <Form.Control type="text" placeholder="Company Name" name="company_name" onChange={this.handleOnChange.bind(this)} required />
                        </Form.Group>
                      </Form.Row>
                      <button type="submit"  className="btn btn-primary rounded-pill" style={{ width: "130px" }}> Submit</button>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )
    } else {
      gcontent = (
        <div>
           <Navbar expand="lg" className="bor_stlreg d-flex">
            <Image src="../logo.png" className="logo_stl" /> 
            <h6 className="lan_page d-flex align-self-center mb-0">
                                Achyutas Solutions
                             </h6>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto links">
              </Nav>
              <Nav className="links">
                <Link to="/LoginPage" className="lan_page nav-link text-dark font-weight-bold">Login</Link>
                <Link to="/" className="nav-link lan_page" style={{ color: "#00aeef" }}>Register</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="bg-white container-fluid d-flex pb-5">
            <div className="col-md-1"></div>
            <div className="col-md-5 pt-5 mt-5 pr-0">
              <h2 className="mb-4">Want to join a Term of Quality Panel</h2>
              <h2 className="mb-5">Members and Earn as well</h2>
              <div>
                <GoogleLogin
                  clientId="698566757398-kqs9ob7nlfkqje1r165af4g0l2u25348.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </div>
            <div className="col-md-6 pl-0">
              <Image src="../Group 529.png" className="" width="95%" />
            </div>
          </div>
        </div>
      );
    }
    return <div>{gcontent}</div>
  }
}
