import * as axios from 'axios'
 
declare module 'axios' {
   interface AxiosInstance {
      // eslint-disable-next-line no-undef
      (config: AxiosRequestConfig): Promise<any>
   }
}
// 接口返回的数据也要定义，不然会报错，只声明，没有定义
