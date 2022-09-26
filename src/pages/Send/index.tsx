import { useState } from "react";

import { School, Service, wishType } from "../../common/service";
import { tags } from "../../config/Global";
import { ButtonS } from "../../components/Button";
import btnSend from "../../static/images/btnSend.png";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import selectTag from "../../static/images/selectTag.png";
const CATEGORYINIT = wishType.null;

export default function Send() {
  const navigate = useNavigate();
  const [showTag, setShowTag] = useState(false); //控制标签弹窗
  const [tagName, setTagName] = useState("选择标签"); //控制选择标签后的显示
  const [wishContent, setWishContent] = useState(""); //控制 textarea
  const [nameValue, setNameValue] = useState(""); //控制 name input
  const [school, setSchool] = useState<School>(School.初始化);
  const [numberValue, setNumberValue] = useState(""); //控制 number input
  const [tel, setTel] = useState(""); // 控制tel input
  const [selectValue, setSelectValue] = useState("QQ"); // 控制select的值
  const [category, setCategory] = useState(CATEGORYINIT); // 控制愿望分类


  // 处理填写愿望的字数限制
  const handleWishContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (document.hasFocus()) {
    }
    if (e.target.value.length > 160) {
      setWishContent(e.target.value.substr(0, 161));
      alert("不能写下更多了哦");
    }
    setWishContent(e.target.value);
  };
  // 处理 name input
  const handleNameValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  // 处理 number input
  const handleNumberValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberValue(e.target.value);
  };
  // 处理 tel input
  const handleTelValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTel(e.target.value);
  };
  // 处理 select options
  const handleSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };
  // 处理点击发送后的提交失败/成功
  const goSubmit = () => {
    // 判断必填项
    if (wishContent === "") {
      alert("你还没有填写内容哦~");
    } else if (category === wishType.null) {
      alert("你还没有选择标签分类哦~");
    } else if (nameValue === "") {
      alert("你的小幸运还没有署名哦～");
    } else if (numberValue === "") {
      alert("留下联系方式可以及时收获你的小幸运哦");
    } else {
      let QQ = selectValue === "QQ" ? numberValue : "";
      let wechat = selectValue === "WeChat" ? numberValue : "";
      Service.getManInfo("-1").then((res) => {
        setSchool(res.data.data.school)
      })
      Service.postWish(
        nameValue,
        QQ,
        wechat,
        tel,
        wishContent,
        category,
        school
      ) //标签分类通过category:number判断，而service接收字符串
        .then(() => {
          alert("投递成功！");
          navigate("/tagscreen/home");
        });
    }
  };
  // 处理选择标签的点击事件
  const changeTagName = (name: string, category: number) => {
    setShowTag(false);
    setTagName(name);
    setCategory(category);
  };
  // 打开选择标签页
  const goSelectTag = () => {
    setShowTag(true);
  };
  return (
    <>
      <ButtonS
        id="btnSelectTag"
        onClick={goSelectTag}
      ><img src={selectTag} alt="selectTag" />
        {tagName}
      </ButtonS>
      <div className="send">
        <div className="tagmask" style={{ display: showTag ? "flex" : "none" }}>
          <div className="tags">
            {tags.map((tag, index) => {
              return (
                <div
                  onClick={() => changeTagName(tag.name, index + 1)}
                  className="tag"
                  key={tag.name}
                >
                  <p>{tag.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="sendbc">
          <textarea
            className="notes"
            placeholder={
              "把你的小幸运放进小纸条吧~听说160字以内的愿望更容易实现哦~"
            }
            value={wishContent}
            onChange={handleWishContent}
          ></textarea>
          <div className="send-msg">
            <div className="sendContent">
              <div className="name">
                <p>投递人：</p>
                <input
                  type="text"
                  placeholder="必填内容哦～"
                  value={nameValue}
                  onChange={handleNameValue}
                />
              </div>
              <div className="number">
                <div className="number1">
                  <p>联系方式：</p>
                  <select value={selectValue} onChange={handleSelectValue}>
                    <option value="QQ">QQ</option>
                    <option value="WeChat">微信</option>
                  </select>
                  <input
                    type="text"
                    id="connect"
                    placeholder="必填内容哦～"
                    value={numberValue}
                    onChange={handleNumberValue}
                  />

                </div>
                <div className="number2">
                  <p>或 Tel：</p>
                  <input
                    type="text"
                    id="tel"
                    placeholder="选填内容哦～"
                    value={tel}
                    onChange={handleTelValue}
                    style={{ marginLeft: "2em" }}
                  />
                </div>
              </div>
            </div>
            <div className="sendBtn">
              <ButtonS
                id="btnSend"
                onClick={goSubmit}
              >
                <img src={btnSend} alt="send" />
              
              </ButtonS>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
