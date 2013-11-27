var crypto = require('crypto');
var tty = require('tty');
var url = require('url');

exports.trim = function(str) {
  return str.replace(/^\s+|\s+$/g,"");
};

//destructively consumes the list
exports.syncForEach = function(list, callback, end, offset) {
  if(!offset) offset = 0;
  if(list.length > offset) {
    callback(list[offset], function() {
      exports.syncForEach(list[offset], callback, end, offset + 1);
    });
  } else {
    end();
  }
};

exports.iterateUntilNoneSatisfy = function(list, test, callback, end) {
  var gotOne = false;
  var i = 0;

  while((!gotOne) && (i<list.length)) {
    if(test(list[i])) {
      gotOne = true;
      callback(list[i], function() {exports.iterateUntilNoneSatisfy(list, test, callback, end)});
    }
    i++;
  }
  if(!gotOne) end();
};

// should be called with the child as the receiver
// DEPRECATED: use the new style classes instead
exports.inherit = function(parent) {
  if(arguments.length > 1) {
    // this allows chaining multiple classes in the call
    parent.inherit(Array.prototype.slice.call(arguments, 1));
  }
  this._super = parent;
  Object.defineProperty(this.prototype, '_constructor', {enumerable: false, value: this});
  this.prototype.__proto__ = parent.prototype;
  this.__proto__ = parent;
};

// For syncing multiple async calls
exports.Sync = function(count) {
  this.count = count || 0;
  this.done = function() {
    this.count--;
    if((this.count == 0) && (this.closure)) this.closure();
  };
  this.finish = function(closure) {
    this.closure = closure;
    if(this.count == 0) this.closure();
  }
};

// For asking something on command line
exports.ask = function(question, callback) {
 var stdin = process.stdin, stdout = process.stdout;
 var str = '';

 tty.setRawMode(true);
 stdin.resume();
 stdout.write(question + ": ");
 
 stdin.on('data', function(data) {
   var tmp = data.toString();
   if(tmp.indexOf('\x0d') < 0) {
       str += tmp;
   }
   else {
       str += tmp.slice(0, tmp.indexOf('\x0d'));
       tty.setRawMode(false);
       callback(str);
   }
 });
};

var emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

exports.isValidEmailAddress = function(email) {
    // check that it's a properly formatted email address
    if(!email) return false;
    if(!email.match(emailRegex)) return false;
    return true;
};

exports.isValidWebUrl = function(aUrl) {
    try {
        return ['http:', 'https:'].includes(url.parse(aUrl).protocol);
    } catch(e) {
        return false;
    }
};

exports.isValidHttpsUrl = function(aUrl) {
    try {
        return (url.parse(aUrl).protocol == 'https:');
    } catch(e) {
        return false;
    }
};

exports.extend = function(a, b) {
  for(var k in b) {a[k] = b[k]}
};
