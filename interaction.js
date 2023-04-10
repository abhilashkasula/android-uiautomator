const {execSync} = require('child_process');
const {XMLParser} = require('fast-xml-parser');

const open = package => {
  execSync(`adb shell monkey -v -p ${package} 1`);
};

const close = package => {
  execSync(`adb shell am force-stop ${package}`);
};

const tap = (x, y) => {
  execSync(`adb shell input tap ${x} ${y}`);
}

const tapOn = (key, value) => {
  const screen = getUI();
  // console.log(JSON.stringify(nodes))
  const node = getObject(screen, `@_${key}`, value);
  if (!node) {
    console.log('Node not found');
    return;
  }
  const coords = node['@_bounds'].match(/[0-9]+/g);
  const x = (+coords[0] + +coords[2]) / 2;
  const y = (+coords[1] + +coords[3]) / 2;
  tap(x, y)
};

const isImagePresetOnScreen = () => {
  const screen = getUI();
  const nodes = filterByIds(screen, '@_resource-id', 'com.instagram.android:id/zoomable_view_container')
  
  return nodes.some(node => {
    const [, y1,, y2] = node['@_bounds'].match(/[0-9]+/g)
    return (+y1) <= 1440 && 1440 <= (+y2);
  })
}

const filterByIds = (theObject, field, value) => {
  // console.log(theObject)
  let result = [];
  if (theObject instanceof Array) {
    for (var i = 0; i < theObject.length; i++) {
      let test = filterByIds(theObject[i], field, value);
      if (test.length > 0) {
        result.push(...test)
      }
    }
  } else {
    for (let prop in theObject) {
      if (prop === field) {
        if (theObject[prop] === value) {
          result.push(theObject)
          return result
        }
      }
      if (
        theObject[prop] instanceof Object ||
        theObject[prop] instanceof Array
      ) {
        let test = filterByIds(theObject[prop], field, value);
        result.push(...test)
      }
    }
  }
  return result;
}


const getUI = () => {
  const screen = execSync('adb exec-out uiautomator dump /dev/tty');
  const options = {
    ignoreAttributes: false,
    // alwaysCreateTextNode: true
  };
  const parser = new XMLParser(options);
  return parser.parse(screen).hierarchy;
};

function getObject(theObject, field, value) {
  var result = null;
  if (theObject instanceof Array) {
    for (var i = 0; i < theObject.length; i++) {
      result = getObject(theObject[i], field, value);
      if (result) {
        break;
      }
    }
  } else {
    for (var prop in theObject) {
      // console.log(prop + ': ' + theObject[prop]);
      if (prop == field) {
        if (theObject[prop] == value) {
          return theObject;
        }
      }
      if (
        theObject[prop] instanceof Object ||
        theObject[prop] instanceof Array
      ) {
        result = getObject(theObject[prop], field, value);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
}

const write = text => {
  execSync(`adb shell input text ${text.replace(/ /g, '%s')}`);
};

const backspace = times => {
  let events = '';
  for (let i = 0; i < times; i++) {
    events += ' 67';
  }
  execSync(`adb shell input keyevent ${events}`);
};

const clear = () => {
  execSync(
    `adb shell input keycombination 113 29 && adb shell input keyevent 67`
  );
};

const enter = () => {
  execSync(`adb shell input keyevent 66`);
};

const swipeDown = () => {
  execSync(`adb shell input swipe 580 900 540 1930`);
};

const swipeUp = () => {
  execSync(`adb shell input swipe 540 1930 580 900`);
};

const wait = time => {
  execSync(`sleep ${time}`);
};

const doubleTap = (x, y) => {
  x = x || 580;
  y = y || 1440;

  execSync(`adb shell "input tap ${x} ${y}; sleep 0.1; input tap ${x} ${y}"`);
};

module.exports = {
  open,
  close,
  write,
  backspace,
  clear,
  tap,
  tapOn,
  enter,
  swipeUp,
  swipeDown,
  wait,
  doubleTap,
  isImagePresetOnScreen

};
