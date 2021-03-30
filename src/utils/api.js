const axios = require("axios").default;
import $C from './config'

export default {
    // 全局配置
    common:{
        baseUrl:$C.baseUrl,
        header:{
            'Content-Type':'application/json;charset=UTF-8',
        },
        data:{},
        method:'GET',
        dataType:'json',
        token:false
    },

    async request(options={}) {
        options.url = this.common.baseUrl + options.url
        options.header = options.header || this.common.header
        options.data = options.data || this.common.data
        options.method = options.method || this.common.method
        options.dataType = options.dataType || this.common.dataType
        options.token = options.token === false ?  false : this.common.token

        return await axios.request(options)
    },
    
    async get(url, options={}) {
        options.url = url
        options.method = 'GET'
        return await (await this.request(options)).data.result
    },

    async post(url, data={}, options={}) {
        options.url = url
        options.method = 'POST'
        options.data = data
        return await (await this.request(options)).data.result
    }
}