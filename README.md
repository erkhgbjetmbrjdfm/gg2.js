# gg2.js

ゲーム用のライブラリ
* 線、箱、円の描画
* 当たり判定

読み込む
```html
<script src="https://raw.githubusercontent.com/erkhgbjetmbrjdfm/gg2.js/refs/heads/main/gg2.js"></script>
```

## オブジェクトを作成する

```javascript
//ポイントを作成
new point(x座標, y座標)

//線を作成
//始点と終点はpoint
new line(始点, 終点, ?色)

//箱を作成
new box(x座標, y座標, 横幅, 縦幅, ?色)

//円を作成
new circle(x座標, y座標, 半径)
```

## オブジェクトを追加

```javascript
workspace.add(オブジェクト)
```

## 当たり判定
```javascript
オブジェクト.touchObject()
//触れているオブジェクトの配列を返す
```

## 毎フレーム描画する

```javascript
function draw() {
        drawAll();
        requestAnimationFrame(draw);
}
draw()
```
