var keyMirror = require('fbjs/lib/keyMirror');

// とりあえずイベントはdispatcherとstoreで使うので定数化
// store→component感も同じようにしちゃダメなんだろうか・・・　
module.exports = keyMirror({
  TODO_ADD:null
})
