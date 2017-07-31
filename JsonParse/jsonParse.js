
var actual_JSON;

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'inData.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    var pres, p = new Promise(res=>pres = res);
    loadJSON(function(response) {
        // Parse JSON string into object
        pres(JSON.parse(response))
    });
    return p;
}


function extractFromJson(data, filter, ctx)
{
    if(data instanceof Array)
        return data.map(val=>extractFromJson(val, filter, ctx));
    var obj = {};
    for(var i in data) {
        var c_ctx = filter(i, data[i], ctx)
        if (c_ctx) {
            if (typeof(data[i]) == 'object') {
                obj[i] = extractFromJson(data[i], filter, c_ctx)
            }
            else {
                obj[i] = data[i];
            }
        }
    }
    return obj;
}


function D3TreeParse(data, name) {
    var obj = {name: name,children:[]};
    if(data instanceof Array){
        obj.children = data.map(val => D3TreeParse(val, ''));
        if(data.length == 1) obj.children = obj.children[0].children;
        return obj;
    }
    for(var i in data){
        if(typeof (data[i]) =='object'){
            obj.children.push(D3TreeParse(data[i], i));
        }else{
            obj.children.push({name: i, value: data[i]});
        }
    }
    localStorage.setItem('D3Json',JSON.stringify(obj))
    return obj;
}



