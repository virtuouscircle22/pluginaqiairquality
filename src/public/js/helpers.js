/*Creamos una variable que contendra todo el código html del plugin y una función de tipo arrow 
a la que le pasaremos la variable obtenida 'url' que usaremos en el fetch*/

const renderPlugin = (url) => `
<!Doctype html>
<html lang="en">
    <!-- Plugin created by María Vico Martín in 2º ASIR of IES Punta del Verde in Seville -->
    <head>
        <title>Plugin Automatico</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
        <!-- We create a style for one of the tooltips, specifically for the one that will contain a table with the indexes (id = "max") -->
        <style>
            /* white-tooltip is the name of the class in the html, where what is defined will be applied (white background and border and black letters)*/
            .white-tooltip + .tooltip > .tooltip-inner {background-color: white; color: black}
            .white-tooltip + .tooltip > .tooltip-arrow { border-top-color:white; }
            table.d {
                table-layout: fixed;
                width: 100%;  
                word-wrap: break-word;
            }
            
        </style>
    </head>
    <body> 
        <script>
        /*We use fetch to make a request to the rest api and thus get the data*/
        fetch('${url}')
            .then(response => response.json())
            .then(json =>{

                    // We get the time of the api rest and separate this into day, month and time
                    var time = json.data.time.s
                    var dia = time.slice(8,-9)
                    var hora = time.slice(-9,-3)
                    // After having the numerical value of the month, we pass it to its alphabetical form 
                    var fecha = new Date(time.slice(0,-9))
                    var meses = ["January","February","March","April","May","June","July","August","September","October","November","December"];

                    // We obtain the variable with the value of the place of the json measurement
                    var city = json.data.city.name
                    
                    // Create a variable of type array that will contain the indexes of the contaminates 
                    var all = []

                    /*We round to avoid decimals, and we calculate the absolute value of the contaminate (index),
                      to be able to compare them among them and assign according to this (index) the color; We will do this with everyone.*/
                
                    // Contaminante 1 (O3)
                    if (json.data.iaqi.o3 == undefined ) {
                        var cont1 = "-"
                    } else {
                        var cont1 = Math.round(json.data.iaqi.o3.v) 
                        var icont1 = cont1 / 100
                        all.push(icont1)
                        if (icont1 > 0.75 && icont1 <= 1) {
                            var ccont1= '#ffff4d'
                        } else if (icont1 > 1) {
                            var ccont1 = 'firebrick'
                        } else {
                            var ccont1 = '#89d571'
                        }
                    }

                    // Contaminante 2 (NO2)
                    if (json.data.iaqi.no2 == undefined ) {
                        var cont2 = "-"
                    } else {
                        var cont2 = Math.round(json.data.iaqi.no2.v)
                        var icont2 = cont2 / 40
                        all.push(icont2)
                        if (icont2 > 0.75 && icont2 <= 1) {
                            var ccont2 = '#ffff4d'
                        } else if (icont2 > 1) {
                            var ccont2 = 'firebrick'
                        } else {
                            var ccont2 = '#89d571'
                        }
                    }
                    
                    //Contaminante 3 (PM10)
                    if (json.data.iaqi.pm10 == undefined ) {
                        var cont3 = "-"
                    } else {
                        var cont3 = Math.round(json.data.iaqi.pm10.v )
                        var icont3 = cont3 / 50
                        all.push(icont3)
                        if (icont3 > 0.7 && icont3 <= 1) {
                            var ccont3 = '#ffff4d'
                        } else if (icont3 > 1) {
                            var ccont3 = 'firebrick'
                        } else {
                            var ccont3 = '#89d571'
                        }
                    }
                    // Contaminante 4 (PM25)
                    if (json.data.iaqi.pm25 == undefined ) {
                        var cont4 = "-"
                    } else {
                        var cont4 = Math.round(json.data.iaqi.pm25.v)
                        var icont4 = cont4 / 25
                        all.push(icont4)
                        if (icont4 > 0.75 && icont4 <= 1) {
                            var ccont4 = '#ffff4d'
                        } else if (icont4 > 1) {
                            var ccont4 = 'firebrick'
                        } else {
                            var ccont4 = '#89d571'
                        }
                    }
                    // We calculate which pollutant has a higher value index
                    var max =  Math.max(...all)

                    /* We obtain the position of the pollutant that has the highest value according to its 
                    index for then take the relative value of said pollutant*/
                    var n = all.indexOf(max)
                    switch(n) {
                        case 0:
                            var maximo = cont1
                            break;
                        case 1:
                            var maximo = cont2
                            break;
                        case 2:
                            var maximo = cont3
                        break;
                        case 3:
                            var maximo = cont4
                        break;
                        }
                    
                    // We calculate air quality according to the maximum index
                    if (max > 0.75 && max <= 1) {
                        var color = '#ffff4d'
                        var estado = 'Bad'
                    } else if (max > 1) {
                        var color = 'firebrick'
                        var estado = 'Dangerous'
                    } else {
                        var color = '#89d571'
                        var estado = 'Good'
                    }

                    // We paint all the data previously obtained in the html (table) by id and we paint the assigned styles (colors)
                    document.getElementById("cont1").innerHTML = cont1;
                    document.getElementById("cont1").style.backgroundColor = ccont1;

                    document.getElementById("cont2").innerHTML = cont2;
                    document.getElementById("cont2").style.backgroundColor = ccont2;

                    document.getElementById("cont3").innerHTML = cont3;
                    document.getElementById("cont3").style.backgroundColor = ccont3;

                    document.getElementById("cont4").innerHTML = cont4;
                    document.getElementById("cont4").style.backgroundColor = ccont4;
                    
                    document.getElementById("max").innerHTML = maximo + '*';
                    document.getElementById("cmax").style.backgroundColor = color;
                    document.getElementById("estado").innerHTML = estado  ; 

                    document.getElementById("fecha").innerHTML = dia + ' de ' + meses[fecha.getMonth()] + "<br/>" + hora  ; 
                    document.getElementById("city").innerHTML = city;
                                
                    // We select the recommendation icons and their messages according to the color of the maximum value
                    if (color=='#89d571') {
                        document.getElementById("dep").innerHTML = '<img src="images/depgre.jpg" width="100%" height="83" title="Good time to play sports"/>';
                        document.getElementById("mayores").innerHTML = '<img src="images/mayoresgre.jpg"  width="100%" height="83" title="Good time for a walk"/>';
                        document.getElementById("family").innerHTML = '<img src="images/familygre.jpg"   width="100%" height="83" title="Good time to go out"/>';
                        document.getElementById("respira").innerHTML = '<img src="images/respiragre.jpg" width="100%" height="83" title="Good time to enjoy the outdoors"/>';
                    } else if (color=='#ffff4d') {
                        document.getElementById("dep").innerHTML = '<img src="images/depyel.jpg" width="100%" height="83" title="Play sports in green areas"/>';
                        document.getElementById("mayores").innerHTML = '<img src="images/mayoresyel.jpg"  width="100%" height="83" title="Stroll through green areas"/>';
                        document.getElementById("family").innerHTML = '<img src="images/familyyel.jpg"   width="100%" height="83" title="Stroll through wooded areas"/>';
                        document.getElementById("respira").innerHTML = '<img src="images/respirayel.jpg" width="100%" height="83" title="Avoid intense physical activity outdoors"/>';
                    } else if (color=='firebrick') {
                        document.getElementById("dep").innerHTML = '<img src="images/depred.jpg" width="100%" height="83" title="Do not practice sports outdoors"/>';
                        document.getElementById("mayores").innerHTML = '<img src="images/mayoresred.jpg"  width="100%" height="83" title="This is not a good time to walk"/>';
                        document.getElementById("family").innerHTML = '<img src="images/familyred.jpg"   width="100%" height="83" title="Better stay home"/>';
                        document.getElementById("respira").innerHTML = '<img src="images/respirared.jpg" width="100%" height="83" title="Do not go out if you have breathing problems"/>';
                    }     
        })
            
        // Tooltip (pop-up) 
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();   
        });

        </script>

        <br>
        <div class="col-md-2"> 

            <table class="table table-bordered d" >
                <thead>
                    <th colspan="4" >
                    <span data-toggle="tooltip" data-html="true"  data-placement="bottom" class="white-tooltip" title="<font color='blue'> Autora: María Vico Martín </font><br><font size=1>GNU General Public License</font>">
                        <center><b>AIR QUALITY<a href='https://github.com/MVico21/Pluginaqi' target="_blank" >*</a></b></center>
                    </span>
                    </th>
                    <tr>
                        <td colspan="4"><div align='center'><img src="images/logo_v2.jpg" width="100%" height="40%" ></div></td>
                    </tr>
                    <tr>
                        <td colspan="2" id="city" style="text-align: center; padding-top:20px;"></td>
                        <th colspan="2"> <div id="estado" style="text-align: center; font-size:130%; "> </div> <div id="fecha" style="text-align: center; font-size:95%;"></div> </th>
                    </tr>
                </thead>
                <tbody id="myTable">
                    <th colspan="4" style="text-align: center ; font-size:300%; margin:30px; padding:30px;" id="cmax">
                        <!-- Tooltip (pop-up) in table format with the value of the indexes (legend) -->
                        <span data-toggle="tooltip" data-placement="top" class="white-tooltip" data-html="true" 
                        title="<table border='2' >
                                    <tr> 
                                        <td colspan='4'>
                                                <b>WHO maximum values: </b><br>
                                                O<sub>3</sub>: 100 μg/m<sup>3</sup> de media en 8h <br>
                                                NO<sub>2</sub>: 40 μg/m<sup>3</sup> annual average <br>
                                                PM<sub>10</sub>: 50 μg/m<sup>3</sup> average in 24h  <br>
                                                PM<sub>2.5</sub>: 25 μg/m<sup>3</sup> average in 24h <br>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>O<sub>3</sub></td>
                                        <td bgcolor='#89d571'>&lt;75</td>
                                        <td bgcolor='#ffff4d'>&lt;=100</td>
                                        <td bgcolor='#FF0040'>&gt;100</td>
                                    </tr>
                                    <tr>
                                        <td>NO<sub>2</sub></td>
                                        <td bgcolor='#89d571'>&lt;30</td>
                                        <td bgcolor='#ffff4d'>&lt;=40</td>
                                        <td bgcolor='#FF0040'&gt;>40</td>
                                    </tr>
                                    <tr>
                                        <td>PM<sub>10</sub></td>
                                        <td bgcolor='#89d571'>&lt;35</td>
                                        <td bgcolor='#ffff4d'>&lt;=50</td>
                                        <td bgcolor='#FF0040'>&gt;50</td>
                                    </tr>
                                    <tr>
                                        <td>PM<sub>2.5</sub></td>
                                        <td bgcolor='#89d571'>&lt;20</td>
                                        <td bgcolor='#ffff4d'>&lt;=25</td>
                                        <td bgcolor='#FF0040'>&gt;25</td>
                                    </tr>
                                <table>" 
                        id="max"></span>
                    </th>
                    <tr>
                        <!-- Tooltip with information on the different pollutants -->
                        <th style="text-align: center; white-space: nowrap">
                            <span data-toggle="tooltip" data-html="true" title="El exceso de ozono en el aire puede causar problemas respiratorios, 
                            provocar asma, reducir la función pulmonar y originar enfermedades pulmonares. Los niveles de ozono más 
                            elevados se registran durante los períodos de tiempo soleado.">
                                O<sub>3</sub>*
                            </span>
                        </th>
                        <th style="text-align: center; white-space: nowrap"> 
                            <span data-toggle="tooltip" data-html="true" title="The continued exposure of NO <sub> 2 </sub> causes various diseases of the
                            respiratory tract such as decreased lung capacity, acute bronchitis, asthma and is considered to be the culprit in allergic processes, especially in children.
                            In addition, the symptoms of bronchitis in asthmatic children increase in relation to said exposure.">
                                NO<sub>2</sub>*
                            </span>
                        </th>
                        <th style="text-align: center; white-space: nowrap"> 
                            <span data-toggle="tooltip" title="Exposure to these particles can affect both the lungs and the heart due to their
                            small size; contributes to the risk of developing cardiovascular and respiratory diseases, as well as lung cancer. It mostly affects people with
                            heart or lung disease, children and older adults. ">
                                PM <sub> 10 </sub>*
                            </span>
                        </th>
                        <th style="text-align: center; white-space: nowrap"> 
                            <span data-toggle="tooltip"  title="The size of these particles make them 100% breathable, penetrating into the respiratory
                            system and depositing itself in the pulmonary alveoli, they can even reach the bloodstream. Furthermore, these smaller particles are made up of elements 
                            that are more toxic (such as heavy metals). Chronic particle exposure contributes to the risk of developing cardiovascular and respiratory diseases, 
                            as well as lung cancer.">
                                PM<sub>2.5</sub>*
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <!-- We paint the contaminants with their color -->
                        <td id="cont1" style="text-align: center;"></td>
                        <td id="cont2" style="text-align: center;"> </td>
                        <td id="cont3" style="text-align: center;"> </td>
                        <td id="cont4" style="text-align: center;"> </td>
                    </tr>
                    <tr>
                        <!-- We paint the contaminants with their color -->
                        <td id="dep"  style="padding:0px;"> </td>
                        <td id="mayores" style="padding:0px;"> </td>
                        <td id="family" style="padding:0px;"> </td>
                        <td id="respira" style="padding:0px;"> </td>
                    </tr>
                </tbody>
            </table>
    </div>
    </body>
</html>     
`
function search () {
	// Obtiene el valor del input del formulario (la estación a buscar)
	const keyword = $("#input-station").val();

	//Pintamos el efecto de buscar
	$(".output").html("<h2>Resultado:</h2>")
	$(".output").append($("<div/>").html("Cargando..."))
	$(".output").append($("<div/>").addClass("cp-spinner cp-meter"))

	//Realizamos una solicitud json para obtener las estaciones que concuerda con lo escrito en el input
	$.get("https://api.waqi.info/search/?token=43b146051093d2a179f84802c061870088a7ce91&keyword=" + keyword, function (result) {

		$(".output").html("<h2>Resultado:</h2>")
		if (!result || (result.status != "ok")) {
			$(".output").append("Disculpe, ha ocurrido un problema: ")
			if (result.data) $(".output").append($("<code>").html(result.data))
			return
		}
		
		if (result.data.length == 0) {
			$(".output").append("Disculpe, no existen resultados para su busqueda")
			return
		} 
		
		// Creamos una tabla donde saldrán los resultados de la busqueda
		let table = $("<table/>").addClass("table table-sm table-dark table-bordered")
		$(".output").append(table)

		let stationInfo = $("<div/>")
		$(".output").append(stationInfo)

		// Sacamos el nombre de la estación, el aqi y la fecha en la busquedad
		result.data.forEach(function (station, i) {
			let tr = $("<tr>");
			tr.append($("<td>").html(station.station.name))
			tr.append($("<td>").html(colorize(station.aqi)))
			tr.append($("<td>").html(station.time.stime).attr('style', 'text-align:center'))
			// Una vez que el usuario a seleccionado la estación al hacer click recogeremos todas las imagenes y en archivo html y lo pasaremos a un zip
			tr.on("click", function () {
                const url = `https://api.waqi.info/feed/@${station.uid}/?token=43b146051093d2a179f84802c061870088a7ce91`;
                const routes = ["../images/depgre.jpg", "../images/depred.jpg", "../images/depyel.jpg", 
                "../images/familygre.jpg", "../images/familyred.jpg", "../images/familyyel.jpg", 
                "../images/mayoresgre.jpg", "../images/mayoresred.jpg", "../images/mayoresyel.jpg", 
                "../images/respiragre.jpg", "../images/respirared.jpg", "../images/respirayel.jpg", "../images/logo_v2.jpg"];

                const zip = new JSZip();
                zip.file("index.html", renderPlugin(url));
                
                let count = 0;
                routes.forEach(route => { 
                    // loading a file and add it in a zip file
                    JSZipUtils.getBinaryContent(route, function (err, data) {
                        if(err) {
                            throw err; // or handle the error
                        }
                        zip.file(route, data, {binary:true});
                        count++;
                        if (count == routes.length) {
                            // Esta función es la ventana emergente que te saldrá para preguntar si deseas guardad el archivo .zip
                            zip.generateAsync({type:"blob"})
                            .then(function(content) {
                            // see FileSaver.js
                            saveAs(content, "plugin.zip");
                })
                        }
                    });
                })
            })
			table.append(tr)
		})
	});
}

//Esta función pinta el aqi de diferentes colores dependiendo de su valor. 
function colorize(aqi, specie) {
	specie = specie || "aqi"
	if (["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"].indexOf(specie) < 0) return aqi;

	let spectrum = [
		{ a: 0, b: "#cccccc", f: "#ffffff" },
		{ a: 50, b: "#009966", f: "#ffffff" },
		{ a: 100, b: "#ffde33", f: "#000000" },
		{ a: 150, b: "#ff9933", f: "#000000" },
		{ a: 200, b: "#cc0033", f: "#ffffff" },
		{ a: 300, b: "#660099", f: "#ffffff" },
		{ a: 500, b: "#7e0023", f: "#ffffff" }
	];

	let i = 0;
	for (i = 0; i < spectrum.length - 2; i++) {
		if (aqi == "-" || aqi <= spectrum[i].a) break;
	};
	return $("<div/>")
		.html(aqi)
		.css("font-size", "100%")
		.css("min-width", "20px")
		.css("text-align", "center")
		.css("background-color", spectrum[i].b)
		.css("color", spectrum[i].f)

}


