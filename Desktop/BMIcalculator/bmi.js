function masterCall(){
	validateHeight();
	validateWeight();
	emailCheckBox();
	detailedBmiInfo();
	validateEmail();
	calculateBmi();
	return false;
}

function validateHeight(){
	var height = document.getElementById("Height").value;
    var units = document.getElementById("units").value;
	
    if ((units==="inches" && height >118 )||
	(units ==="centimeters" && height >300)||
	 (height<=0)){
		document.getElementById("resultheight").innerHTML = "Enter a valid height";
		document.getElementById("bmiform").reset();
	}
}

function validateWeight(){
	var weight = document.getElementById("Weight").value;
	var Wunits = document.getElementById("wunits").value;
	
	if ((Wunits==="pounds" && weight > 1100)||
	    (Wunits==="kilogram" && weight >500)||
		(weight<=0)){
			document.getElementById("resultweight").innerHTML = "Enter a valid weight";
			document.getElementById("bmiform").reset();
	}
}

function detailedBmiInfo(){
	var check = document.getElementById("bmicheck").checked;   
	var details ="<ul>"
     details += "<li>For BMI < 18.5: Your BMI suggests that you are underweight</li>"
      details += "<li>For 18.5 <= BMI < 25: Your BMI suggests that you have a reasonable weight</li>"	
      details +="<li>For 25 <= BMI <29: Your BMI suggests that you are overweight</li>"
      details +="<li>For 29<= BMI: Your BMI suggests that you are obese</li>"	
      details += "</ul>"	  
 	if (check){
		document.getElementById("bmidetails").innerHTML = details;
		
	}
}	
	
function emailCheckBox(){
	var echeck = document.getElementById("echecked").checked;
	if (echeck){
	document.getElementById("emailalert").innerHTML = "Email feature is currently not supported";
	}
}

function inputEnable(){
	var check = document.getElementById("echecked").checked;
	if (check){
	 var disable = document.getElementById("mail").disabled = false;
	 var disable1 = document.getElementById("fullname").disabled = false;
	}else if(!check){
		var disable = document.getElementById("mail").disabled = true;
	 var disable1 = document.getElementById("fullname").disabled = true;
	}
}

function calculateBmi(){
	var heightb = document.getElementById("Height").value;
	var weightb = document.getElementById("Weight").value;
	var h_units = document.getElementById("units").value;
	var w_units = document.getElementById("wunits").value;
	var BMI;
	
	if (h_units==="inches" && w_units==="pounds" && heightb>0 &&heightb<=118 &&weightb>0 &&weightb<=1100  ){
		BMI = (weightb / (Math.pow(heightb,2))) * 703;
	    document.getElementById("resultsBMI").innerHTML ="You have a BMI of " + BMI;
		
	}else if(h_units==="centimeters" && w_units==="kilogram" && heightb>0 &&heightb<=300 &&weightb>0 &&weightb<=500){
		BMI = (weightb / (Math.pow((heightb/100),2)));
		document.getElementById("resultsBMI").innerHTML = "You have a BMI of " + BMI;
	}
}

function resetForm(){
	document.getElementById("fullname").setAttribute("disabled","disabled");
	document.getElementById("mail").setAttribute("disabled","disabled");
}




function validateEmail(){
	  var emailentry = document.getElementById("mail").value;
	   var xemail = new XMLHttpRequest(); 
	   xemail.onreadystatechange = function(){
		   if (this.readyState==4 && this.status==200){
			var emailDoc = xemail.responseXML;
			var fetchemails = emailDoc.getElementsByTagName("emails");
			var x = fetchemails[0].getElementsByTagName("email");
				for (var i=0;i<x.length;i++){
					if(emailentry===(x[i].childNodes[0].nodeValue)){
						document.getElementById("bannedemail").innerHTML= "Warning the email you haved entered is blacklisted";			
					  }		
				}
		   }
	   };
			xemail.open("GET","http://kunz-pc.sce.carleton.ca/sysc4504/emails.xml", true);
			xemail.send();}