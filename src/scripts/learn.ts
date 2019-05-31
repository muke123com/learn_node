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