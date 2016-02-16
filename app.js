var app = angular.module('myapp', ['ui.grid','ui.grid.edit','ui.grid.resizeColumns','ui.grid.moveColumns']);
 


app.controller('MainCtrl', ['$scope', function ($scope)
 {

//RAG Status

var getRAGStatus = function(grid, row, col, rowRenderIndex, colRenderIndex) 
{
   
var d1=row.entity.RFPReceivedDate
var d2=row.entity.ResponseDueDate
d1 = new Date(d1);
d2 = new Date(d2);

var miliseconds = d2-d1;
var seconds = miliseconds/1000;
var minutes = seconds/60;
var hours = minutes/60;
var days = hours/24;
//alert(days);

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
   row.entity.Status="Green";
   return "green";
}
else if(sysDate>gDate && sysDate<=aDate)
{
   row.entity.Status="Amber";
   return "amber";
}
else if(sysDate>aDate && sysDate<=d2)
{
   row.entity.Status="Red";
   return "red";
}
else if(sysDate>d2)
{
  row.entity.Status="Inactive";
}
}
Date.prototype.AddDays = function(noOfDays) {
    this.setTime(this.getTime() + (noOfDays * (1000 * 60 * 60 * 24)));
    return this;
}

//column definitions

  $scope.mydata={
   columnDefs: [

          { name:'SL No', field: 'SlNo',width:'5%'},
          { name:'RFP ID', field: 'RFPID',width:'5%'},
          { name:'RFP High Level Details', field: 'RFPHighLevelDetails',width:'10%'},
          { name:'RFP Received Date', field: 'RFPReceivedDate',type:'date',cellFilter:'date:"dd-MM-yyyy"',width:'5%'},
          { name:'Response Due Date', field: 'ResponseDueDate',type:'date',cellFilter:'date:"dd-MM-yyyy"',width:'5%'},
          { name:'RAG Status', field:'RAGStatus', enableCellEdit:false, width:'5%',cellClass: getRAGStatus},
          { name: 'Status', visible:false, field: 'Status', width:'5%'},
          { name:'Business Division', field: 'BusinessDivision' ,width:'5%'},
          { name:'No. of Positions', field: 'NoofPositions',width:'5%'},
          { name:'Role', field: 'Role' ,width:'5%'},
          { name:'Experience', field: 'Experience',width:'5%'},
          { name:'Primiary Skills', field: 'PrimiarySkills' ,width:'10%'},
          { name:'Responsibilities', field: 'Responsibilities' ,width:'8%'},
          { name:'GE Hiring Manager', field: 'GEHiringManager',width:'5%'},
          { name:'Sutherland Spoc', field: 'SutherlandSpoc' ,width:'5%'},
          { name:'Requirements', field: 'Requirements' ,width:'10%'},
          { name:'Remarks', field: 'Remarks' ,width:'10%'},
          {name:'Link',cellTemplate:'<div>' + '<a href="http://stackoverflow.com">View</a>' + '</div>',width:'3%'}
        ]};

//To store data in Database

  /*var database=TAFFY([{
        "SlNo":1,"RFPID":101, "RFPHighLevelDetails":500,"RFPReceivedDate":new Date('02/14/2016'), "ResponseDueDate":new Date('02/25/2016'),
        "RAGStatus":"", "Status":"", "BusinessDivision":"G2", "NoofPositions":5,"Role":"ASE", "Experience":3,"PrimiarySkills":"java",
        "Responsibilities":"ASE", "GEHiringManager":"Naresh","SutherlandSpoc":"abc","Requirements":"def","Remarks":"good","Link":"View"

    },
    {
         "SlNo":2,"RFPID":102, "RFPHighLevelDetails":501,"RFPReceivedDate":new Date('02/12/2016'), "ResponseDueDate":new Date('02/23/2016'),
        "RAGStatus":"", "Status":"","BusinessDivision":"G2", "NoofPositions":2,"Role":"ASE", "Experience":1,"PrimiarySkills":"ASP",
        "Responsibilities":"ASE", "GEHiringManager":"Naresh","SutherlandSpoc":"abc","Requirements":"def","Remarks":"good","Link":"View"
    },
    {
        "SlNo":3,"RFPID":103, "RFPHighLevelDetails":502,"RFPReceivedDate":new Date('02/10/2016'), "ResponseDueDate":new Date('02/20/2016'),
        "RAGStatus":"", "Status":"", "BusinessDivision":"G2", "NoofPositions":1,"Role":"ASE", "Experience":2,"PrimiarySkills":".Net",
        "Responsibilities":"ASE", "GEHiringManager":"Naresh","SutherlandSpoc":"abc","Requirements":"def","Remarks":"good","Link":"View"
    },
    {"SlNo":4,"RFPID":104, "RFPHighLevelDetails":503,"RFPReceivedDate":new Date('02/10/2016'), "ResponseDueDate":new Date('02/16/2016'),
        "RAGStatus":"", "Status":"", "BusinessDivision":"G2", "NoofPositions":1,"Role":"ASE", "Experience":2,"PrimiarySkills":".Net",
        "Responsibilities":"ASE", "GEHiringManager":"Naresh","SutherlandSpoc":"abc","Requirements":"def","Remarks":"good","Link":"View"
    }]);*/

var database=TAFFY();
database.store("tabledata");
$scope.mydata.data=database().get("tabledata");


//Reset values

 $scope.reset=function()
 {
  $scope.fromdate="";
  $scope.todate="";
  $scope.opt=$scope.active;
  $scope.mydata.data = database().get("tabledata");
 }

//Display controls based on radio buttons

$scope.ShowHideDiv=function()
{
    var chkYes = document.getElementById("chkYes");
    var chkNo = document.getElementById("chkNo");
    var dvdate = document.getElementById("dvdate");
    var dvstatus = document.getElementById("dvstatus");
    dvdate.style.display = chkYes.checked ? "block" : "none";
    dvstatus.style.display=chkNo.checked ? "block" : "none";

}

 //Date Difference

$scope.getDate = function(dt)
{
  //return new Date(dt);
  dt =new Date(dt);
}
//date difference
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
if(days<0)
  alert("Enter Correct Date");
};

//Date Filter

$scope.dateFilter = function(fromdate, todate)
{

    var month = fromdate.getMonth() + 1;
    var day = fromdate.getDate();
    var year = fromdate.getFullYear();
    var fromDateString = month + "/" + day + "/" + year;
    var month = todate.getMonth() + 1;
    var day = todate.getDate();
    var year = todate.getFullYear();
    var toDateString = month + "/" + day + "/" + year;
    alert( fromDateString +" "+ toDateString);
    debugger;
    var c=database({RFPReceivedDate:{'<=':fromDateString}},{ResponseDueDate:{'>=':toDateString}}).count();
    alert(c);
}

//Filtering based on radio buttons


$scope.filter=function()
{
  var datecheck = document.getElementById("chkYes").checked;
  var statuscheck = document.getElementById("chkNo").checked;
  if(statuscheck==true)
  {
    var status =document.getElementById("status").value;
    if(status=="Inactive")
    {
      $scope.mydata.data=database({Status:{'!=':status}}).get();
    }
    else
    {
      //alert(status);
      //var x= database({Status:status}).count();
      //alert(x);
      $scope.mydata.data=database({Status:status}).get();
    }
  }
  if(datecheck==true)
  {

  }
}

}]);



