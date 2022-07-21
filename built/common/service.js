"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("whatwg-fetch");
var BASEURL = window.location.href.slice(0, window.location.href.indexOf('/', 10)) + "/api";
function Fetch(url, opt) {
    if (opt === void 0) { opt = {}; }
    var token = localStorage.getItem('token');
    opt.method = opt.method || 'GET';
    opt.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    opt.headers.token = token;
    if (opt.body) {
        opt.body = JSON.stringify(opt.body);
    }
    opt.body = JSON.stringify(opt.data) || null;
    if (opt.formdata) {
        opt.body = opt.formdata;
    }
    return fetch(url, opt)
        .then(function (response) {
        if (response.ok) {
            return response.json().then(function (res) {
                return res;
            });
        }
        else {
            return response.json().then(function (res) {
                return new Promise(function (_, reject) {
                    reject(res);
                });
            });
        }
    }).then(function (res) {
        if (res.status === -2) {
            alert(res.msg);
            localStorage.removeItem('token');
            // 重定向到根目录，重新登录
            var redirectpos = window.location.href;
            redirectpos = redirectpos.slice(0, redirectpos.indexOf('/', 10) + 1);
            window.location.href(redirectpos);
        }
        else {
            if (res.status !== 0) {
                alert(res.msg);
            }
            return res;
        }
    })
        .catch(function (e) {
        alert("\u670D\u52A1\u7AEF\u9519\u8BEF\uFF1A".concat(e.message));
        throw e;
    });
}
var Service = {
    // 绑定邮箱
    bindEmail: function (email) {
        return Fetch(new URL(BASEURL + '/user/email'), {
            method: "POST",
            data: {
                email: email
            }
        });
    },
    // whut登陆  我暂时测不了 未加入代码
    whutLogin: function () {
        return Fetch(new URL(BASEURL + '/whutlogin'), {
            method: "POST",
            data: {}
        });
    },
    // ccnu登陆 （ok 已加入代码
    ccnuLogin: function (idcard_number, password) {
        return Fetch(new URL(BASEURL + '/ccnulogin'), {
            method: "POST",
            data: {
                idcard_number: idcard_number,
                password: password
            }
        });
    },
    // 查询邮箱是否绑定
    checkUserEmail: function () {
        return Fetch(new URL(BASEURL + '/user/email/check'), {
            method: 'POST',
        });
    },
    // 发出自己的愿望 ok 已加入代码
    postWish: function (name, QQ, weChat, tel, wish, type) {
        return Fetch(new URL(BASEURL + '/wishes/add'), {
            method: 'POST',
            data: {
                wishMan_name: name,
                wishMan_QQ: QQ,
                wishMan_Wechat: weChat,
                wishMan_Tel: tel,
                wish: wish,
                type: type
            }
        });
    },
    // 点亮别人的愿望 ok APIfox测了 不知道加在哪儿 点亮有个表单要填写啊
    lightWishOn: function (id, name, tel, qq, wechat) {
        return Fetch(new URL(BASEURL + '/wishes/light'), {
            method: 'POST',
            data: {
                wish_id: id,
                light_name: name,
                light_tel: tel,
                light_qq: qq,
                light_wechat: wechat
            }
        });
    },
    // 查看愿望详情 ok 已加入代码
    getWishDetail: function (id) {
        var url = new URL(BASEURL + '/wishes/details');
        url.searchParams.append("wish_id", id);
        url.searchParams.append("time", new Date().getTime());
        return Fetch(url);
    },
    getLightManInfo: function (id) {
        var url = new URL(BASEURL + '/user/info/lightman');
        url.searchParams.append("wish_id", id);
        url.searchParams.append("time", new Date().getTime());
        return Fetch(url);
    },
    // 获取自己点亮的愿望 已加入代码 
    getUserWishLight: function () {
        var url = new URL(BASEURL + '/wishes/user/light');
        url.searchParams.append("time", new Date().getTime());
        return Fetch(url);
    },
    // 获取自己投递的愿望 已加入代码 
    getUserWishPost: function () {
        var url = new URL(BASEURL + '/wishes/user/post');
        url.searchParams.append("time", new Date().getTime());
        return Fetch(url);
    },
    // 根据分类获取愿望 ok 已加入代码
    getWishByCategories: function (category) {
        var url = new URL(BASEURL + '/wishes/categories');
        url.searchParams.append("categories", category);
        url.searchParams.append("time", new Date().getTime());
        return Fetch(url);
    },
    // 删除愿望 ok 未加入代码
    deleteWish: function (wish_id) {
        return Fetch(BASEURL + "/wishes?wish_id=".concat(wish_id), {
            method: 'DELETE'
        });
    },
    // 放弃点亮别人的愿望 ok  未加入代码
    giveUpLightWish: function (wish_id, msg) {
        return Fetch(BASEURL + "/wishes/giveup", {
            method: 'POST',
            data: {
                wish_id: wish_id,
                message: msg
            }
        });
    },
    // 实现别人的愿望 ok  未加入代码
    achieveWish: function (wish_id) {
        return Fetch(BASEURL + "/wishes/achieve", {
            method: 'POST',
            data: {
                wish_id: wish_id
            }
        });
    },
};
exports.default = Service;
