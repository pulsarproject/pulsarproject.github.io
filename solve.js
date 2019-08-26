function parse(line){
    var string = false;
    if((!line.startsWith("//"))&&(!line.startsWith("#"))){
        for(s of specialchar){
            var re = RegExp("\\" + s, 'g');
            line = line.replace(re, '~' + s + "~");
        }
        line = line.split("~");
        if(line[0].includes("@")){
            line[0] = line[0].split("@");
            switch(language){
                case "javascript":
                    line[0] = "var " + line[0][1];
                    break;
                case "python":
                case "php":
                case "ruby":
                    line[0] = line[0][1];
                    break;
            }
        }
        for(var c = 0; c < line.length; c++){
            if(line[c] == `"`) string = !string;
            if(line[c].includes("@")){
                line[c] = line[c].split("@");
                switch(language){
                    case "javascript":
                    case "php":
                    case "python":
                    case "ruby":
                        line[c] = line[c][1];
                        break;
                }        
            }
            if(language == "php"){
                if(!specialchar.includes(line[c])&&(!keywords.includes(line[c]))&&(isNaN(line[c]))&&(line[c+1]!="(")&&(!string)){
                    line[c] = "$" + line[c]; 
                }
            }
        }
        line = line.join("");
        if(language == "javascript" || language == "php"){
            if((!line.endsWith("{"))&&(!line.endsWith(":"))&&(!line.endsWith("}"))){
                line = line + ";";
            }
        }
        return line;
    }
    else{
        return line;
    }
}
function solve(x){
    var lineArray = [];
    for(u = 0; u < example.length; u++){
        var y = example[u];
        language = x;
        if(y.indexOf("^")!==-1){
            y = y.split(`^`);
            if(y[1].trim()==""){
                line = data[y[0]]();
            }
            else{
                line = data[y[0]](y[1].split("|").map(x => x.trim()));
            }
        }
        else{
            line = y;
        }
        if(y[0] == "end"){
            indent--;
        }
        if(line !== ""){
            line = parse(line);
            for(var i = 0; i < indent; i++){
                line = "    " + line;
            }
            lineArray.push(line);
        }
        if(indentArray.includes(y[0])){
            indent++;
        }
    }
    document.getElementById(language + "-output").value = lineArray.join("\n"); //
    console.log(lineArray.join("\n"));
}
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("intro").value = intro.map(x => `   ` + x).join("\n"); //
    console.log(intro.join("\n"));
    document.getElementById("pulsar-input").value = examples.factorial;
    trigger();
});
function trigger(){
    example = document.getElementById("pulsar-input").value.split("\n").map(x => x.trim());
    solve("ruby");
    solve("javascript");
    solve("python");
    solve("php");
}