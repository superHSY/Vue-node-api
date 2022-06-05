import axios from 'axios'

// const qs = require('qs');
// axios.defaults.baseURL = 'http://localhost:8081/'; // 配置axios请求的地址
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息

// 注册接口
export const register = (params) => {
    return axios.post('/api/register', params)
        .then(response => {
            return response
        })
}
// 登录接口
export const login = (params) => {
    return axios.post('/api/login', params)
        .then(response => {
            return response
        })
}
// 渲染页面接口
export const healthy = () => {
    return axios.get('/api/healthy')
        .then(response => {
            return response
        })
}

export const foodcenter = () => {
    return axios.get('/api/foodcenter')
        .then(response => {
            return response
        })
}

export const foodlunch = () => {
    return axios.get('/api/foodlunch')
        .then(response => {
            return response
        })
}

export const fooddinner = () => {
    return axios.get('/api/fooddinner')
        .then(response => {
            return response
        })
}
// 提交表单
export const perpic = (params) => {
    return axios.post('/api/perpic', params)
        .then(response => {
            return response
        })
}
// 删除表单
export const delespic = (params) => {
    return axios.post('/api/delespic', params)
        .then(response => {
            return response
        })
}
export const delecomm = (params) => {
    return axios.post('/api/delecomm', params)
        .then(response => {
            return response
        })
}
// 查询表单
export const query = () => {
    return axios.get('/api/query')
        .then(response => {
            return response
        })
}
// 同意
export const refullpic = (params) => {
    return axios.post('/api/refullpic', params)
        .then(response => {
            return response
        })
}
// 加入我们
export const joinu = (params) => {
    return axios.post('/api/joinu', params)
        .then(response => {
            return response
        })
}
// 加入我们
export const findjoin = (params) => {
    return axios.get('/api/findjoin')
        .then(response => {
            return response
        })
}
// 删除我们
export const dele = (params) => {
    return axios.post('/api/dele', params)
        .then(response => {
            return response
        })
}
// 同意我们
export const refull = (params) => {
    return axios.post('/api/refull', params)
        .then(response => {
            return response
        })
}
// meals
export const mealImage = (params) => {
    return axios.post('/api/mealImage', params)
        .then(response => {
            return response
        })
}
export const meals = (params) => {
    return axios.get('/api/meals')
    .then(response => {
        return response
    })
}
export const refullcomm = (params) => {
    return axios.post('/api/refullcomm', params)
        .then(response => {
            return response
        })
}
// 修改密码
export const repair = (params) => {
    return axios.post('/api/repair', params)
        .then(response => {
            return response
        })
}
export const queryfood = (params) => {
    return axios.post('/api/queryfood', params)
        .then(response => {
            return response
        })
}
export const area = (params) => {
    return axios.post('/api/area', params)
        .then(response => {
            return response
        })
}
export const queryarea = () => {
    return axios.get('/api/queryarea')
        .then(response => {
            return response
        })
}
export const findperple = () => {
    return axios.get('/api/findperple')
        .then(response => {
            return response
        })
}
export const cancel = (params) => {
    return axios.post('/api/cancel', params)
        .then(response => {
            return response
        })
}
export const delequery = (params) => {
    return axios.post('/api/delefood', params)
        .then(response => {
            return response
        })
}
