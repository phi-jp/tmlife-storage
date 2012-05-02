/*
 * phi
 */

// リソース
var TOUCH_SUCCESS_SE = "http://enchantjs.com/assets/sounds/se2.wav";
var TOUCH_FAILURE_SE = "http://enchantjs.com/assets/sounds/se5.wav";

// 定数
var SCREEN_WIDTH    = 320;
var SCREEN_HEIGHT   = 320;
var PIECE_X_NUM     = 10;
var PIECE_Y_NUM     = 10;
var PIECE_NUM       = PIECE_X_NUM*PIECE_Y_NUM;
var OFFSET_X        = 25;
var OFFSET_Y        = 25;
var PIECE_WIDTH     = (SCREEN_WIDTH-(OFFSET_X*2))/PIECE_X_NUM;
var PIECE_HEIGHT    = (SCREEN_WIDTH-(OFFSET_X*2))/PIECE_X_NUM;

// おまじない
enchant();

var Piece = Class.create(Label, {
    initialize: function(n) {
        Label.call(this, n);
        
        this.font = "16px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        this.number = n;
        this.width = PIECE_WIDTH-2;
        this.height = PIECE_HEIGHT-2;
        this.color = "black";
        this.backgroundColor = "white";
        this._element.style.textAlign   = "center";
        this._element.style.lineHeight  = PIECE_HEIGHT + "px";
        this._element.style.cursor      = "pointer";
    }
});

window.onload = function()
{
    var game = new Game();
    var pieceList = [];
    game.preload(TOUCH_SUCCESS_SE, TOUCH_FAILURE_SE);
    
    game.onload = function() {
        var scene = game.rootScene;
        scene.backgroundColor = "black";
        
        // 生成
        for (var i=0; i<PIECE_NUM; ++i) {
            var p = new Piece(i+1);
            p.ontouchstart = function() {
                if (this.number == game.currentIndex) {
                    game.currentIndex+=1;
                    this.backgroundColor = "gray";
                    
                    
                    if (this.number == PIECE_NUM) {
                        var seconds = Math.floor(game.frame/game.fps);
                        var msg = seconds+"秒!!" + "こんなことやってないで勉強しろ!! でもお疲れ様♪♪";
                        console.log(10000-seconds, msg);
                        game.end(10000-seconds, msg);
                    }
                    
                    game.assets[TOUCH_SUCCESS_SE].play();
                }
                else {
                    game.assets[TOUCH_FAILURE_SE].play();
                }
            };
            pieceList.push(p);
            scene.addChild(p);
        }
        
        // シャッフル
        for (var i=0; i<PIECE_NUM; ++i) {
            var r = Math.floor(Math.random()*PIECE_NUM);
            var temp = pieceList[i];
            pieceList[i] = pieceList[r];
            pieceList[r] = temp;
        }
        
        // 位置調整
        for (var i=0; i<PIECE_NUM; ++i) {
            var p = pieceList[i];
            p.x = i%PIECE_X_NUM * PIECE_WIDTH + OFFSET_X + 1;
            p.y = Math.floor(i/PIECE_X_NUM) * PIECE_HEIGHT + OFFSET_Y + 1;
        }
        
        scene.onenter = function() {
            game.frame = 0;
            game.currentIndex = 1;
        }
    };
    
    game.start();
};

