var xmlhttp;
var sidebar = false;

if(window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.onreadystatechange = function() {
  // This code will be executed each time the readyState changes
  if(xmlhttp.status == 200) {
    switch(xmlhttp.readyState) {
      case 0:
        // Request not initialized
        var message = "Request not initialized";
        appendLog(DEBUG,message);
        // document.getElementById("status_update").innerHTML=message;
        break;
      case 1:
        // Server Connection Established
        var message = "Server Connection Established";
        appendLog(DEBUG,message);
        // document.getElementById("status_update").innerHTML=message;
        break;
      case 2:
        // Request Received
        var message = "Request Received";
        appendLog(DEBUG,message);
        document.getElementById("status_update").innerHTML=message;
        timestamp_start  = Date.now();
        appendLog(DEBUG,"Requested at " + timestamp_start);
        break;
      case 2:
        // Processing
        var message = "Processing";
        appendLog(DEBUG,message);
        // document.getElementById("status_update").innerHTML=message;
        break;
      case 4:
        // Completed and response is ready
        // var response = xmlhttp.responseText;
        // What we do with this depends on the type of data we get back
        // If the data is a "session" object, then we should create a track on
        //   the map
        if(xmlhttp.responseText == "") {
          /**
           * Reload the session list
           */
          appendLog(INFO,"Empty reponseText");
          break;
        }

        alert(xmlhttp.responseText);

        var json = JSON.parse(xmlhttp.responseText);


       break;
    }
  } else {
    if(xmlhttp.status != 0) {
      var message = "Operation status: " + xmlhttp.status + ": " + xmlhttp.responseText;
      appendLog(DEBUG,message);
      document.getElementById("status_update").innerHTML=message;

      appendLog(WARNING,"Response Status: " + xmlhttp.status);
      appendLog(WARNING,"Unknown response: " + xmlhttp.responseText);
    }
  }
}

function localtime(dateString) {
  dateString = dateString.replace("T","^");
  dateString = dateString.replace("\.","^");
  var parts = dateString.split("^");
  // parts[0] = date
  // parts[1] = time in 24 hour format
  // parts[2] = milliseseconds and timezone

  var meridian = "AM";
  var timeParts = parts[1].split(":");
  if(timeParts[0] > 12) { timeParts[0] = timeParts[0] - 12; meridian = "PM"; }

  return(parts[0] + " " + timeParts[0] + ":" + timeParts[1] + ":" + timeParts[2] + meridian);
}

function setLog(level, logmsg) {
  if(level >= logLevel) {
    document.getElementById("debug").innerHTML=logmsg;
  }
}

function appendLog(level, logmsg) {
  if(level >= logLevel) {
    var debug = document.getElementById("debug").innerHTML;

    debug = debug + "\n<br>" + logmsg;
    document.getElementById("debug").innerHTML=debug;
  }
}

function openSidebar() {
  document.getElementById("sidebar").style.width = "300px";
  document.getElementById("main").style.marginLeft = "300px";
  sidebar = true;
}

function closeSidebar() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  sidebar = false;
}

function toggleSidebar() {
  if(sidebar) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

function initMenu() {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

/*
function initTimeline() {
  var container = document.getElementById('visualization');

  var groups = new vis.DataSet([
    {id: "A", content: 'Historical Events'},
    {id: "B", content: 'Biblical Events'},
    {id: "C", content: 'Bible Books'}
  ]);

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet([
    {id: 1, content: 'item 1', start: '2014-04-20', group: "A"},
    {id: 2, content: 'item 2', start: '2014-04-14', group: "B"},
    {id: 3, content: 'item 3', start: '2014-04-18', group: "C"},
    {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19', group: "A"},
    {id: 5, content: 'item 5', start: '2014-04-25', group: "B"},
    {id: 6, content: 'item 6', start: '2014-04-27', type: 'point', group: "C"}
  ]);

  // Configuration for the Timeline
  var options = {};

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, groups, options);

  timeline.on('select', itemSelected);

}
*/

function init() {
  initMenu();
//  initTimeline();
}

function itemSelected (properties) {
  // This is in the Web UI, so can be usd to add additional info into an info box with more details
    // alert(JSON.stringify(properties));
}

/*
function newEventGroup() {
  var request = {};

  var container = document.getElementById('newEventGroup');
  request.name = document.getElementById('eventGroupName');
  request.description = document.getElementById('eventGroupDescription');

  xmlhttp.open("POST", "/eventGroup", true);

  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify(request));
}
*/
