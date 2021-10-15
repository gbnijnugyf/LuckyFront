import 'whatwg-fetch';
import Notification from 'rc-notification';

function Fetch(url, opt = {}) {
  const token = localStorage.getItem('token')
  const BASEURL = 'http://127.0.0.1:4523/mock/382189';
  url = BASEURL + url;

  opt.method = opt.method || 'GET';
  opt.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

   opt.headers.Authorization = `Bearer ` + token
  if (opt.body) {
    opt.body = JSON.stringify(opt.body)
  }

  opt.body = JSON.stringify(opt.data) || null;
  if (opt.formdata) {
    opt.body = opt.formdata;
  }
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
  // 绑定邮箱 ok
  bindEmail(idcard_number, email) {
    return Fetch('/user/email', {
      method: "POST",
      data: {
        idcard_number: idcard_number,
        email: email
      }
    })
  },
  // whut登陆 
  whutLogin() {
    return Fetch('/WhutLogin')
  },
  // ccnu登陆 ok
  ccnuLogin(idcard_number, password) {
    return Fetch('/Ccnulogin', {
      method: "POST",
      data: {
        idcard_number: idcard_number,
        password: password
      }
    })
  },
  // 获取所有愿望 应该不需要
  getAllDesire() {
    return Fetch('/wishes')
  },
  // 发出自己的愿望 差一个type 后端要改
  postWish(name, QQ, weChat, tel, wish) {
    return Fetch('/wishes', {
      method: 'POST',
      data: {
        wishMan_name: name,
        wishMan_QQ: QQ,
        wishMan_Wechat: weChat,
        wishMan_Tel: tel,
        wish: wish
      }
    })
  },
  // 点亮别人的愿望 后端在改
  lightWishOn(id) {
    return Fetch('/wishes/light', {
      method: 'POST',
      data: {
        wish_id: id
      }
    })
  },
  // 查看愿望
  getWishById() {
    return Fetch('/wishes/id')
  },
  getUserWish() {
    return Fetch('/wishes/user')
  },
  // 根据分类获取愿望 要改query路径啊
  getWishByCategories(category) {
    return Fetch(`/wishes/categories`)
  },
  // 删除愿望
  deleteWish() {
    return Fetch('')
  },
  // 留言
  leaveMessage() {
    return Fetch('/message/leave')
  },
  //??
  getUserMessage() {
    return Fetch('/message')
  }

};

export default Service;