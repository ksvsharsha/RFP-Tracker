var app = angular.module('myapp', ['ui.grid']);
 
app.controller('MainCtrl', ['$scope', function ($scope)
 {

 	var getRAGStatus = function(grid, row, col, rowRenderIndex, colRenderIndex)
 	 {

/*var d1=row.entity.RFPReceivedDate
var d2=row.entity.ResponseDueDate
d1string = String(d1);
d2string = String(d2);
d1split = d1string.split("/");
d2split = d2string.split("/");
d1 = new Date(d1);
d2 = new Date(d2);
one = new Date(d1split[2], d1split[1]-1, d1split[0]),
two = new Date(d2split[2], d2split[1]-1, d2split[0]);

        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = Math.ceil(millisBetween / millisecondsPerDay);
        alert(days);*/

var d1 = row.entity.RFPReceivedDate
var d2 = row.entity.ResponseDueDate
d1 = new Date(d1);
d2 = new Date(d2);

var miliseconds = d2-d1;
var seconds = miliseconds/1000;
var minutes = seconds/60;
var hours = minutes/60;
var days = hours/24;

 
var g=Math.ceil(days*(30/100));
var gDate=d1.AddDays(g);
var a=Math.ceil(days*(60/100));
var s1=row.entity.RFPReceivedDate
s1=new Date(s1);
var aDate=s1.AddDays(a);
var r=Math.ceil(days-a);



var sysDate = new Date(); 




if(sysDate<=gDate)
{
 
    return "green";
}

else if(sysDate>gDate && sysDate<=aDate)
{
	
  return "yellow";
}
else if(sysDate>aDate && sysDate<=d2)
{
	
  return "red";
}

}

Date.prototype.AddDays = function(noOfDays) 
{
    this.setTime(this.getTime() + (noOfDays * (1000 * 60 * 60 * 24)));
        return this;
}


 	$scope.mydata={
    
 	 columnDefs: [
          { name:'SL No', field: 'SlNo', width:'5%'},
          { name:'RFP ID', field: 'RFPID', width:'5%'},
          { name:'RFP High Level Details', field: 'RFPHighLevelDetails',  width:'10%' },
          { name:'RFP Received Date', field: 'RFPReceivedDate',type:'date' ,cellFilter:'date:"dd-MM-yyyy"', width:'5%'},
          { name:'Response Due Date', field: 'ResponseDueDate' ,type:'date' ,cellFilter:'date:"dd-MM-yyyy"', width:'5%'},
          { name:'RAG Status',field:'RAGStatus' ,enableCellEdit:false, width:'5%',cellClass: getRAGStatus},
          { name:'Business Division', field: 'BusinessDivision' , width:'5%'},
          { name:'No. of Positions', field: 'NoofPositions', width:'5%' },
          { name:'Role', field: 'Role' , width:'5%'},
          { name:'Experience', field: 'Experience' , width:'5%' },
          { name:'Primiary Skills', field: 'PrimiarySkills', width:'10%' },
          { name:'Responsibilities', field: 'Responsibilities' , width:'8%'},
          { name:'GE Hiring Manager', field: 'GEHiringManager', width:'5%' },
          { name:'Sutherland Spoc', field: 'SutherlandSpoc' , width:'5%'},
          { name:'Requirements', field: 'Requirements', width:'10%' },
          { name:'Remarks', field: 'Remarks', width:'10%' },
          {name:'Link',cellTemplate:'<div>' + '<a href="http://stackoverflow.com">View</a>' + '</div>', width:'3%'}
        ]};
      /* var database=TAFFY( [       {
        "SlNo":1,"RFPID":101, "RFPHighLevelDetails":500,"RFPReceivedDate": new Date('02/05/2016'), "ResponseDueDate":new Date('2016-02-18'),
        "RAGStatus":"", "BusinessDivision":"G2", "NoofPositions":5,"Role":"ASE", "Experience":3,"PrimiarySkills":"java",
        "Responsibilities":"ASE", "GEHiringManager":"Naresh","SutherlandSpoc":"abc","Requirements":"def","Remarks":"good",

    },
    {
         "SlNo":2,"RFPID":102, "RFPHighLevelDetails":501,"RFPReceivedDate":new Date('02/12/2016'), "ResponseDueDate":new Date('02/20/2016'),
        "RAGStatus":"", "BusinessDivision":"G2", "NoofPositions":2,"Role":"ASE", "Experience":1,"PrimiarySkills":"ASP",
        "Responsibilities":"ASE", "GEHiringManager":"Naresh","SutherlandSpoc":"abc","Requirements":"def","Remarks":"good",
    },
    {
        "SlNo":3,"RFPID":103, "RFPHighLevelDetails":502,"RFPReceivedDate":new Date('02/13/2016'), "ResponseDueDate":new Date('02/20/2016'),
        "RAGStatus":"", "BusinessDivision":"G2", "NoofPositions":1,"Role":"ASE", "Experience":2,"PrimiarySkills":".Net",
        "Responsibilities":"ASE", "GEHiringManager":"Naresh","SutherlandSpoc":"abc","Requirements":"def","Remarks":"good",
    }
                   ]);*/

var database=TAFFY();
database.store("tabledata");
$scope.mydata.data=database().get("tabledata");

//reset function       
 $scope.reset=function()
 {
  $scope.fromdate="";
  $scope.todate="";
  $scope.opt=$scope.active;
 }
//radio buttons checked
$scope.ShowHideDiv=function()
{
	var chkYes = document.getElementById("chkYes");
	var chkNo = document.getElementById("chkNo");
    var dvdate = document.getElementById("dvdate");
    var dvstatus = document.getElementById("dvstatus");
    dvdate.style.display = chkYes.checked ? "block" : "none";
    dvstatus.style.display=chkNo.checked?"block": "none";
} 
//converting date 
$scope.getDate = function(dt)
{
    dt =new Date(dt);
}
//diff between dates
$scope.dateDiff=function(fromdate,todate)
{
var d1 = $scope.fromdate;
var d2 = $scope.todate;
var miliseconds = d2-d1;
var seconds = miliseconds/1000;
var minutes = seconds/60;
var hours = minutes/60;
var days = hours/24;
alert(days);
}
$scope.filter=function(fromdate,todate)
{
	
	var x= document.getElementById("chkYes").checked;
	var y= document.getElementById("chkNo").checked;
	if(x==true)
	{
		
		var x=database({RFPReceivedDate:{'>=':fromdate}},{ResponseDueDate:{'<=':todate}}).count();
		alert(x);
		

	}
}

}]);
