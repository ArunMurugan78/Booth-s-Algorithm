import React, { Component } from "react";
import logo from './divide.png'
import {Link} from 'react-router-dom'
export class Division extends Component {

  state = {
    number_1: 0,
    number_2: 0,
    num_bits: 8,
    process:[]
  };

  dec2bin = (dec) => {
    var val = (dec >>> 0).toString(2);
    if (val.length < this.state.num_bits) {
      if (dec>=0) {
        val = "0".repeat(Math.abs(this.state.num_bits - val.length)) + val;
      } else {
        val = "1".repeat(Math.abs(this.state.num_bits - val.length)) + val;
      }
    } else {
      val = val.slice(val.length - this.state.num_bits);
    }
   
    return val;
  };
  
  onClick = (e) => {
    e.preventDefault();
    // console.log(this.dec2bin(parseInt(this.state.number_1)));
    if(this.state.number_1<0||this.state.number_2<=0){
      return;
    }
    let M = this.dec2bin(parseInt(this.state.number_2));
    let Q = this.dec2bin(parseInt(this.state.number_1))
   
    let process = [];
    let counter = this.state.num_bits;

    let A = "0".repeat(this.state.num_bits);
    
process = process.concat([<tr  key={-1}>
  <th scope="row">0</th>
  <td>{M}</td>
<td>{A}</td>
  <td>{Q}</td>

  <td>Initialization</td>
  
</tr>]);
 console.log(A,Q,M)

let key=0;

while(counter){



//Left Shift
A = A.slice(1)+Q[0];
Q = Q.slice(1);

let prev_A = A;

A = this.dec2bin(~~parseInt(A.length!==32?A[0].repeat(32-A.length)+A:A,2)-~~parseInt(M.length!==32?M[0].repeat(32-M.length)+M:M,2))



process = process.concat([<tr key={key}>
  <th scope="row">{this.state.num_bits-counter+1}</th>
  <td>{M}</td>
<td>{prev_A}</td>
  <td>{Q+"0"}</td>
 
  <td>Arithematic Left Shift</td>
  
</tr>]);
key++;
process = process.concat([<tr key={key}>
  <th scope="row"></th>
  <td>{M}</td>
<td>{A}</td>
  <td>{Q+"0"}</td>
 
  <td>A = A - M</td>
  
</tr>]);
key++;
if(A[0] ==="1"){

A = prev_A;
Q =Q + "0";
process = process.concat([<tr key={key}>
  <th scope="row"></th>
  <td>{M}</td>
<td>{A}</td>
  <td>{Q}</td>

  <td>Q<sub>0</sub> {"<--"} 0 <br/> Restoring A (A = A + M)</td>
  
</tr>]);
key++;
}
else {

Q =  Q+"1";
process = process.concat([<tr key={key}>
  <th scope="row"></th>
  <td>{M}</td>
<td>{A}</td>
  <td>{Q}</td>

  <td>Q<sub>0</sub> {"<--"} 1</td>
  
</tr>]);
key++;

}

counter = counter - 1;

key++;
console.log(A,Q);
}

process = process.concat([<tr key={key}>
  <th scope="row"></th>
<td></td>
<td className="h3">Quotient = {~~parseInt(Q,2)}<br/>Reminder = {~~parseInt(A,2)}</td>
  
  
</tr>]);

   this.setState({process})


  };
  
  render() {
    return (
      <div>
        <div className="navbar justify-content-center justify-content-md-between">
<div className="navbar-brand">
<img src={logo} alt="logo" style={{height:'30px',width:'auto'}}/>  Division Algorithm (Restoring)
</div>
<Link className="btn btn-secondary  btn-md m-3 m-md-0" to="/">
  Go To Booth's Algorithm
</Link>
        </div>
        <em className="m-4">Note : This Algorithm only works when both the numbers are Positive</em>
        <div className="container-fluid">

      
        <form >
          <div className="row">
          <label className="form-group m-4 col-xs-12 col-sm-12 col-md-4">
            Number of Bits :
            <input
              className="form-control"
              value={this.state.num_bits} 
              onChange={(e) =>{ if(e.target.value>=32){this.setState({ num_bits: 31})} else this.setState({ num_bits: e.target.value })}}
            />
          </label>

          <label className="form-group m-4 col-xs-12 col-sm-12 col-md-4">
            X :{" "}
            <input
              value={this.state.number_1}
              onChange={(e) => this.setState({ number_1: e.target.value })}
              className="form-control"
            />
          </label>

          <label className="form-group m-4 col-xs-12 col-sm-12 col-md-4">
            Y :{" "}
            <input
              value={this.state.number_2}
              onChange={(e) => this.setState({ number_2: e.target.value })}
              className="form-control"
            />
          </label>
          </div>
        
          <button className="btn btn-primary m-4  btn-md" onClick={this.onClick}>Calculate !</button>
        </form>
        <table className="table">
        <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">M</th>
      <th scope="col">A</th>

      <th scope="col">Q</th>
      
      <th scope="col">Process</th>
    </tr>
  </thead><tbody>{this.state.process}</tbody></table>
  </div>
      </div>
    );
  }
}

export default Division;
