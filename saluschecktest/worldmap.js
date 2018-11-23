// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var data = [
    ['ir', 1],
    ['gw', 1],
    ['cd', 1],
    ['kp', 1],
    ['mm', 1],
    ['sd', 1],
    ['er', 1],
    ['so', 1],
    ['af', 1],
    ['ua', 1],
    ['ru', 1],
    ['ci', 1],
    ['lr', 1],
    ['iq', 1],
    ['lb', 1],
    ['gn', 1],
    ['zw', 1],
    ['by', 1],
    ['ly', 1],
    ['tn', 1],
    ['ss', 1],
    ['cf', 1],
    ['cu', 1],
    ['eg', 1]
];

// Create the chart
Highcharts.mapChart('mapcontainer', {
    chart: {
        map: 'custom/world-highres'
    },

    title: {
        text: ''
    },

    legend: {
      enabled: false
    },

    mapNavigation: {
        enabled: false,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        maxColor: 'sandybrown'
    },

    tooltip: {
      headerFormat: null,
      formatter: function () {
            var str="";
            if(this.point.value === 1){
            str="Ja";
            }
            return 'Land: ' + this.point.name + '<br>' +
                'SalusChecked: ' + str;
        }
    },

    series: [{
        data: data,
        name: 'Land',
        states: {
            hover: {
                color: 'tomato'
            }
        },

        dataLabels: {
            enabled: false,
            format: '{point.name}'
        }


    }]
});
