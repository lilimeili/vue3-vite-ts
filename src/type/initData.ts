// interface selectData{
//     title: string,
//     introduce: string,
//     page: number,
//     count: number,
//     pageSize:number,
// }
interface ListInit{
    // introduce: string,
    id: number,
    typeName:string,
}
export class InitData {
    // selectData: selectData = {
    //     title: '',
    //     introduce: '',
    //     page: 1,
    //     count: 0,
    //     pageSize:2,
    // // }
     typelist:ListInit[]=[]
}