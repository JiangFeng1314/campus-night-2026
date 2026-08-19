const STORAGE_KEY = "qixi-2026-xy";
const stations = [
  {
    id: "library",
    no: "01",
    place: "北京交通大学 · 图书馆",
    title: "图书馆",
    brief: "还在的坐标",
    photo: "photos/library.jpg",
    body: "图书馆还是那栋白楼。你在里面赶硕士的进度，我在旁边装成很安静的博士生。书没变，灯没变，变的是这是我们在学校里一起过的最后一个七夕。",
  },
  {
    id: "mech",
    no: "02",
    place: "北京交通大学 · 机械楼",
    title: "机械楼",
    brief: "实验总会再来一轮",
    photo: "photos/p402.jpg",
    body: "机械楼的灯总比人更晚下班。程序报错、图要重画、仪器脾气比人都大。烦是真的烦，可忙完以后还是会坐下来吃饭。实验室的日子很吵，你在就还撑得住。",
  },
  {
    id: "pitch",
    no: "03",
    place: "北京交通大学 · 西操场",
    title: "西操场",
    brief: "风比组会诚实",
    photo: "photos/pitch.jpg",
    body: "西操场不用汇报进度。球、草皮、傍晚那一点热气，比任何组会都适合把白天的火气散掉。硕士和博士的时钟对不齐的时候，我们就来这里把步子重新走齐。",
  },
  {
    id: "dorm",
    no: "04",
    place: "北京交通大学 · 学苑宿舍楼下",
    title: "学苑宿舍楼下",
    brief: "送到了，才算今晚结束",
    photo: "photos/night.jpg",
    body: "再晚也要送到学苑宿舍楼下。这句话比情话管用。以后大概会少很多这样的夜路，所以今晚先把它点亮，当作还住在同一所学校里的证据。",
  },
  {
    id: "hall",
    no: "05",
    place: "北京交通大学 · 天佑会堂",
    title: "天佑会堂",
    brief: "学校里的热闹",
    photo: "photos/concert.jpg",
    body: "天佑会堂是学校里会响起人声的地方。散场以后灯还亮着，我们从热闹里走回日常。后来更大的现场也一起去过，可最早的热闹，是从交大开始的。",
  },
  {
    id: "stand",
    no: "06",
    place: "看台 · 绿衣服的那天",
    title: "看台",
    brief: "同一件颜色",
    photo: "photos/p407.jpg",
    body: "球场和看台不在教学楼里，可它们也是我们的校园恋爱。同一件绿色，同一场起哄。学习把人撕得很碎，看球又把人拼回去一点。",
  },
  {
    id: "after",
    no: "07",
    place: "校园门外 · 还会继续",
    title: "最后一个七夕",
    brief: "合上的是这一章",
    photo: "photos/ski.jpg",
    body: "这是我们在学校过的最后一个七夕，不是最后一个七夕。交大会留在身后，索道、夜路和以后的城市还会有。点亮这一站，信才打开。",
  },
];
const chant = "知道啦！！！\n烦死啦！！！\n我爱你！！！";
const pathEl = document.getElementById("path");
const progressEl = document.getElementById("progress");
const cover = document.getElementById("cover");
const journey = document.getElementById("journey");
const letter = document.getElementById("letter");
const card = document.getElementById("card");
const cardPhoto = document.getElementById("card-photo");
const cardPlace = document.getElementById("card-place");
const cardTitle = document.getElementById("card-title");
const cardBody = document.getElementById("card-body");
const lightBtn = document.getElementById("light-btn");
const copyBtn = document.getElementById("copy-btn");
const copyOk = document.getElementById("copy-ok");
const starsWrap = document.getElementById("stars");

// 生成闪烁星星
for(let i=0;i<130;i++){
  const dot = document.createElement("div");
  dot.className = "star-dot";
  const size = Math.random()*2.2 +0.4;
  dot.style.width = size +"px";
  dot.style.height = size +"px";
  dot.style.left = Math.random()*100 +"%";
  dot.style.top = Math.random()*100 +"%";
  dot.style.animationDelay = Math.random()*4 +"s";
  starsWrap.appendChild(dot);
}

let lit = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
let currentId = null;
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...lit]));
}
function renderPath() {
  pathEl.innerHTML = stations
    .map((s) => {
      const on = lit.has(s.id) ? "lit" : "";
      return `<li>
        <button class="stop ${on}" data-id="${s.id}" type="button">
          <img class="thumb" src="${s.photo}" alt="${s.title}" />
          <div class="meta">
            <small>${s.no}</small>
            <strong>${s.title}</strong>
            <span>${s.brief}</span>
          </div>
        </button>
      </li>`;
    })
    .join("");
  progressEl.textContent = `已点亮 ${lit.size} / 7`;
}
function openCard(id) {
  const s = stations.find((x) => x.id === id);
  if (!s) return;
  currentId = id;
  cardPhoto.src = s.photo;
  cardPhoto.alt = s.title;
  cardPlace.textContent = s.place;
  cardTitle.textContent = s.title;
  cardBody.textContent = s.body;
  lightBtn.textContent = lit.has(id) ? "已点亮 · 关闭" : "点亮这一站";
  card.classList.remove("hidden");
}
function closeCard() {
  card.classList.add("hidden");
  currentId = null;
}
function maybeLetter() {
  if (lit.size < 7) return;
  journey.classList.add("hidden");
  closeCard();
  letter.classList.remove("hidden");
  // 触发信件淡入动画
  setTimeout(()=> letter.classList.add("visible"),60);
  window.scrollTo(0, 0);
}
document.getElementById("enter-btn").addEventListener("click", () => {
  cover.classList.add("hidden");
  journey.classList.remove("hidden");
  window.scrollTo(0, 0);
  maybeLetter();
});
pathEl.addEventListener("click", (event) => {
  const btn = event.target.closest(".stop");
  if (!btn) return;
  openCard(btn.dataset.id);
});
document.getElementById("close-card").addEventListener("click", closeCard);
card.addEventListener("click", (event) => {
  if (event.target === card) closeCard();
});
lightBtn.addEventListener("click", () => {
  if (!currentId) return;
  lit.add(currentId);
  save();
  renderPath();
  closeCard();
  maybeLetter();
});
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(chant);
  } catch {
    const box = document.createElement("textarea");
    box.value = chant;
    document.body.appendChild(box);
    box.select();
    document.execCommand("copy");
    box.remove();
  }
  copyOk.classList.remove("hidden");
});
if (/MicroMessenger/i.test(navigator.userAgent)) {
  document.getElementById("wechat-tip").classList.remove("hidden");
}
renderPath();
// 如果本地已经7站全亮，页面加载完成激活信件动画
if(lit.size >=7){
  setTimeout(()=> letter.classList.add("visible"), 200);
}
