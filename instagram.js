const {open, close, swipeUp, wait, tap, isImagePresetOnScreen, doubleTap} = require('./interaction')
// if (isImagePresetOnScreen()) {
//   doubleTap()
// }
// swipeUp('com.android.chrome')
// if (isImagePresetOnScreen()) {
//   doubleTap()
// }
// swipeUp('com.android.chrome')
// if (isImagePresetOnScreen()) {
//   doubleTap()
// }
// swipeUp('com.android.chrome')
// if (isImagePresetOnScreen()) {
//   doubleTap()
// }
// swipeUp('com.android.chrome')
// if (isImagePresetOnScreen()) {
//   doubleTap()
// }
// swipeUp('com.android.chrome')
// if (isImagePresetOnScreen()) {
//   doubleTap()
// }
// swipeUp('com.android.chrome')
// if (isImagePresetOnScreen()) {
//   doubleTap()
// }
// swipeUp('com.android.chrome')
// if (isImagePresetOnScreen()) {
//   doubleTap()
// }
// swipeUp('com.android.chrome')
// if (isImagePresetOnScreen()) {
//   doubleTap()
// }
// swipeUp('com.android.chrome')
// if (isImagePresetOnScreen()) {
//   doubleTap()
// }

for (let i = 0; i < 20; i++) {
  while (!isImagePresetOnScreen()) {
    swipeUp()
  }
  doubleTap()
  swipeUp()
}
