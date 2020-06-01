import React, { Component } from "react";
import logo from './logo.png'
export class App extends Component {

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
    let M = this.dec2bin(parseInt(this.state.number_1));
    let Q = this.dec2bin(parseInt(this.state.number_2))
    let Qminus = 0 ;
    let process = [];
    let counter = this.state.num_bits;
    let A = "0".repeat(this.state.num_bits);
process = process.concat([<tr  key={-1}>
  <th scope="row">0</th>
<td>{A}</td>
  <td>{Q}</td>
  <td>{Qminus}</td>
  <td>Initialization</td>
  
</tr>]);
// console.log(M)
let key=0;
// console.log(this.dec2bin(~~parseInt(A,2)-~~parseInt(M)),~~parseInt(A,2),~~parseInt(M,2))
let flag = 1;
while(counter){
flag = 1;
if(Q[Q.length-1]+Qminus === "10"){
A = this.dec2bin(~~parseInt(A.length!==32?A[0].repeat(32-A.length)+A:A,2)-~~parseInt(M.length!==32?M[0].repeat(32-M.length)+M:M,2))
console.log("A-M",A)
process = process.concat([<tr key={key}>
  <th scope="row">{this.state.num_bits-counter+1}</th>
<td>{A}</td>
  <td>{Q}</td>
  <td>{Qminus}</td>
  <td>A = A - M</td>
  
</tr>]);
key++;

}
else if(Q[Q.length-1]+Qminus === "01"){
  A = this.dec2bin(~~parseInt(A.length!==32?A[0].repeat(32-A.length)+A:A,2)+~~parseInt(M.length!==32?M[0].repeat(32-M.length)+M:M,2))
 // console.log("A+M",A)
  process = process.concat([<tr key={key}>
    <th scope="row">{this.state.num_bits-counter+1}</th>
  <td>{A}</td>
    <td>{Q}</td>
    <td>{Qminus}</td>
    <td>A = A + M</td>
    
  </tr>]);
  key++;
}
else flag = 0;

Qminus = Q[Q.length-1];
Q = Q.slice(0,Q.length-1);
Q = A[A.length-1] + Q;
A = A.slice(0,A.length-1);
A = A[0] + A;
counter = counter - 1;
process = process.concat([<tr key={key}>
  <th scope="row">{flag===0?this.state.num_bits-counter:null}</th>
<td>{A}</td>
  <td>{Q}</td>
  <td>{Qminus}</td>
  <td>Arithematic Right Shift AQQ<sub>-1</sub></td>
  
</tr>]);
key++;
}
process = process.concat([<tr key={key}>
  <th scope="row"></th>
<td></td>
<td className="h3">{this.state.number_1} * {this.state.number_2} = {~~parseInt((A+Q).length<32?A[0].repeat(32-(A+Q).length)+(A+Q):A+Q,2)}</td>
  
  
</tr>]);
if(~~parseInt((A+Q).length<32?A[0].repeat(32-(A+Q).length)+(A+Q):A+Q,2)!==this.state.number_1*this.state.number_2){
process = [<tr className="h4 text-danger p-4 text-center">Not Enough Bits</tr>]
}
   this.setState({process})


  };
  
  render() {
    return (
      <div>
        <div className="navbar">
<div className="navbar-brand">
<img src={logo} alt="logo" style={{height:'30px',width:'auto'}}/>  Booth's Algorithm
</div>
        </div>
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
        
          <button className="btn btn-success m-4 btn-fluid btn-md" onClick={this.onClick}>Calculate !</button>
        </form>
        <table className="table">
        <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">A</th>
      <th scope="col">Q</th>
      <th scope="col">Q<sub>-1</sub></th>
      <th scope="col">Process</th>
    </tr>
  </thead><tbody>{this.state.process}</tbody></table>
  </div>
      </div>
    );
  }
}

export default App;
