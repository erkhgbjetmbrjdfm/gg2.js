# gg2.js

ゲーム用のライブラリ
* 線、箱、円の描画
* 当たり判定

読み込む
```html
<script src="https://raw.githubusercontent.com/erkhgbjetmbrjdfm/gg2.js/refs/heads/main/gg2.js"></script>
```

## カメラを作る
```javascript
new Camera(x座標,y座標)
```

## カメラを切り替える
```javascript
カメラ.switching()
```

## オブジェクトを作成

```javascript
//ポイントを作成
new point(x座標, y座標)

//線を作成
//始点と終点はpoint
new line(始点, 終点, ?色)

//箱を作成
new box(x座標, y座標, 横幅, 縦幅, ?色)

//円を作成
new circle(x座標, y座標, 半径, ?色)
```

## オブジェクトを追加

```javascript
workspace.add(オブジェクト)
```

## オブジェクトの削除
```javascript
オブジェクト.delete()
```

## 当たり判定
```javascript
オブジェクト.touchObject()
//触れているオブジェクトの配列を返す
```

## 毎フレーム実行する

```javascript
ondraw = () => {
    //処理
}
```

## マウスの位置を取得
```javascript
mouseX //x座標
mouseY //y座標
```

## 押されているキーを種類
```javascript
keys //押されているキーのSet
```