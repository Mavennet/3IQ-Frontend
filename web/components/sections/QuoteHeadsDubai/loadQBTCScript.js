var url = "https://storage.googleapis.com/3iq_wordpress/btc_nav_0_0_0.csv";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.onreadystatechange = function () {
    if (xhr.responseText) {
        data = String(xhr.responseText).split("\n")
        data2 = processData(data);

    }
};

xhr.send();

var url2 = "https://feeds.nasdaqdubai.com/apps/sso/source/qbtc650f605";

var xhr2 = new XMLHttpRequest();
xhr2.open("GET", url2);


xhr2.onreadystatechange = function () {
    if (xhr2.responseText) {
        data_widget = JSON.parse(xhr2.responseText)

    }
};

xhr2.send();


function processData(allText) {

    let array = allText[0];
    var headers = array.split(",");
    var values = allText[1].split(",");
    function createObjectFromArray(array, indexes) {
        let result = {};
        for (let index of indexes) {
            result[headers[index]] = values[index];
        }
        return result;
    }

    let recordObject = createObjectFromArray(allText[1], [0, 1, 2, 3, 4, 5]);

    return recordObject;
}

window.onload = function () {
    var units_outstanding_element = document.getElementById('Units_Outstanding');

    var units_outstanding_processed = parseFloat(data2.Units).toFixed(2)
    units_outstanding_processed = units_outstanding_processed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    units_outstanding_element.innerHTML += units_outstanding_processed;

    var nav_usd_element = document.getElementById('nav_usd');
    var nav_processed = parseFloat(data2.NetAssetValue).toFixed(2)

    nav_processed = nav_processed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    nav_usd_element.innerHTML += nav_processed;

    var navpu_usd_element = document.getElementById('navpu_usd');

    navpu_usd_element.innerHTML += parseFloat(data2.NAVPU).toFixed(4);

    console.log(data2.Date)
    var b = new Date(data2.Date)
    var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

    var result = b.toLocaleDateString("en-US", options)
    console.log(result)








    var date_element = document.getElementById('date_gcp');
    var date_element2 = document.getElementById('date_gcp2');
    var date_element3 = document.getElementById('date_gcp3');
    date_element.innerHTML += result;
    date_element2.innerHTML += result;
    date_element3.innerHTML += result;

    var units_per_btc = data2.Units / data2.Quantity;
    var units_per_btc_ele = document.getElementById('units_per_btc');
    units_per_btc_ele.innerHTML += parseFloat(units_per_btc).toFixed(2);

    var btc_per_unit = data2.Quantity / data2.Units;
    var btc_per_unit_ele = document.getElementById('btc_per_unit');
    btc_per_unit_ele.innerHTML += parseFloat(btc_per_unit).toFixed(8);




    var display_price_ele = document.getElementById('display_price');


    display_price_ele.innerHTML += data_widget.root[0].display_price;

    var numerical_change_ele = document.getElementById('numerical_change');


    numerical_change_ele.innerHTML += data_widget.root[0].numerical_change;


    var percentage_change_ele = document.getElementById('percentage_change');


    percentage_change_ele.innerHTML += data_widget.root[0].percentage_change;



    var last_volume_ele = document.getElementById('last_volume');



    last_volume_ele.innerHTML += data_widget.root[0].last_volume;




    var time_of_last_update_ele = document.getElementById('time_of_last_update');




    time_of_last_update_ele.innerHTML += data_widget.root[0].time_of_last_update;

    var market_status_ele = document.getElementById('market_status');

    const status = data_widget.root[0].market_status.replace(/-/g, " ");

    console.log("status", status)
    market_status_ele.innerHTML += status

    change_span_ele = document.getElementById('change-span')
    change_arrow_ele = document.getElementById('change-arrow')

    if (data_widget.root[0].numerical_change >= 0) {
        change_span_ele.classList.add("qmod-ch-up");
        change_arrow_ele.classList.add('fa-arrow-circle-up')
    }
    else {
        change_span_ele.classList.add("qmod-ch-down");
        change_arrow_ele.classList.add('fa-arrow-circle-down')
    }




}