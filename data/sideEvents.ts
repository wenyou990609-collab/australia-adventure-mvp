export interface SideEvent {
  id: number;
  title: string;
  tag: string;
  city: "Sydney" | "Melbourne" | "Both";
  description: string;
  npcLine: string;
  icon: string;
}

export const sideEvents: SideEvent[] = [
  {
    id: 1,
    title: "找一家家附近的咖啡店",
    tag: "轻探索",
    city: "Both",
    description: "走到离住处不远的一家咖啡店，点一杯简单的饮料，记住它的位置。",
    npcLine: "今天不需要征服城市，先和一张桌子、一杯热饮建立联系。",
    icon: "☕"
  },
  {
    id: 2,
    title: "坐一次不用换乘的电车或公交",
    tag: "交通熟悉",
    city: "Melbourne",
    description: "选择一条很短的路线，只坐几站，观察上下车和刷卡方式。",
    npcLine: "墨尔本的轨道像毛线团，今天先摸到其中一根线就很好。",
    icon: "🚋"
  },
  {
    id: 3,
    title: "去海边或河边站十分钟",
    tag: "城市呼吸",
    city: "Sydney",
    description: "找一个安全、容易抵达的水边地点，待十分钟，不安排别的任务。",
    npcLine: "悉尼有时候会用海风提醒你：你真的到这里了。",
    icon: "🌊"
  },
  {
    id: 4,
    title: "拍下一个陌生但喜欢的路牌",
    tag: "地图感",
    city: "Both",
    description: "在今天路过的地方，拍下一块你觉得有记忆点的路牌或店牌。",
    npcLine: "地图不是一下子熟的，是从一个个名字开始变亲切的。",
    icon: "🪧"
  },
  {
    id: 5,
    title: "买一样以前没见过的小零食",
    tag: "低压新鲜感",
    city: "Both",
    description: "在超市或便利店选一样没见过、价格不高的小东西。",
    npcLine: "未知世界也可以从薯片货架开始，不必总是宏大叙事。",
    icon: "🍪"
  },
  {
    id: 6,
    title: "给一个朋友发一张今日照片",
    tag: "关系连接",
    city: "Both",
    description: "不用写长消息，只发一张你今天看到的画面和一句话。",
    npcLine: "把今天递给别人一点点，你就不是完全独自拿着它。",
    icon: "💬"
  },
  {
    id: 7,
    title: "走进学校附近的一条小路",
    tag: "校园周边",
    city: "Both",
    description: "选择白天、安全、有人流的路线，慢慢走一小段。",
    npcLine: "主线任务之外，也要给自己的地图留一点手写边注。",
    icon: "🌿"
  },
  {
    id: 8,
    title: "和室友或同学完成一次简短寒暄",
    tag: "人际轻触",
    city: "Both",
    description: "一句问候、一个谢谢、一个简单自我介绍都算完成。",
    npcLine: "不用立刻变外向。今天只需要让声音轻轻出现一次。",
    icon: "👋"
  },
  {
    id: 9,
    title: "找到最近的药房或诊所位置",
    tag: "安心点位",
    city: "Both",
    description: "不一定要进去，只要知道它在哪里，顺手收藏到地图。",
    npcLine: "真正的安全感，有时来自你知道需要时该往哪边走。",
    icon: "💊"
  },
  {
    id: 10,
    title: "看一次当地日落",
    tag: "情绪补给",
    city: "Both",
    description: "找一个安全的位置看几分钟日落，拍不拍照都可以。",
    npcLine: "今天的存档点：天空颜色变慢的那几分钟。",
    icon: "🌇"
  }
];
