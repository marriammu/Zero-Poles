var radius = 100; // radius of unit circle
var pSize = 4; // size of pole and zero graphic
var zSize = 4;
// arrays index used to select specific pole or zero
Index = 0;
// flags to know which one to be moved
zeroFlag = false;
poleFlag = false;
//poles values related to the html coordinates
var poles = []
// saves poles values related to the html coordinates (btfdl mwgoda lma nms7 kol l poles)
var tempPoles = [
    []
]
// usable poles values -1 -> 1 (hnst5dmha f l calculations)
var Truepoles = [
]
//zeros values related to the html coordinates
var zeros = []
// saves zeros values related to the html coordinates (btfdl mwgoda lma nms7 kol l zeros)
var tempZeros = [
    []
]
// usable zeros values -1 -> 1 (hnst5dmha f l calculations)
var Truezeros = []
var conjucateFlag = false;

// array con taining the Indices of conjucated zeros
var conjucatedZeros = []
// array containing the Indices of conjucated poles
var conjucatedPoles = []
// array saves the index of the poles array that conjucated
var whichConjpoles = []
// array saves the index of the zeros array that conjucated
var whichConjzeros = []

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
Draw();

function Draw() {
    ctx.clearRect(0, 0, c.width, c.height);

        var pad = (c.width - 2 * radius) / 2; // padding on each side

        // unit circle
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.arc(radius + pad, radius + pad, radius, 0, 2 * Math.PI);
        ctx.stroke();
        // y axis
        ctx.beginPath();
        //ctx.lineWidth="1";
        ctx.strokeStyle = "lightgray";
        ctx.moveTo(radius + pad, 0);
        ctx.lineTo(radius + pad, c.height);
        ctx.font = "italic 8px sans-serif";
        ctx.fillText("Imaginary", radius + pad + 2, pad - 2);

        // x axis
        ctx.moveTo(0, radius + pad);
        ctx.lineTo(c.width, radius + pad);
        ctx.fillText("Real", radius + radius + pad + 2, radius + pad - 2);
        ctx.strokeStyle = "lightgray";
        ctx.stroke(); // Draw it
        
        var idx;
        Truepoles=[]
        for (idx = 0; idx < poles.length; idx++) {
            var x = poles[idx][0] - 10;
            var y = poles[idx][1] - 10;
            Truepoles.push([((x - 22) - radius) / radius, (radius - (y - 22)) / radius]);
            ctx.beginPath();
            ctx.moveTo(x - pSize , y - pSize );
            ctx.lineTo(x + pSize , y + pSize );
            ctx.moveTo(x - pSize , y + pSize );
            ctx.lineTo(x + pSize , y - pSize );
            ctx.strokeStyle = "blue";
            ctx.stroke();
            
        };
        Truezeros=[]
        for (idx = 0; idx < zeros.length; idx++) {
            var x = zeros[idx][0] - 10;
            var y = zeros[idx][1] - 10;

            Truezeros.push([((x - 22)- radius) / radius, (radius - (y-22)) / radius]);
            
            ctx.beginPath();
            ctx.arc(x , y , zSize, 0, 2 * Math.PI);
            ctx.strokeStyle = "red";
            ctx.stroke();
            

        };
    };

    function AddPoles() {
        if (poles.length<5)      
        var x = radius + (radius * 0.75) ;
        var y = radius - (radius * 0.25) ;
        poles.push([x + 32,y + 32]);
        Draw();
    };

    function AddZeros() {
        if (zeros.length<5)
        var x = radius - (radius * 0.75) ;
        var y = radius - (radius * 0.25) ;
        zeros.push([x + 32,y + 32]);
        Draw();
    };

    function showCoords(event) {
        var x = event.offsetX;
        var y = event.offsetY;
        if (zeroFlag){
            zeros[Index][0] = x
            zeros[Index][1] = y
            tempZeros = zeros
            Draw()
            for (var idx = 0; idx < conjucatedZeros.length; idx++) {
                if (conjucatedZeros[idx][0] === Index) {
                    var conjIdx = conjucatedZeros[idx][1];
                    Truezeros[conjIdx][0] = Truezeros[Index][0]
                    Truezeros[conjIdx][1] = -Truezeros[Index][1]
                    tempx = radius + (radius * Truezeros[conjIdx][0]);
                    tempy = radius - (radius * Truezeros[conjIdx][1]);
                    zeros[conjIdx] = [tempx + 32, tempy + 32];
                }
            }
        }
        
    if (poleFlag) {
        poles[Index][0] = x
        poles[Index][1] = y
        tempPoles = poles
        Draw()
        for (var idx = 0; idx < conjucatedPoles.length; idx++) {
            if (conjucatedPoles[idx][0] === Index) {
                var conjIdx = conjucatedPoles[idx][1];
                Truepoles[conjIdx][0] = Truepoles[Index][0]
                Truepoles[conjIdx][1] = -Truepoles[Index][1]
                tempx = radius + (radius * Truepoles[conjIdx][0]);
                tempy = radius - (radius * Truepoles[conjIdx][1]);
                poles[conjIdx] = [tempx + 32, tempy + 32];
            }
        }
    }
    Draw();
}

    function clearZeros() {
        zeros = [];
        conjucatedZeros=[];
        whichConjzeros=[];
        Draw()

    };
    function clearSelected(){
        if (zeroFlag){
            zeros.splice(Index,1);
            for (var idx = 0; idx < conjucatedZeros.length; idx++) {
                if (conjucatedZeros[idx][0] === Index) {
                    var conjIdx = conjucatedZeros[idx][1] - 1;
                    zeros.splice(conjIdx, 1);
                    conjucatedZeros.splice(conjIdx, 1);
                }
        }
        Draw();
    }
        else if(poleFlag){
            poles.splice(Index,1);
             for (var idx = 0; idx < conjucatedPoles.length; idx++) {
                    if (conjucatedPoles[idx][0] === Index) {
                        var conjIdx = conjucatedPoles[idx][1] - 1;
                        poles.splice(conjIdx, 1);
                        conjucatedPoles.splice(conjIdx, 1);
                    }
                }
        }
        Draw();
        };
    
    function clearPoles() {
        poles = [];
        conjucatedPoles=[];
        whichConjpoles = [];
        Draw();
    };
    
    function Conjugate(){
        conjucateFlag = true
        var x;
        var y;
        var tempx;
        var tempy;
        if (poleFlag) {
            x = Truepoles[Index][0]
            y = Truepoles[Index][1]
            if (!Truepoles.includes([x, -y]) && !whichConjpoles.includes(Index)) {
                tempx = radius + (radius * x);
                tempy = radius - (radius * -y);
                poles.push([tempx + 32, tempy + 32]);
                conjucatedPoles.push([Index, poles.length - 1])
                whichConjpoles.push(Index)
            }
        }
        if (zeroFlag) {
            x = Truezeros[Index][0]
            y = Truezeros[Index][1]
            if (!Truezeros.includes([x, -y]) && !whichConjzeros.includes(Index)) {
                tempx = radius + (radius * x);
                tempy = radius - (radius * -y);
                zeros.push([tempx + 32, tempy + 32]);
                conjucatedZeros.push([Index, zeros.length - 1])
                whichConjzeros.push(Index)
            }
        } 
     
        Draw()
    };

    function clearAll() {
        poles = [];
        zeros = [];
        Draw();
    };
//     $.post("/postmethod", {
//         Zeros:JSON.stringify(zeros),
//         Poles:JSON.stringify(poles),
//         Index:JSON.stringify(Index)

//     },
//     function(err,req,resp){
//         x= JSON.parse(resp["responseText"])
//         if (lineChart !=0)
//         lineChart.destroy();
//         const chart = document.getElementById("chart")
//         lineChart = new Chart(chart,{
//             type:'line',
//             data:{
//             lables:x.magnitudeX,
//             datasets:[
//                 {
//                     label :"Magnitude Response",
//                     fill:false,
//                     backgroundColor:"rgba(75,192,192,0.4)",
//                     borderColor:"rgba(75,192,192,1)",
//                     borderDash:[],
//                     borderJointStyle: 'miter',
//                     data:x.magnitudeX,
//                 },
//             ]
        
//         }
//     })
//     // Plotly.newPlot('Chart', x.magnitudeX, layout);
// })   


    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    google.charts.setOnLoadCallback(drawChart_1);
    google.charts.setOnLoadCallback(drawChart_2);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['', '', ''],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);

    var options = {
      title: 'Poles & Zeros',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }
  function drawChart_1() {
    var data = google.visualization.arrayToDataTable([
      ['Phase', '', ''],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);

    var options = {
      title: 'Poles & Zeros',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_1'));

    chart.draw(data, options);
  }
  function drawChart_2() {
    var data = google.visualization.arrayToDataTable([
      ['Magnitude', '', ''],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);

    var options = {
      title: 'Poles & Zeros',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_2'));

    chart.draw(data, options);
  }
  

  