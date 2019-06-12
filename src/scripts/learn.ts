let isDone: boolean = false;
let num: number = 0;
let name: string = 'Tom';
let unusable: void = null;  //void类型只能赋予undefined和null

// 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：
let u: undefined = undefined;
let n: null = null;
// undefined 类型的变量只能被赋值为 undefined ， null 类型的变量只能被赋值为 null 。

//联合类型
let favoritNum: string | number;
favoritNum = 'seven';
favoritNum = 7;

//接口
interface Person {
    readonly id: number;
    name: string;
    age?: number;   //?表示可选属性

}

let tom: Person = {
    id: 1,
    name: 'Tom',
    age: 25
}

//数组类型
let arr: number[] = [1, 2, 3]
let arrG: Array<number> = [1, 2, 3]
interface StringArray {
    [index: number]: string
}
let arrI: StringArray = ['1', 'a', 'b']
let list: any = ['x', 25, { name: '123' }]

//类数组
function argF() {
    let args: IArguments = arguments
}

//函数类型
function sum(x: number, y: number): number {
    return x + y
}
sum(1,2)

//枚举
enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat }

// 声明文件, 引用第三方库，比如jquery
declare var $: (selector: string) => any;
// 通常我们会把声明语句放到一个单独的文件（ jQuery.d.ts ）
// 声明文件必需以 .d.ts 为后缀

//接口实现
interface SearcgFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearcgFunc = function(source: string, subString: string){
    return source.indexOf(subString) !== -1;
}

function push(array: any[], ...items: any[]) {
    items.map((item) => {
        array.push(item)
    })
}
//类实现接口
/*门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我
们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警
器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现
它 */
interface Alarm {
    alert();
}
//接口与接口之间可以是继承关系：
interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
class Door {}

class SecurityDoor extends Door implements LightableAlarm {
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
    alert() {
        console.log('SecurityDoor alert')
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert')
    }
    
}

//泛型
/**泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而
在使用的时候再指定类型的一种特性。 */
/**
 * 
 * @param length 
 * @param value 
 */
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
// 我们在函数名后添加了 <T> ，其中 T 用来指代任意输入的类型
createArray<string>(3, 'w')
// 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg;
}


// 整体导入
import * as foo from './index';