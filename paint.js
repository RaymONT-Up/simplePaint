const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const colorInput = document.getElementById("jsColorInput");
const range = document.getElementById("jsRange");
const ctx = canvas.getContext("2d");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const CANVAS_SIZE = 700;

// задаем размеры canvas
canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.lineWidth = 2.5;
ctx.strokeStyle = "black";

// painting = false не рисуем true = находимся в режиме рисования
let painting = false;
// включен ли режим заливки
let filling = false;

// останавливает рисование
function stopPainting() {
  painting = false;
}
// начинает рисование
function startPainting() {
  painting = true;
}
//  при движении мыши отвечает за рисование
function onMouseMove(event) {
  // получаем текущие координаты где двигается мышь на canvas
  x = event.offsetX;
  y = event.offsetY;
  // если мы не рисуем, а просто двигаемся мышью по canvas
  if (!painting) {
    // задает стартовую точку откуда будем рисовать мышь (при каждом движение мыши без рисования всегда задается стартовая точка от куда будем после рисовать)
    ctx.beginPath();
    // с помощью moveTo перемешаем созданую стартовую точку в ту позицию от куда будет рисовать мышь
    ctx.moveTo(x, y);
  } else {
    // если painting true = значит рисуем
    // проводим видимую линию в текущей позиции где находится курсор
    ctx.lineTo(x, y);
    // отрисовываем видимую линию
    ctx.stroke();
  }
}

function onMouseDown() {
  painting = true;
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

// убирает нажатие на правую кнопку в canvas
function handleCM(event) {
  event.preventDefault();
}
// сохранение изображения
function handleSaveClick() {
  const image = canvas.toDataURL("image/png");

  saveBtn.href = image;
}

// когда меняется значение input type color меняется цвет кисти
colorInput.addEventListener("input", () => {
  ctx.strokeStyle = colorInput.value;
  colorInput.style.backgroundColor = colorInput.value;

  if (filling) {
    ctx.fillStyle = colorInput.value;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
});

// берет цвет из backgroundColor у фиксированых цветов jsColor
Array.from(colors).forEach((color) =>
  color.addEventListener("click", (event) => {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
  })
);
// меняет класс active / класс active дается только одному активному цвету

let selected = null;
document.querySelector(".controls__colors").addEventListener(
  "click",
  (event) => {
    if (event.target.closest(".jsColor")) {
      if (selected) {
        selected.classList.remove("active");
      }

      selected = event.target;

      selected.classList.add("active");
    }
  },
  false
);

// когда ползунок меняет свое положение то меняется размер кисти
range.addEventListener("change", () => {
  ctx.lineWidth = range.value;
});

// если есть кнопка mode
if (mode) {
  // Меняется режим при нажатие с рисование на заливку
  mode.addEventListener("click", () => {
    if (filling === true) {
      filling = false;
      mode.innerText = "FILL";
      ctx.fillStyle = ctx.strokeStyle;
    } else {
      filling = true;
      mode.innerText = "DRAW";
      ctx.fillStyle = ctx.strokeStyle;
    }
  });
}

// если есть кнопка saveBtn
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
