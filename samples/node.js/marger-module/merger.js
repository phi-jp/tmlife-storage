
var fs = require("fs");

/**
 * マージ
 */
exports.merge = function(files, output)
{
    var fileContent = [];
    
    for (var i=0,len=files.length; i<len; ++i) {
        var filename = files[i];
        console.log(filename);
        
        var file = fs.readFileSync(filename);
        fileContent.push(file.toString());
    }
    
    var mergedText = fileContent.join("\n\n");
    var outputFile = fs.createWriteStream(output);
    
    outputFile.write(mergedText);
};
