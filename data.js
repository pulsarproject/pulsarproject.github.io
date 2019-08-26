var language, line, example, u;
var indent = 0;
const specialchar = `!+-=%&:;{}[]()<>*" `.split("");
const indentArray = [
    "if", 
    "elif", 
    "else", 
    "forLoop", 
    "whileLoop", 
    "function"
];
const keywords = [
    "function",
    "def",
    "if",
    "else",
    "elif",
    "elseif",
    "int",
    "char",
    "bool",
    "String",
    "float",
    "return",
    "for",
    "while",
    "console",
    "log",
    "fmt",
    "Println",
    "echo",
    "print",
    "var",
];
const intro = [
    `Pulsar is an experimental language designed to be translated into various programming languages such as PHP, JavaScript, and Python.`,
    `While the language is still in development, it could some day be used for educational purposes.`,
    `Additionally, Pulsar can be used as an interesting tool to compare how one would write a program in unfamiliar languages`,
    `Future updates will include extensive documentation, and possibly alter the script's syntax.`,
    `Try editing the example program on the right, and watch the output change below.`,
];
const data = {
    comment: function(arr){ //text
        var text = arr[0];
        switch(language){
            case "javascript":
                return `//${text}`;
            case "php":
            case "python":
            case "ruby":
                return `#${text}`;
        }
    },
    if: function(arr){ //conditional
        var conditional = arr[0];
        switch(language){
            case "python":
                return `if ${conditional}:`;
            case "javascript":
            case "php":
                return `if(${conditional}){`;
            case "ruby":
                return `if ${conditional}`;
        }
    },
    elif: function(arr){ //conditional
        var conditional = arr[0];
        switch(language){
            case "python":
                return `elif ${conditional}:`;
            case "javascript":
                return `else if(${conditional}){`;
            case "php":
                return `elseif(${conditional}){`;
            case "ruby":
                return `elsif ${conditional}`;
        }
    },
    else: function(){ //
        switch(language){
            case "python":
                return `else:`;
            case "javascript":
            case "php":
                return `else{`;
            case "ruby":
                return `else`;
        }
    },
    end: function(){ //
        switch(language){
            case "python":
                return ``;
            case "javascript":
            case "php":
                return `}`;
            case "ruby":
                if(example[u+1]!==undefined){
                    if((example[u+1].startsWith("elif"))||(example[u+1].startsWith("else"))){
                        return ``;
                    }
                    else{
                        return `end`;
                    }
                }
                else{
                    return `end`;
                }
        }
    },
    forLoop: function(arr){ //variable, lowerLimit, upperLimit
        var variable = arr[0];
        var lowerLimit = arr[1];
        var upperLimit = arr[2];
        switch(language){
            case "python":
                return `for ${variable} in range(${lowerLimit}, ${upperLimit} + 1):`;
            case "javascript":
                return `for(var ${variable} = ${lowerLimit}; ${variable} <= ${upperLimit}; ${variable}++){`;
            case "php":
                return `for(${variable} = ${lowerLimit}; ${variable} <= ${upperLimit}; ${variable}++){`;
            case "ruby":
                return `for ${variable} in ${lowerLimit}..${upperLimit}`;
        }
    },
    function: function(arr){ //functionName, functionType, variables[]
        var functionName = arr[0];
        var functionType = arr[1];
        var variables = arr[2].split(",");
        switch(language){
            case "python":
                return `def ${functionName}(${variables.map(x => x.split("@")[1]).join(", ")}):`;
            case "javascript":
            case "php":
                return `function ${functionName}(${variables.map(x => x.split("@")[1]).join(", ")}){`;
            case "ruby":
                return `def ${functionName}(${variables.map(x => x.split("@")[1]).join(", ")})`;
        }    
    },
    print: function(arr){ //text
        var text = arr[0];
        switch(language){
            case "python":
                return `print(${text})`;
            case "javascript":
                return `console.log(${text})`;
            case "php":
                return `echo ${text}`;
            case "ruby":
                return `puts ${text}`;
        }    
    },
    whileLoop: function(arr){ //conditional
        var conditional = arr[0];
        switch(language){
            case "python":
                return `while ${conditional}:`;
            case "javascript":
            case "php":
                return `while(${conditional}){`;
            case "ruby":
                return `while ${conditional}`;
        }    
    },
};