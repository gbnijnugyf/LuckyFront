export interface ITagsObject {
  name: string;
  enName: string;
  category: number;
}

export const tags: Array<ITagsObject> = [
  { name: "影音", enName: "video", category: 1 },
  { name: "游戏", enName: "game", category: 2 },
  { name: "美食", enName: "food", category: 3 },
  { name: "学习", enName: "study", category: 4 },
  { name: "运动", enName: "sport", category: 5 },
  { name: "交友", enName: "friend", category: 6 },
  { name: "打卡", enName: "trip", category: 7 },
  { name: "动漫", enName: "cartoon", category: 8 },
  { name: "其他", enName: "other", category: 9 },
];
