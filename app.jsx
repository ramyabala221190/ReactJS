import React from 'react';

const axios=require('axios');

class App extends React.Component
{
	constructor(props)
	{
		super(props);
this.state=
{
	header:"Introduction to React",
	content:"React uses JSX for templating instead of regular JavaScript.",
	footer:"Do you see the benefits of React?"
}

	}
	render()
	{
	return(
		<div>
	<AjaxExample></AjaxExample>
    <DisplayJSON></DisplayJSON>
	<Form></Form>
	<Counter></Counter>
	<TemperatureCalc></TemperatureCalc>
	<EventHandling></EventHandling>
	<Header headerProps={this.state.header}></Header>
	<Content contentProps={this.state.content}></Content>
	<Footer footerProps={this.state.footer}></Footer>
	</div>
	);
	}
}

class Header extends React.Component
{
constructor(props)
{
	super(props);

this.message="hello!";
}	
render()
{
	
	return(<div>
<Clock></Clock>
		<p>{this.message}This is the header</p>
	<b>{this.props.headerProps}</b>
	
	</div>
	
	
	);
}

}

class Content extends React.Component
{

render()
{

	return (<div><p>This is the content</p>
	
	<b>{this.props.contentProps}</b>
	</div>);
}


}

class Footer extends React.Component
{
render()
{

	return (<div><p>This is the Footer</p>
	
	<b>{this.props.footerProps}</b>
	</div>);
}


}

//Reusable component that can be used multiple times anywhere
class Clock extends React.Component
{
constructor(props)
	{
super(props);

this.state={
time:new Date()
}
this.tick=this.tick.bind(this); //It is necessary to bind a callback function before using it.
	}

componentDidMount() //pre-defined function called once component is loaded
{
	console.log("clock component loaded");
this.timer=setInterval(this.tick,1000);
}

componentWillUnmount()
{
console.log("clock component unloaded");
clearInterval(this.timer);
}

tick()
{
	console.log("tick called");
	this.setState({time:new Date()}); //whenever this.state changes, setState gets called to update the date property and react
	//then calls render() to update the updated value in the DOM.
}

render()
{
return(
<div>{this.state.time.toLocaleTimeString()}</div>
);

}

}

//Demonstrating updating state of multiple properties of this.state
class Counter extends React.Component
{
	constructor(props)
	{
		super(props);

this.state={
x:1,
y:100
}

this.increment=this.increment.bind(this);

	}

	componentDidMount()
	{
this.timer1=setInterval(this.increment,2000);

	}

	componentWillUnmount()
	{
clearInterval(this.timer1);

	}

	increment()
	{
		this.setState((state,props)=>({x:state.x+1,y:state.y-1}));
	}


	render()
	{
return(<div>
	<p>x:{this.state.x}</p>
	<p>y:{this.state.y}</p>

</div>);

	}
}

//Demonstrates how to use lists and keys
class EventHandling extends React.Component
{
constructor(props)
{
	super(props);
	
this.listitem="";
this.arrlist=[]
this.addElement=this.addElement.bind(this);
this.deleteElement=this.deleteElement.bind(this);
this.updateElement=this.updateElement.bind(this);
this.state={
item:this.listitem
}

}


addElement()
{

this.arrlist.push({id:this.arrlist.length+1,itemname:document.getElementById('item_name').value});
this.updateElement();

}

updateElement()
{
this.listitem=this.arrlist.map((item)=><li key={item.toString()}>{item.itemname}<button id={item.id} onClick={this.deleteElement}>Delete</button></li>);

this.setState({item:this.listitem});//this calls render()
}

deleteElement(e)
{
console.log(e.target.id);
for(var i=0;i<this.arrlist.length;i++)
{
	if(e.target.id==this.arrlist[i].id)
	{
	this.arrlist.splice(i,1);
    this.updateElement();
	break;	
	}
}

}

/**
 * Enter the item name in the text box and click on the button to add to the list.
 * addElement() is called. We are pushing the item to the array. The array has 2 properties:id and itemname.
 * Every element in the array is an item which has an id and a name.
 * So this item keeps changing. Its values keep changing. So we need to add it to this.state
 * When does the state of the item get changed? when we add/delete an item.
 * When we add an item, arraylist gets updated,next we are mapping the arraylist to <li> and <button> tag.
 * This mapping detail is stored in this.listitem
 * Finally we are calling setState()
 * Only when we call setState(), the updated list will be reflected in the DOM.
 * 
 */

render()
{

return(
<div>
<input id="item_name" type="text"/>
<button onClick={this.addElement}>Add Item</button>
<ol>{this.state.item}</ol>
</div>
);

}

}

//Demonstrates Forms
class Form extends React.Component
{

	constructor(props)
	{
		super(props);

this.state={
select_value:"",
input_value:"",
selectedOption:"",
check1:false,
check2:false,
check3:false
}

this.formSubmit=this.formSubmit.bind(this);
this.changeEvent_textBox=this.changeEvent_textBox.bind(this);
this.changeEvent_SelectBox=this.changeEvent_SelectBox.bind(this);
this.changeEvent_radio=this.changeEvent_radio.bind(this);
this.changeEvent_check1=this.changeEvent_check1.bind(this);
this.changeEvent_check2=this.changeEvent_check2.bind(this);
this.changeEvent_check3=this.changeEvent_check3.bind(this);
	}

formSubmit(event)
{
console.log(this.state); //checking the state of all elements in the form
}

changeEvent_textBox(event) //updating the state of text box
{
	this.setState({input_value:event.target.value});
}

changeEvent_SelectBox(event) //updating the state of the drop down
{
this.setState({select_value:event.target.value})
}

changeEvent_radio(event) //updating the state of radio buttons
{
this.setState({selectedOption:event.target.value});
}

//updating the state of the checkboxes
changeEvent_check1(event)
{
	this.setState((state,props)=>({check1:!state.check1}));
}

changeEvent_check2(event)
{
	this.setState((state,props)=>({check2:!state.check2}));
}

changeEvent_check3(event)
{
	this.setState((state,props)=>({check3:!state.check3}));
}


render()
{
return(
<div>
<form name="testForm">
<input type="text" name="textbox" value={this.state.input_value} onChange={this.changeEvent_textBox} placeholder="Enter any text..."/>
<br/>
Male<input type="radio" name="gender" onChange={this.changeEvent_radio} value="male" checked={this.state.selectedOption ==='male'}/>
Female<input type="radio" name="gender" onChange={this.changeEvent_radio} value="female" checked={this.state.selectedOption ==='female'}/>
<br/>

A<input type="checkbox" name="rubbishA" onChange={this.changeEvent_check1} value="A" checked={this.state.check1}/>
B<input type="checkbox" name="rubbishB" onChange={this.changeEvent_check2} value="B" checked={this.state.check2}/>
C<input type="checkbox" name="rubbishC" onChange={this.changeEvent_check3} value="C" checked={this.state.check3}/> 
<br/>

<select value={this.state.select_value} onChange={this.changeEvent_SelectBox}>
<option value="none">Select</option>
<option value="tea">Tea</option>
<option value="coffee">Coffee</option>
<option value="milk">Milk</option>
</select>

<br/>

<button type="button" onClick={this.formSubmit}>Submit</button>

</form>
</div>
);
}

}

//Temperature Conversion

class TemperatureCalc extends React.Component
{

	constructor(props)
	{
super(props);

this.state={
	cel:0,
	fah:0
}

this.toFah=this.toFah.bind(this);
this.toCel=this.toCel.bind(this);
	}

toFah(event)
{
this.setState({fah:((event.target.value*9)/5)+32});
this.setState({cel:event.target.value});
}

toCel(event)
{
this.setState({cel:(event.target.value-32)*5/9});
this.setState({fah:event.target.value});
}

render()
{
	return(
<div>
<label id="deg_cel">Enter in Celcius</label>
<input type="text" id="deg_cel" name="celcius" value={this.state.cel} onChange={this.toFah}/>

<br/>

<label id="deg_fah">Enter in Fahrenheit</label>
<input type="text" id="deg_fah" name="fahren" value={this.state.fah} onChange={this.toCel}/>

<br/>

<h2><BoilingWater result={this.state.cel}></BoilingWater></h2>

</div>
);
}

}

class BoilingWater extends React.Component
{
	constructor(props)
	{
		super(props);

	}
render()
{
if(this.props.result >=100)
{
	return(
<div>Water will boil</div>
);
}
else
{
return(
<div>Water wont boil</div>
);
}

}
}

//displaying existing JSON data in a table
class DisplayJSON extends React.Component
{
constructor(props)
{
	super(props);

this.state=
{
sporting:[],
electronic:[],
Instock:[],
onlyStock:false,
search:""
}

this.searchChanged=this.searchChanged.bind(this);
this.checkChanged=this.checkChanged.bind(this);
this.filterResults=this.filterResults.bind(this);
}

componentDidMount()
{
const jsondata=[
  //{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  //{category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];


for(var i=0;i<jsondata.length;i++)
{
if(jsondata[i].category !=="Electronics")
{
	this.state.sporting.push(jsondata[i]);

	if(jsondata[i].stocked)
	{
		this.state.Instock.push(jsondata[i]);
	}
}
else
{
this.state.electronic.push(jsondata[i]);	

if(jsondata[i].stocked)
	{
		this.state.Instock.push(jsondata[i]);
	}

}
}

}

searchChanged(event)
{
	this.setState({search:event.target.value});  
}

filterResults(event)
{
var table=document.getElementById('tab');
  var tr=table.getElementsByTagName('tr');

for(var i=0;i<tr.length;i++)
{
var tdname=tr[i].getElementsByTagName('td')[0];

if(tdname)
{
	var tdvalue=tdname.textContent||tdname.innerText;
	if(tdvalue.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
	{
		tr[i].style.display="block";
	}
	else
	{
		tr[i].style.display='none';
	}
}

}
}

checkChanged(event)
{
this.setState({search:""});  

this.setState((state,props)=>({onlyStock:!state.onlyStock}));

}

	render()
	{
let sporting,electron,stocking;
if(this.state.onlyStock==false)
{
sporting=<SportingGoods sport={this.state.sporting}></SportingGoods>;
electron=<Electronics elect={this.state.electronic}></Electronics>;
}
else
{
stocking=<ProductsInStock stock={this.state.Instock}></ProductsInStock>;	
}

		return(
	<div className="outerDiv">
		<br/>
	<div className="innerDiv">
	<input type="text" name="search" placeholder="Search..." value={this.state.search} onChange={this.searchChanged} onKeyUp={this.filterResults}/>
<br/>
	<input type="checkbox" name="prodInStock" checked={this.state.onlyStock} onChange={this.checkChanged}/>
	<span>Only show products in Stock</span>

	</div>

	<br/>
		<table id="tab">
			<thead>
				<tr>
					<th>Category</th>
					<th>Price</th>
					</tr>
					</thead>
			 {sporting}
             {electron}
             {stocking}
			</table>
<br/>
	</div>
		);
	}
}

class SportingGoods extends React.Component
{

constructor(props)
{
	super(props);
this.state={
sportsProp:null //set it to null to avoid whitespace error
}

}

componentDidMount()
{

this.setState((state,props)=>({sportsProp: props.sport.map((item)=><tr><td className="tdCommonStyle">{item.name}</td><td className="tdCommonStyle">{item.price}</td></tr>)}));

}

render()
{


	return(
<tbody><tr><td className="tdStyle">Sporting Goods</td></tr>{this.state.sportsProp}</tbody>
	);
}

}

class Electronics extends React.Component
{
constructor(props)
{
	super(props);

	this.state={
elecProp:null //set it to null to avoid whitespace error
}



}

componentDidMount()
{

this.setState((state,props)=>({elecProp:props.elect.map((item)=><tr><td className="tdCommonStyle">{item.name}</td><td className="tdCommonStyle">{item.price}</td></tr>)}));

}


render()
{

	return(

<tbody><tr><td className="tdStyle">Electronics</td></tr>{this.state.elecProp}</tbody>

	);
}

}

class ProductsInStock extends React.Component
{
constructor(props)
{
	super(props);

	this.state={
	stockedSportProducts:null,
	stockedElecProducts:null	
	}
}

componentDidMount()
{
var SportProdInStock=[];
var ElectProdInStock=[];
for(var i=0;i<this.props.stock.length;i++)
{
if(this.props.stock[i].category !=="Electronics")
{
SportProdInStock.push(this.props.stock[i]);

}
else
{
ElectProdInStock.push(this.props.stock[i]);	

}
}

if(SportProdInStock.length > 0)
{
this.setState((state,props)=>({
stockedSportProducts:SportProdInStock.map(
(item)=><tr><td className="tdCommonStyle">{item.name}</td><td className="tdCommonStyle">{item.price}</td></tr>
)}));
}

if(ElectProdInStock.length > 0)
{
this.setState((state,props)=>({
stockedElecProducts:ElectProdInStock.map(
(item)=><tr><td className="tdCommonStyle">{item.name}</td><td className="tdCommonStyle">{item.price}</td></tr>
)}));
}

}

render()
{
let spo_msg,ele_msg;

if(this.state.stockedSportProducts ==null)
{
spo_msg=<tr><td style={{color:'red',fontWeight:'600'}}>No Sporting Goods in Stock</td></tr>
}

if(this.state.stockedElecProducts ==null)
{
ele_msg=<tr><td style={{color:'red',fontWeight:'600'}}>No Electronics Goods in Stock</td></tr>
}

return(
<tbody>
<tr><td className="tdStyle">Sporting Goods</td></tr>
{this.state.stockedSportProducts}
{spo_msg}
<tr><td className="tdStyle">Electronics</td></tr>
{this.state.stockedElecProducts}
{ele_msg}
</tbody>
);
}

}

class AjaxExample extends React.Component
{

	constructor(props)
	{
		super(props);
this.IsMounted=false; //this is needed to prevent memory leak warnings
this.CreateTable=this.CreateTable.bind(this);
		this.state={
	resp:[],
	error:"",
	final:null
		}
	}


componentDidMount()
{
this.IsMounted=true;
axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then((response)=>
  {
	  if(this.IsMounted)
	  {
    // handle success
    console.log(response);
var res=[];
res.push(response.data);	

this.setState({resp:res},()=>{this.CreateTable()});
	  }
  })
  .catch((error)=> {
    // handle error
    console.log(error);
this.setState({error:error});
  })
  .then(()=> {
    // always executed
  });
}

componentWillUnmount()
{
this.IsMounted=false;	
}

CreateTable()
{
console.log(this.state.resp);

this.setState({final:this.state.resp.map((item)=>

<tr>
<td>{item.userId}</td>
<td>{item.id}</td>
<td>{item.title}</td>
<td>{item.completed}</td>
</tr>
)});
}

render()
{

return(<div>
	<table>
		<thead><tr>
			<th>UserId</th>
			<th>Id</th>
			<th>Title</th>
			<th>Completed</th>
			</tr></thead>
			<tbody>
	{this.state.final}
	</tbody>
	</table>
	<br/>
{this.state.error}
</div>);
}

}

export default App;