/**?
 * 封装 type
 * 用于查看值类型
 * 方法调用 type();
 */

function type(target) {
    var ret = typeof target;
    var template = {
        "[object Array]": "array",
        "[object Object]": "object",
        "[object Number]": "number - object",
        "[object Boolean]": "boolean - object",
        "[object String]": "string - object",
    };

    if (target === null) {
        return "null";
    }

    if (ret == "object") {
        //数组  对象  包装类  引用类型
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return ret;
    }
}


/**?
 * 数组去重
 * 例子 arr
 * 方法调用 arr.unique();
 */

var arr = [1, 1, 1, 1, 1, 1, 11, 2, 22, 2, 2, 2, 2, 2, 2, 2];
Array.prototype.unique = function () {
    var temp = {};
    arr = [];
    len = this.length; //for循环调用的时候可以少调用几次
    for (var i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = "abc"; //能走到这的值都是没重复的值
            arr.push(this[i]);
        }
    }
    return arr;
};


/**?
 * 数组去重
 * 例子 deepClone obj -> obj1
 * 方法调用 deepClone(obj, obj1)
 */

var obj = {
    name: "aaaa",
    age: 123,
    sex: "female",
    card: ["visa", "master"],
    wife: {
        name: "bbbb",
        son: {
            name: "cccc",
        },
    },
};

var obj1 = {};

function deepClone(origin, target) {
    var target = target || {};
    toStr = Object.prototype.toString,
        arrStr = ["Object Array"];
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {//防止传进来的对象有原型，避免拿他原型链上的属性
            if (origin[prop] !== "null" && typeof (origin[prop]) == 'object') {
                //引用值
                // if(toStr.call(origin[prop]) == arrStr) {//因为是引用值，看看它现在传进来的是不是一个数组，
                //   target[prop] = []; //是的话就建立数组
                // }else {
                //   target[prop] = {}; //不是的话就建立对象
                // }
                toStr.call(origin[prop]) == arrStr ? target[prop] = [] : target[prop] = {};

                deepClone(origin[prop], target[prop]); //通过递归，继续走方法，是原始值的话就else出去，不是的话就继续。
            } else {
                //就是原始值   直接赋
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}