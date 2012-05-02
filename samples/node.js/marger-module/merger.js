
// ファイルを扱うモジュール
var fs = require("fs");

/**
 * マージ
 */
exports.merge = function(files, output)
{
    var fileContent = [];
    
    // 読み込み
    for (var i=0,len=files.length; i<len; ++i) {
        var filename = files[i];
        console.log(filename);
        
        var file = fs.readFileSync(filename);
        fileContent.push(file.toString());
    }
    
    // マージ
    var mergedText = fileContent.join("\n\n");
    var outputFile = fs.createWriteStream(output);
    
    // 出力
    outputFile.write(mergedText);
};
