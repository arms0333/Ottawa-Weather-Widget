var scriptsLoaded = 0;


document.addEventListener("DOMContentLoaded", function()
{
      var css = document.createElement("link");
      css.setAttribute("rel", "stylesheet");
      css.setAttribute("href", "main.css");	
      css.addEventListener("load", loadCount);
      document.querySelector("head").appendChild(css);

      var jq = document.createElement("script");
      jq.addEventListener("load", loadCount);
      jq.setAttribute("src","//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
      document.querySelector("head").appendChild(jq);
    });

function loadCount()
    {
      scriptsLoaded++;
        if(scriptsLoaded === 2)
        {
          buildWidget();
          console.log("both scripts loaded");
        }
    }

function buildWidget()
    {
        var forecastkey="dd067bd3c8dc4f00b4937883ac78c93b";
        var lat="45.348391";
        var long="-75.757045";
        var url= "https://api.forecast.io/forecast/" + forecastkey + "/" + lat + "," + long + "?units=ca";


            $.ajax
                ({
                   type:"POST",
                    url: url,
                    dataType: 'jsonp'
                }).done(finish);

    }
function finish(weatherData, textstatus, joe)
    {

        $(".weather-forecast").append("<table></table>");
        $(".weather-forecast table").append("<thead></thead>");
        $(".weather-forecast thead").append("<tr></tr>");
        $(".weather-forecast tr").append("<td>time</td>","<td>humidity</td>","<td>cloud cover</td>","<td>temperature</td>",
          "<td>wind speed</td>","<td></td>","<td>summary</td>");
        $(".weather-forecast table").append("<tbody></tbody>");
        $.each(weatherData.hourly.data,rowData);

        console.log(weatherData.hourly.data[0]);

    }

 function rowData(index,rowPass)
    {
        if (new Date(rowPass.time*1000).getDay()===new Date().getDay())
            {
                $(".weather-forecast tbody").append("<tr></tr>");
                $(".weather-forecast tr:last").append("<td>"+ new Date(rowPass.time*1000).getHours()+":00</td>");
                $(".weather-forecast tr:last").append("<td>"+Math.round(rowPass.humidity*100)+"%</td>");
                $(".weather-forecast tr:last").append("<td>"+Math.round(rowPass.cloudCover*100)+"%</td>");
                $(".weather-forecast tr:last").append("<td>"+Math.round(rowPass.temperature)+"</td>");
                $(".weather-forecast tr:last").append("<td>"+Math.round(rowPass.windSpeed)+"</td>");
                $(".weather-forecast tr:last").append("<td> <img src='img/"+rowPass.icon+".gif'/></td>");
                $(".weather-forecast tr:last").append("<td>"+rowPass.summary+"</td>");
            }

}