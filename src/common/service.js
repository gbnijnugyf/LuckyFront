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

   opt.headers.token =  token
  if (opt.body) {
    opt.body = JSON.stringify(opt.body)
  }

  opt.body = JSON.stringify(opt.data) || null;
  if (opt.formdata) {
    opt.body = opt.formdata;
  }
  console.log(opt);
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
  // 绑定邮箱 等后端改
  bindEmail(idcard_number, email) {
    return Fetch('/user/email', {
      method: "POST",
      data: {
        idcard_number: idcard_number,
        email: email
      }
    })
  },
  // whut登陆  我暂时测不了
  whutLogin() {
    return Fetch('/WhutLogin')
  },
  // ccnu登陆 （ok
  ccnuLogin(idcard_number, password) {
    return Fetch('/ccnulogin', {
      method: "POST",
      data: {
        idcard_number: idcard_number,
        password: password
      }
    })
  },
  // 获取所有愿望 （应该不需要
  getAllDesire() {
    return Fetch('/wishes')
  },
  // 发出自己的愿望 ok
  postWish(name, QQ, weChat, tel, wish, type) {
    return Fetch('/wishes', {
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
  // 点亮别人的愿望 （后端在改
  lightWishOn(id) {
    return Fetch('/wishes/light', {
      method: 'POST',
      data: {
        wish_id: id
      }
    })
  },
  // 查看愿望详情
  getWishById() {
    return Fetch('/wishes/id')
  },
  // 获取自己的愿望 后端要改
  getUserWish() {  
    return Fetch('/wishes/user')
  },
  // 根据分类获取愿望 返回的school不对
  getWishByCategories(category) {
    return Fetch(`/wishes/categories?categories=${category}`)
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