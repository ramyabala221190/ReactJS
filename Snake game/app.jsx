import React from 'react';

var clearleft,clearright,cleartop,clearbottom="";
var min=10;
var max=70


class App extends React.Component
{
constructor(props)
{
    super(props);
}

render()
{
    return(<div><Snake></Snake></div>);
}
}

class Snake extends React.Component
{

constructor(props)
{
    super(props);

this.updateXPositivePosition=this.updateXPositivePosition.bind(this);
this.updateXNegativePosition=this.updateXNegativePosition.bind(this);
this.updateYPositivePosition=this.updateYPositivePosition.bind(this);
this.updateYNegativePosition=this.updateYNegativePosition.bind(this);
this.StartSnake=this.StartSnake.bind(this);
this.getRndInteger=this.getRndInteger.bind(this);


    this.state={
      snake_pos:{}
    }
    

}

componentDidMount()
{
this.changeDirection();
this.getRndInteger(min,max);
this.StartSnake("right");
}

StartSnake(direction)
{
var pos={left:document.getElementById("snake").offsetLeft,top:document.getElementById("snake").offsetTop};

if(direction=="right")
{
clearInterval(clearleft);
clearInterval(clearright);
clearInterval(cleartop);
clearInterval(clearbottom);
this.setState({snake_pos:pos},()=>{
clearright=setInterval(this.updateXPositivePosition,500);}
);
}
else if(direction=="left")
{
 clearInterval(clearleft);
clearInterval(clearright);
clearInterval(cleartop);
clearInterval(clearbottom);
this.setState({snake_pos:pos},()=>{
clearleft=setInterval(this.updateXNegativePosition,500);}
);
}
else if(direction=="up")
{
clearInterval(clearleft);
clearInterval(clearright);
clearInterval(cleartop);
clearInterval(clearbottom);
this.setState({snake_pos:pos},()=>{
cleartop=setInterval(this.updateYPositivePosition,500);}
);
}
else if(direction=="down")
{
clearInterval(clearleft);
clearInterval(clearright);
clearInterval(cleartop);
clearInterval(clearbottom);
this.setState({snake_pos:pos},()=>{
clearbottom=setInterval(this.updateYNegativePosition,500);}
);
}

}

changeDirection()
{
document.onkeyup=(event)=>  //this syntax is necessary for this.function_name() to be recognised
//function(event) cannot be used here due to this reason
{
  if(event.keyCode==37)
  {
    console.log("left key pressed");
    this.StartSnake("left");
  }
  else if(event.keyCode==39)
  {
console.log("right key pressed");
this.StartSnake("right");
  }
else if(event.keyCode==38)
  {
    console.log("up key pressed");
    this.StartSnake("up");
  }
  else if(event.keyCode==40)
  {
    console.log("down key pressed");
    this.StartSnake("down");
  }
}
}


updateXPositivePosition()
{
  this.setState((state)=>({snake_pos:{left:state.snake_pos.left+1,top:state.snake_pos.top}}),()=>{
 
    if(this.state.snake_pos.left >= 80)  //80 since 100 is width and height of outer div and 20 is of the inner div
  {
    clearInterval(clearright);
    alert("Snake has crashed into the wall!");
  } 
  else if(this.state.snake_pos.left+"px"==document.getElementById("apple").offsetLeft+"px" &&
  this.state.snake_pos.top+"px"==document.getElementById("apple").offsetTop+"px" )
  {
  console.log("snake ate apple");
  this.getRndInteger(min, max);
  }
  else
  {
    console.log(this.state.snake_pos.left);
    document.getElementById("snake").style.left=this.state.snake_pos.left+"px";
  }
  });
 
}

updateXNegativePosition()
{
  console.log("negative function called");
  this.setState((state)=>({snake_pos:{left:state.snake_pos.left-1,top:state.snake_pos.top}}),()=>{
    
    if(this.state.snake_pos.left <0)
  {
    clearInterval(clearleft);
    alert("Snake has crashed into the wall!");
    
  } 
  else if(this.state.snake_pos.left+"px"==document.getElementById("apple").offsetLeft+"px" &&
  this.state.snake_pos.top+"px"==document.getElementById("apple").offsetTop+"px")
  {
     console.log("snake ate apple");
  this.getRndInteger(min, max);
  }
  else
  {
    console.log(this.state.snake_pos.left);
    document.getElementById("snake").style.left=this.state.snake_pos.left+"px";
  }
  });
 
}

updateYPositivePosition()
{
  this.setState((state)=>({snake_pos:{left:state.snake_pos.left,top:state.snake_pos.top-1}}),()=>{
    
    if(this.state.snake_pos.top < 0)
  {
    clearInterval(cleartop);
    alert("Snake has crashed into the wall!");
  } 
  else if(this.state.snake_pos.left+"px"==document.getElementById("apple").offsetLeft+"px" &&
  this.state.snake_pos.top+"px"==document.getElementById("apple").offsetTop+"px")
  {
   console.log("snake ate apple");
  this.getRndInteger(min, max);
  }
  else
  {
    console.log(this.state.snake_pos.top);
    document.getElementById("snake").style.top=this.state.snake_pos.top+"px";
  }
  });
 
}

updateYNegativePosition()
{
  this.setState((state)=>({snake_pos:{left:state.snake_pos.left,top:state.snake_pos.top+1}}),()=>{
    
    if(this.state.snake_pos.top >=80)
  {
    clearInterval(clearbottom);
    alert("Snake has crashed into the wall!");
  } 
  else if(this.state.snake_pos.left+"px"==document.getElementById("apple").offsetLeft+"px" &&
  this.state.snake_pos.top+"px"==document.getElementById("apple").offsetTop+"px")
  {
   console.log("snake ate apple");
  this.getRndInteger(min, max);
  }
  else
  {
    console.log(this.state.snake_pos.top);
    document.getElementById("snake").style.top=this.state.snake_pos.top+"px";
  }
  });
 
}


getRndInteger(min, max) 
{
console.log("random function called");
document.getElementById("apple").style.left=Math.floor(Math.random() * (max - min + 1) ) + min +"px";
document.getElementById("apple").style.top=Math.floor(Math.random() * (max - min + 1) ) + min +"px";
}


render()
{
    return(<div id="gamebox">
        
 <div id="snake"></div>
 <Apple></Apple>     
        
        </div>);
} 


}

class Apple extends React.Component
{

render()
{
    return(<div>
         
    <div id="apple"></div>    
        </div>);
} 

}

export default App;