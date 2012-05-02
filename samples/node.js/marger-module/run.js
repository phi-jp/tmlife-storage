
// merger モジュールを読み込む
var merger = require("./merger");

// マージするファイルリスト
var files = [
    "a.txt",
    "b.txt",
];

// マージした結果を c.txt として出力
merger.merge(files, "c.txt");
