import React from 'react';
import { Form, Nav, Navbar ,Image } from 'react-bootstrap';
import '../css/IntTimeSchedule.css';


class App extends React.Component {
    constructor() {
        super();
        this.arr_pop = this.arr_pop.bind(this);
    }

    state = {
        rows: [],
       formData: {},
       checked: {},
       remove_arr : []
    };
    
    handleSubmit = (e)=> {
        e.preventDefault();
        const rows = [...this.state.rows];
        let formData = {};
        for (let field in this.refs) {
            formData[field] = this.refs[field].value;
        }
        rows.push({ formData });
        // console.log(rows);
       
    };

    checkedClick (idx, e) {
        // var idx = this.
        console.log(">>>>> Clicked and what is idx " , idx);
        this.setState({checked: !this.state.checked})
        var copiedState = {...this.state}
        var remove_arr =  copiedState.remove_arr;
       
        console.log(">>>>> Initial  2 State of remove array" , remove_arr);
       
        if(e.target.checked){
           if(!remove_arr.includes(idx)) { 
               remove_arr.push(idx) 
            }; 
        } else {


            if(remove_arr.includes(idx) ){

                remove_arr = remove_arr.filter(function(value, index, arr){

                    return value !== idx;
                
                });
            }

        
        
        }

        
        console.log(">>>>> Changed State of remove array" , remove_arr);
       
        
        this.setState({
            remove_arr : remove_arr
        })
      }

    handleChange = idx => e => {

        console.log(">>>>> Handle change idx " , idx)
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        rows[idx] = {
            [name]: value
        };
        let formData = {};
        for (let field in this.refs) {
            formData[field] = this.refs[field].value;
        }
        rows.push({ formData });

        this.setState({
            rows
        });
    };

    handleAddRow = () => {
        const rows = [...this.state.rows];
        let formData = {};
        for (let field in this.refs) {
            formData[field] = this.refs[field].value;
        }
        rows.push({ formData });
        // console.log(rows);
        this.setState({
            rows
        });
        const item = {
            formData
        };
        this.setState({
            rows: [...this.state.rows, item]
        });
    };
    arr_pop(ix, arr){
        var b = arr.slice(0, ix)
        var c =  arr.slice(ix + 1, arr.length)
        b.concat(c)
        return b
    }
    handleRemoveRow = (idx) =>{


        console.log(">>>Idx is " , idx);
        
        // var a = [1, 2, 3, 4, 9, 75, 0]
        // var idx1 = 4
        // var b = a.slice(0, idx1)
        // var c =  a.slice(idx1 + 1, a.length)
        // console.log(a.slice(0, idx1) + a.slice(idx1 + 1, a.length))
        // console.log(b.concat(c))
        var remove_arr = this.state.remove_arr.sort().reverse()
        var rows = this.state.rows
        var rows_updated = []
        var a = [1, 2]
        console.log(1 in a)
        console.log(3 in a)

        console.log(">>> Whats remove array set:" , remove_arr)
        for (let i = 0; i < rows.length; i++) {
            // const element = remove_arr[i];
            if (!remove_arr.includes(i)){
                
                rows_updated.push(rows[i])
            }
            
        }
        console.log("Whats rows updated" , rows_updated);
       // this.state.remove_arr.splice();
       // this.state.rows.splice();

            this.setState({
            remove_arr : [],
            rows:rows_updated,
   });
   console.log(this.state)
    };


    shouldComponentUpdate(nextProps, nextState) {
       console.log(">>> Should component update code!");
        if (this.state.remove_arr !== nextState.remove_arr) {
        return false;
      } 
        return true;
      
        
      }

    render() {

        console.log(">>>>>>>>> Rerender is Happening");
        return (
            <div>
                <div className="m-0 p-0 bgSchedulePage">
                    <Navbar expand="lg" className="bor_stlreg py-0">
                        <Navbar.Brand href="#home" className="d-flex">
                            <img
                                alt=""
                                src="../src/AchyutasLogo.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            <h6 className="lan_page d-flex align-self-center mb-0">
                                Achyutas Solutions
        </h6>
                        </Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto links">
                            </Nav>
                            <Nav className="links">
                                <p to="/LoginPage" className="lan_page nav-link text-dark mb-0 font-weight-bold">LogOut</p>
                                <p to="/" className="lan_page nav-link text-dark mb-0 font-weight-bold" >Help</p>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className=" p-5">
                        <div className="col-md-12 pb-5">
                            <p className="py-2 rounded-pill text-center bgTitle text-secondary">Please select 10 of Your Available Date and Timings for
                               Scheduling Interview in this month (Earn 500/- for each Interview)</p>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="">
                                <Image src="../calender.jpg" className="cal_img_stl" /> 
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row justify-content-between mx-4">
                                    <h5 className="mb-2 text-dark ">
                                        Schedule : 
                                    </h5>
                                    <div>
                                    <input type="button" className="btn  mr-3 btn-light border border-black btn-sm rounded"
                                        value="Add"  onClick={this.handleAddRow}/>
                                        <input type="button" className="btn  mr-3 btn-light border border-black btn-sm rounded"
                                        value="Remove" onClick={this.handleRemoveRow}/>
                                    </div>
                                </div>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="chartt-scrollbar mt-2">
                                        <div className=" column ">
                                            <table
                                                className="table table-bordered table-hover"
                                                id="tab_logic"
                                            >
                                                <thead>
                                                </thead>
                                                <tbody>
                                                    {this.state.rows.map((item, idx) => (
                                                        <tr className="border-0" id="addr0" key={idx}>
                                                            <td className="p-2 pt-3">{idx+1}</td>
                                                            <td className="p-0 ">
                                                            
                                                                <div className=" mb-0 mt-1 p-1 border-0  rounded bg-transparent"  >
                                                                    <div className="row  rounded py-2 px-1">
                                                                        <div className="col-md-3 p-0 d-flex justify-content-around " data-toggle="tooltip" title="Select Date">
                                                                       <div className="my-auto">   
                                                                       <input
                                                                  type="checkbox"
                                                                  id={idx}
                                                                  ref="myCheckbox"
                                                                  name={this.state.idx}
                                                                //   checked={this.state.idx}
                                                                  checked={this.state.idx}
                                                                  onChange={this.checkedClick.bind(this, idx)}
                                                                    // this.handleChange()}}
                                                                //   onChange={this.handleChange}
                                                                                     />
                                                                                     </div>

                                                                            <h6 className="text-dark my-auto">Date  : </h6>
                                                                            <Form.Group controlId="dateSchedule" className="p-0 ml-1 mb-0  h-auto">
                                                                                <Form.Control type="date" ref="date" name="ScheduleDate" className="pl-2 pr-0 mb-0 slectFontStyleDate py-1 h-auto" />
                                                                            </Form.Group>
                                                                        </div>
                                                                        <div className="col-md-5">
                                                                            <div className="row d-flex ">
                                                                                <h6 className="text-dark ml-4 mr-2">Timing  : </h6>
                                                                                {/* <input type="time" name="ScheduleStartTime"
                                                                    
                                                                    ref="StartTime"></input>
                                                                    <input type="time" name="ScheduleEndTime"

                                                                    
                                                                    ref="EndTime"></input> */}

                                                                                <div className="mr-2" data-toggle="tooltip" title="Start Time">
                                                                                    {/* <MDBTooltip placement="bottom">
                                                                            <MDBBtn color="primary">Bottom tooltip</MDBBtn>
                                                                            <div>MDBTooltip on bottom</div>
                                                                        </MDBTooltip> */}
                                                                                    <select name="hrs" ref="hrs"
                                                                                        // style={{webkitappearance: none}}
                                                                                        className="border-right-0 border pr-2 pl-1 timeDropIcon  mb-0 slectFontStyleDate py-1 h-auto">
                                                                                        <option value="hr">HH</option>
                                                                                        <option value="1">01</option>
                                                                                        <option value="2">02</option>
                                                                                        <option value="3">03</option>
                                                                                        <option value="4">04</option>
                                                                                        <option value="5">05</option>
                                                                                        <option value="6">06</option>
                                                                                        <option value="7">07</option>
                                                                                        <option value="8">08</option>
                                                                                        <option value="9">09</option>
                                                                                        <option value="10">10</option>
                                                                                        <option value="11">11</option>
                                                                                        <option value="12">12</option>
                                                                                    </select>

                                                                                    <select name="mts" ref="minutes" className=" border-left-0 px-1 timeDropIcon border-right-0 border   mb-0 slectFontStyleDate py-1 h-auto">
                                                                                        <option value="sc">SS</option>
                                                                                        <option value="1">01</option>
                                                                                        <option value="2">02</option>
                                                                                        <option value="3">03</option>
                                                                                        <option value="4">04</option>
                                                                                        <option value="5">05</option>
                                                                                        <option value="6">06</option>
                                                                                        <option value="7">07</option>
                                                                                        <option value="8">08</option>
                                                                                        <option value="9">09</option>
                                                                                        <option value="10">10</option>
                                                                                        <option value="11">11</option>
                                                                                        <option value="12">12</option>
                                                                                        <option value="13">13</option>
                                                                                        <option value="14">14</option>
                                                                                        <option value="15">15</option>
                                                                                        <option value="16">16</option>
                                                                                        <option value="17">17</option>
                                                                                        <option value="18">18</option>
                                                                                        <option value="19">19</option>
                                                                                        <option value="20">20</option>
                                                                                        <option value="21">21</option>
                                                                                        <option value="22">22</option>
                                                                                        <option value="23">23</option>
                                                                                        <option value="24">24</option>
                                                                                        <option value="25">25</option>
                                                                                        <option value="26">26</option>
                                                                                        <option value="27">27</option>
                                                                                        <option value="28">28</option>
                                                                                        <option value="29">29</option>
                                                                                        <option value="30">30</option>
                                                                                        <option value="31">31</option>
                                                                                        <option value="32">32</option>
                                                                                        <option value="33">33</option>
                                                                                        <option value="34">34</option>
                                                                                        <option value="35">35</option>
                                                                                        <option value="36">36</option>
                                                                                        <option value="37">37</option>
                                                                                        <option value="38">38</option>
                                                                                        <option value="39">39</option>
                                                                                        <option value="40">40</option>
                                                                                        <option value="41">41</option>
                                                                                        <option value="42">42</option>
                                                                                        <option value="43">43</option>
                                                                                        <option value="44">44</option>
                                                                                        <option value="45">45</option>
                                                                                        <option value="46">46</option>
                                                                                        <option value="47">47</option>
                                                                                        <option value="48">48</option>
                                                                                        <option value="49">49</option>
                                                                                        <option value="50">50</option>
                                                                                        <option value="51">51</option>
                                                                                        <option value="52">52</option>
                                                                                        <option value="53">53</option>
                                                                                        <option value="54">54</option>
                                                                                        <option value="55">55</option>
                                                                                        <option value="56">56</option>
                                                                                        <option value="57">57</option>
                                                                                        <option value="58">58</option>
                                                                                        <option value="59">59</option>
                                                                                        <option value="60">60</option>
                                                                                    </select>
                                                                                    <select name="day" ref="ampm" className="border-left-0 px-1 border   mb-0 slectFontStyleDate py-1 h-auto">
                                                                                        <option value="am">AM</option>
                                                                                        <option value="pm">PM</option>
                                                                                    </select>

                                                                                </div>
                                                                                <div data-toggle="tooltip" title="End Time">
                                                                                    <select name="hrs"
                                                                                        // style={{webkitappearance: none}}
                                                                                        className="border-right-0 border timeDropIcon px-1  mb-0 slectFontStyleDate py-1 h-auto">
                                                                                        <option value="hr">HH</option>
                                                                                        <option value="1">01</option>
                                                                                        <option value="2">02</option>
                                                                                        <option value="3">03</option>
                                                                                        <option value="4">04</option>
                                                                                        <option value="5">05</option>
                                                                                        <option value="6">06</option>
                                                                                        <option value="7">07</option>
                                                                                        <option value="8">08</option>
                                                                                        <option value="9">09</option>
                                                                                        <option value="10">10</option>
                                                                                        <option value="11">11</option>
                                                                                        <option value="12">12</option>
                                                                                    </select>
                                                                                    <select name="mts" className=" border-left-0 px-1 border-right-0 border timeDropIcon  mb-0 slectFontStyleDate py-1 h-auto">
                                                                                        <option value="sc">SS</option>
                                                                                        <option value="1">01</option>
                                                                                        <option value="2">02</option>
                                                                                        <option value="3">03</option>
                                                                                        <option value="4">04</option>
                                                                                        <option value="5">05</option>
                                                                                        <option value="6">06</option>
                                                                                        <option value="7">07</option>
                                                                                        <option value="8">08</option>
                                                                                        <option value="9">09</option>
                                                                                        <option value="10">10</option>
                                                                                        <option value="11">11</option>
                                                                                        <option value="12">12</option>
                                                                                        <option value="13">13</option>
                                                                                        <option value="14">14</option>
                                                                                        <option value="15">15</option>
                                                                                        <option value="16">16</option>
                                                                                        <option value="17">17</option>
                                                                                        <option value="18">18</option>
                                                                                        <option value="19">19</option>
                                                                                        <option value="20">20</option>
                                                                                        <option value="21">21</option>
                                                                                        <option value="22">22</option>
                                                                                        <option value="23">23</option>
                                                                                        <option value="24">24</option>
                                                                                        <option value="25">25</option>
                                                                                        <option value="26">26</option>
                                                                                        <option value="27">27</option>
                                                                                        <option value="28">28</option>
                                                                                        <option value="29">29</option>
                                                                                        <option value="30">30</option>
                                                                                        <option value="31">31</option>
                                                                                        <option value="32">32</option>
                                                                                        <option value="33">33</option>
                                                                                        <option value="34">34</option>
                                                                                        <option value="35">35</option>
                                                                                        <option value="36">36</option>
                                                                                        <option value="37">37</option>
                                                                                        <option value="38">38</option>
                                                                                        <option value="39">39</option>
                                                                                        <option value="40">40</option>
                                                                                        <option value="41">41</option>
                                                                                        <option value="42">42</option>
                                                                                        <option value="43">43</option>
                                                                                        <option value="44">44</option>
                                                                                        <option value="45">45</option>
                                                                                        <option value="46">46</option>
                                                                                        <option value="47">47</option>
                                                                                        <option value="48">48</option>
                                                                                        <option value="49">49</option>
                                                                                        <option value="50">50</option>
                                                                                        <option value="51">51</option>
                                                                                        <option value="52">52</option>
                                                                                        <option value="53">53</option>
                                                                                        <option value="54">54</option>
                                                                                        <option value="55">55</option>
                                                                                        <option value="56">56</option>
                                                                                        <option value="57">57</option>
                                                                                        <option value="58">58</option>
                                                                                        <option value="59">59</option>
                                                                                        <option value="60">60</option>
                                                                                    </select>
                                                                                    <select name="day" className="border-left-0 px-1 border   mb-0 slectFontStyleDate py-1 h-auto">
                                                                                        <option value="am">AM</option>
                                                                                        <option value="pm">PM</option>
                                                                                    </select>

                                                                                </div>

                                                                                {/* <TimePicker showSecond={false}
                                                                    name="ScheduleStartTime"
                                                                    
                                                                    // ref="StartTime"
                                                                    // ref={(value) => this.setState({ value })}
                                                                    // onChange={function(r){
                                                                    //     console.log(r)
                                                                    //     console.log(r)
                                                                    // }}
                                                                    // onChange={ } }
                                                                    
                                                                        use12Hours
                                                                        inputReadOnly
                                                                        className=" px-0" placeholder="Start Time" /> */}

                                                                                {/* <TimePicker
                                                                        showSecond={false}
                                                                        name="ScheduleEndTime"
                                                                        ref="EndTime"
                                                                        
                                                                        use12Hours
                                                                        inputReadOnly
                                                                        
                                                                        className=" px-0 ml-1" placeholder="End Time" /> */}


                                                                            </div>

                                                                        </div>
                                                                        <div className="col-md-4 d-flex text-center px-0 " data-toggle="tooltip" title="Interview Mode">
                                                                            <h6 className="text-dark ">Mode of Interviews : </h6>
                                                                            <Form.Group controlId="exampleForm.ControlSelect1"
                                                                                className="slectFontStyle mb-0 ml-1"  >
                                                                                <Form.Control as="select" ref="IntMode" required className="drp-cv py-0 h-auto slectFontStyle py-1 text-dark ">
                                                                                    <option disabled>select</option>
                                                                                    <option value="TelInterview">Telephonic</option>
                                                                                    <option value="VideoInterview">Video</option>
                                                                                </Form.Control>
                                                                            </Form.Group></div>
                                                                        {/* <div className="col-md-2 my-auto">
                               <div
                               className="btn btn-light border border-black btn-sm rounded ">Add More</div>
                           </div> */}
                                                                    </div>

                                                                    <div className="d-flex justify-content-around w-50 pr-5">
                                                                    </div>

                                                                </div>

                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {/* <button
                                                onClick={this.handleAddRow}
                                                className="btn btn-default pull-left"
                                            >
                                                Add Row
                </button> */}
                                            {/* <button
                                                onClick={this.handleRemoveRow}
                                                className="pull-right btn btn-default"
                                            >
                                                Delete Row
                </button> */}
                                            
                                        </div>

                                    </div>
                                    <div className=" mx-auto mt-4 text-center">
                                                <button className="btn btn-success" type="submit" value="Submit">
                                                    Save
                                    </button>
                                            </div>
                                </form>
                            </div>
                     
                     
                     



                        </div>
                  


                    </div>
</div>
</div>
)}}
                    
  export default App