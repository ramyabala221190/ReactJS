import React from 'react';

class App extends React.Component
{

	
render()
{
return(
<div>
<h4> Tic Tac Toe</h4>
<GameSkeleton></GameSkeleton>
</div>
);
}	
	
}

class GameSkeleton extends React.Component
{
constructor(props)
{
    super(props);
this.state=
{
    player:'X',
    move_no:0,
    next_player:'O',
    winner:'',
    box_no:"",
    box_location:"",
    history:""
}
    this.boxClicked=this.boxClicked.bind(this);
    this.UpdateBoxContent=this.UpdateBoxContent.bind(this);
    this.DecidingWinner=this.DecidingWinner.bind(this);
    this.DisableAfterWin=this.DisableAfterWin.bind(this);
    this.FindBoxLocation=this.FindBoxLocation.bind(this);
   this.obj=[];
}

boxClicked(event)
{

if(this.state.winner !=="")
{
alert("Game is over! You cant make further moves.");
}
else if(document.getElementById(event.target.id).disabled=="true")
{
alert("That move has already been made.Choose some other box");
}

else
{
var inner=document.getElementById('outerbox').getElementsByTagName('div');
var firstmoveflag=true;
var divId=event.target.id;

this.FindBoxLocation();

for(var i=0;i<inner.length;i++)
{
var innerDivId=inner[i].id;
if(document.getElementById(innerDivId).disabled=="true")
{
    firstmoveflag=false;
    break;
}
}


if(firstmoveflag==false)
{
    console.log("Not the first move");
if(this.state.player=='X')
  {
      this.setState({player:'O',next_player:'X'},()=>{this.UpdateBoxContent()});

  }
  else
  {
    this.setState({player:'X',next_player:'O'},()=>{this.UpdateBoxContent()});
  }

  
}
else
{
    document.getElementById(divId).innerHTML=this.state.player;

    this.obj.push({1:document.getElementById('box1').innerHTML,
2:document.getElementById('box2').innerHTML,
3:document.getElementById('box3').innerHTML,
4:document.getElementById('box4').innerHTML,
5:document.getElementById('box5').innerHTML,
6:document.getElementById('box6').innerHTML,
7:document.getElementById('box7').innerHTML,
8:document.getElementById('box8').innerHTML,
9:document.getElementById('box9').innerHTML}
);
        console.log("Its the first move");
}


this.setState((state,props)=>({move_no:state.move_no +1,box_no:divId,history:this.obj}),()=>{this.DecidingWinner()});
document.getElementById(divId).disabled="true";
//document.getElementById(divId).style.backgroundColor="grey";


}

}

FindBoxLocation()
{
var row=0,column=0;
if(event.target.id.substring(3)=='1')
{
  row=1;
  column=1;  
}
else if(event.target.id.substring(3)=='2')
{
row=1;
  column=2; 
}
else if(event.target.id.substring(3)=='3')
{
row=1;
  column=3; 
}
else if(event.target.id.substring(3)=='4')
{
row=2;
  column=1; 
}
else if(event.target.id.substring(3)=='5')
{
row=2;
  column=2; 
}
else if(event.target.id.substring(3)=='6')
{
row=2;
  column=3; 
}
else if(event.target.id.substring(3)=='7')
{
row=3;
  column=1; 
}
else if(event.target.id.substring(3)=='8')
{
row=3;
  column=2; 
}
else if(event.target.id.substring(3)=='9')
{
row=3;
  column=3; 
}

this.setState({box_location:"("+column+","+row+")"});
}

UpdateBoxContent()
{
document.getElementById(event.target.id).innerHTML=this.state.player;

this.obj.push({1:document.getElementById('box1').innerHTML,
2:document.getElementById('box2').innerHTML,
3:document.getElementById('box3').innerHTML,
4:document.getElementById('box4').innerHTML,
5:document.getElementById('box5').innerHTML,
6:document.getElementById('box6').innerHTML,
7:document.getElementById('box7').innerHTML,
8:document.getElementById('box8').innerHTML,
9:document.getElementById('box9').innerHTML}
);

}

DecidingWinner()
{
console.log(this.state.history);
//first horizantal
if(document.getElementById('box1').innerHTML== document.getElementById('box2').innerHTML &&
document.getElementById('box1').innerHTML== document.getElementById('box3').innerHTML &&
document.getElementById('box1').innerHTML !=="")
{
this.setState({winner:document.getElementById('box1').innerHTML});
document.getElementById('box1').style.backgroundColor="green";
document.getElementById('box2').style.backgroundColor="green";
document.getElementById('box3').style.backgroundColor="green";
 this.DisableAfterWin();
}

//2nd horizontal
else if(document.getElementById('box4').innerHTML== document.getElementById('box5').innerHTML &&
document.getElementById('box4').innerHTML== document.getElementById('box6').innerHTML &&
document.getElementById('box4').innerHTML !=="")
{
this.setState({winner:document.getElementById('box4').innerHTML});
document.getElementById('box4').style.backgroundColor="green";
document.getElementById('box5').style.backgroundColor="green";
document.getElementById('box6').style.backgroundColor="green";
 this.DisableAfterWin();
}

//3rd horizontal
else if(document.getElementById('box7').innerHTML== document.getElementById('box8').innerHTML &&
document.getElementById('box7').innerHTML== document.getElementById('box9').innerHTML &&
document.getElementById('box7').innerHTML !=="")
{
this.setState({winner:document.getElementById('box7').innerHTML});
document.getElementById('box7').style.backgroundColor="green";
document.getElementById('box8').style.backgroundColor="green";
document.getElementById('box9').style.backgroundColor="green";
 this.DisableAfterWin();
}

//1st vertical
else if(document.getElementById('box1').innerHTML== document.getElementById('box4').innerHTML &&
document.getElementById('box1').innerHTML== document.getElementById('box7').innerHTML &&
document.getElementById('box1').innerHTML !=="")
{
this.setState({winner:document.getElementById('box1').innerHTML});
document.getElementById('box1').style.backgroundColor="green";
document.getElementById('box4').style.backgroundColor="green";
document.getElementById('box7').style.backgroundColor="green";
 this.DisableAfterWin();
}

//2nd vertical
else if(document.getElementById('box2').innerHTML== document.getElementById('box5').innerHTML &&
document.getElementById('box2').innerHTML== document.getElementById('box8').innerHTML &&
document.getElementById('box2').innerHTML !=="")
{
this.setState({winner:document.getElementById('box2').innerHTML});
document.getElementById('box2').style.backgroundColor="green";
document.getElementById('box5').style.backgroundColor="green";
document.getElementById('box8').style.backgroundColor="green";
 this.DisableAfterWin();
}

//3rd vertical
else if(document.getElementById('box3').innerHTML== document.getElementById('box6').innerHTML &&
document.getElementById('box3').innerHTML== document.getElementById('box9').innerHTML &&
document.getElementById('box3').innerHTML !=="")
{
this.setState({winner:document.getElementById('box3').innerHTML});
document.getElementById('box3').style.backgroundColor="green";
document.getElementById('box6').style.backgroundColor="green";
document.getElementById('box9').style.backgroundColor="green";
 this.DisableAfterWin();
}

//left to right diagonal
else if(document.getElementById('box1').innerHTML== document.getElementById('box5').innerHTML &&
document.getElementById('box1').innerHTML== document.getElementById('box9').innerHTML &&
document.getElementById('box1').innerHTML !=="")
{
this.setState({winner:document.getElementById('box1').innerHTML});
document.getElementById('box1').style.backgroundColor="green";
document.getElementById('box5').style.backgroundColor="green";
document.getElementById('box9').style.backgroundColor="green";
 this.DisableAfterWin();
}

//right to left diagonal
else if(document.getElementById('box3').innerHTML== document.getElementById('box5').innerHTML &&
document.getElementById('box3').innerHTML== document.getElementById('box7').innerHTML &&
document.getElementById('box3').innerHTML !=="")
{
this.setState({winner:document.getElementById('box3').innerHTML});
document.getElementById('box3').style.backgroundColor="green";
document.getElementById('box5').style.backgroundColor="green";
document.getElementById('box7').style.backgroundColor="green";
 this.DisableAfterWin();
}



}

DisableAfterWin()
{

var inner=document.getElementById('outerbox').getElementsByTagName('div');

for(var i=0;i<inner.length;i++)
{
var innerDivId=inner[i].id;
document.getElementById(innerDivId).disabled="true";
}  
}

render()
{
return(
<div>
<div id="outerbox">
<div onClick={this.boxClicked} className="innerDiv" id="box1"></div>
<div onClick={this.boxClicked} className="innerDiv" id="box2"></div>
<div onClick={this.boxClicked} className="innerDiv" id="box3"></div>
<div onClick={this.boxClicked} className="innerDiv" id="box4"></div>
<div onClick={this.boxClicked} className="innerDiv" id="box5"></div>
<div onClick={this.boxClicked} className="innerDiv" id="box6"></div>
<div onClick={this.boxClicked} className="innerDiv" id="box7"></div>
<div onClick={this.boxClicked} className="innerDiv" id="box8"></div>
<div onClick={this.boxClicked} className="innerDiv" id="box9"></div>
</div>
<GameDetails player={this.state.player} next={this.state.next_player} hist={this.state.history} box={this.state.box_no} boxloc={this.state.box_location} move={this.state.move_no} win={this.state.winner}></GameDetails>
</div>
);

}

}

class GameDetails extends React.Component
{
constructor(props)
{
    super(props);

    //this.highlightMove=this.highlightMove.bind(this);
    this.reverseMoves=this.reverseMoves.bind(this);
    this.OriginalMoves=this.OriginalMoves.bind(this);
    //this.viewMoveHistory=this.viewMoveHistory.bind(this);

}

highlightMove(box)
{
document.getElementById(box).style.borderColor="aqua";
document.getElementById(box).style.borderWidth="1px";
document.getElementById(box).style.borderStyle="solid";

setTimeout(()=>{
document.getElementById(box).style.borderColor="black";
document.getElementById(box).style.borderWidth="1px";
document.getElementById(box).style.borderStyle="solid";

},2000);

}

OriginalMoves()
{
console.log("function called");
if(document.getElementById('moves').getElementsByTagName('button').length==0)
    {
for(var k=document.getElementById('reversemoves').getElementsByTagName('button').length-1;k>=0;k--)
{
document.getElementById('moves').appendChild(document.getElementById('reversemoves').getElementsByTagName('button')[k]);
document.getElementById('moves').appendChild(document.getElementById('reversemoves').getElementsByTagName('br')[k]);
}
    }
    

  document.getElementById('desc').disabled=false;
  document.getElementById('asc').disabled=true;

  return false;
}

reverseMoves()
{ 
if(document.getElementById('reversemoves').getElementsByTagName('button').length==0)
    {
for(var j=document.getElementById('moves').getElementsByTagName('button').length-1;j>=0;j--)
{
document.getElementById('reversemoves').appendChild(document.getElementById('moves').getElementsByTagName('button')[j]);
document.getElementById('reversemoves').appendChild(document.getElementById('moves').getElementsByTagName('br')[j]);
}
    }

    document.getElementById('desc').disabled=true;
    document.getElementById('asc').disabled=false;
return false;
}

viewMoveHistory(moveno)
{
var box_no=0;

for(var m=0;m<this.props.hist.length;m++)
{

if(m==(moveno-1))
{
for(var k=1;k<=9;k++)
{
document.getElementById("box"+k).innerHTML=this.props.hist[m][k];
}
break;
}
}
}

    render()
    {
let winner,player,next,draw,toggleAsc,toggleDesc;

if(this.props.move > 0 && this.props.win =="")
{
var moveno=this.props.move;
var box=this.props.box;
var boxloc=this.props.boxloc;
var button=document.createElement('button');
var button1=document.createElement('button');
var breaks=document.createElement('br');
button.innerHTML="Highlight move #"+moveno+" "+"at"+" "+box+"-"+boxloc;
button1.innerHTML="Move back to #"+moveno;
button1.onclick=()=>{this.viewMoveHistory(moveno); return false;}
button.onclick=()=>{this.highlightMove(box); return false;}
document.getElementById('moves').appendChild(button);
document.getElementById('movehistory').appendChild(button1);
document.getElementById('moves').appendChild(breaks);

}

if(this.props.win !=="")
{
winner=<h3>Winner is {this.props.win}</h3>;
toggleDesc=<button id="desc" onClick={this.reverseMoves}>Arrange moves in Reverse Order</button>
toggleAsc=<button id="asc" onClick={this.OriginalMoves}>Arrange moves in Original Order</button>

}
else
{
 if(this.props.move < 9)
 {   
player=<p>Current Player:{this.props.player}</p>;
next=<p>Next Player:{this.props.next}</p>;
 }
 else
 {
     draw=<h3>Its a DRAW</h3>;

 }
}
        return(<div>
{player}
{next}
{winner}
{draw}
{toggleDesc}{toggleAsc}
<br/>
<div id="moves"></div>
<div id="reversemoves"></div>
<br/>
<p>Move History</p>
<div id="movehistory"></div>
            
            </div>);
    }
}

export default App;