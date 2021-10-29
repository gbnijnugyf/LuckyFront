import 'whatwg-fetch';
import Notification from 'rc-notification';

function Fetch(url, opt = {}) {
    const token = localStorage.getItem('token')
  const BASEURL = "/api"
    url = BASEURL + url;

    opt.method = opt.method || 'GET';
    opt.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    opt.headers.token = token
    if (opt.body) {
        opt.body = JSON.stringify(opt.body)
    }

    opt.body = JSON.stringify(opt.data) || null;
    if (opt.formdata) {
        opt.body = opt.formdata;
    }
    // console.log(opt);
    return fetch(url, opt)
        .then(response => {
            if (response.ok) {
                return response.json().then(res => {
                    console.log(res);
                    return res;
                });
            } else {
                return response.json().then(res => {
                    return new Promise((_, reject) => {
                        reject(res);
                    });
                });
            }
        })
        .catch(e => {
            Notification.newInstance({}, notification => {
                notification.notice({
                    content: `服务端错误：${e.message}`
                });
            });
            throw e;
        });
}

let Service = {
    // 绑定邮箱
    bindEmail(email) {
        return Fetch('/user/email', {
            method: "POST",
            data: {
                email: email
            }
        })
    },
    // whut登陆  我暂时测不了 未加入代码
    whutLogin() {
        return Fetch('/whutlogin')
    },
    // ccnu登陆 （ok 已加入代码
    ccnuLogin(idcard_number, password) {
        return Fetch('/ccnulogin', {
            method: "POST",
            data: {
                idcard_number: idcard_number,
                password: password
            }
        })
    },
    // 查询邮箱是否绑定
    checkUserEmail() {
        return Fetch('/user/email/check', {
            method: 'POST',
        })
    },
    // 发出自己的愿望 ok 已加入代码
    postWish(name, QQ, weChat, tel, wish, type) {
        return Fetch('/wishes/add', {
            method: 'POST',
            data: {
                wishMan_name: name,
                wishMan_QQ: QQ,
                wishMan_Wechat: weChat,
                wishMan_Tel: tel,
                wish: wish,
                type: type
            }
        })
    },
    // 点亮别人的愿望 ok APIfox测了 不知道加在哪儿 点亮有个表单要填写啊
    lightWishOn(id) {
        return Fetch('/wishes/light', {
            method: 'POST',
            data: {
                wish_id: id
            }
        })
    },
    // 查看愿望详情 ok 已加入代码
    getWishDetail(id) {
        return Fetch(`/wishes/details?wish_id=${id}`)
    },
    // 获取自己点亮的愿望 已加入代码 
    getUserWishLight() {
        return Fetch('/wishes/user/light')
    },
      // 获取自己投递的愿望 已加入代码 
    getUserWishPost() {
        return Fetch('/wishes/user/post')
    },
    // 根据分类获取愿望 ok 已加入代码
    getWishByCategories(category) {
        return Fetch(`/wishes/categories?categories=${category}`)
    },
    // 删除愿望 ok 未加入代码
    deleteWish(wish_id) {
        return Fetch(`/wishes?wish_id=${wish_id}`)
    },
    // 放弃点亮别人的愿望 ok  未加入代码
    giveUpLightWish(wish_id, msg) {
        return Fetch(`/wishes/giveup`, {
            method: 'POST',
            data: {
                wish_id: wish_id,
                message: msg
            }
        })
    },
    // 实现别人的愿望 ok  未加入代码
    achieveWish(wish_id) {
        return Fetch(`/wishes/achieve`, {
            method: 'POST',
            data: {
                wish_id: wish_id
            }
        })
    },
};

export default Service;