.item:nth-child(9n+1) { background: dodgerblue;}
.item:nth-child(9n+2) { background: goldenrod;}
.item:nth-child(9n+3) { background: paleturquoise;}
.item:nth-child(9n+4) { background: gold;}
.item:nth-child(9n+5) { background: cadetblue;}
.item:nth-child(9n+6) { background: tomato;}
.item:nth-child(9n+7) { background: lightcoral;}
.item:nth-child(9n+8) { background: darkslateblue;}
.item:nth-child(9n+9) { background: rebeccapurple;}
.item:nth-child(even) { transform: scaleX(1.31) rotateY(40deg); }
.item:nth-child(odd) { transform: scaleX(1.31) rotateY(-40deg); }


const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');


container.style.display = 'grid';
container.style.gridTemplateColumns = 'repeat(5, 120px)';
container.style.gridTemplateRows = 'repeat(5, 120px)';
container.style.gap = '0';
container.style.overflow = 'auto';
container.style.whiteSpace = 'normal';
container.style.alignContent = 'center';
container.style.justifyContent = 'center';


items.forEach(item => {
  item.style.width = '120px';
  item.style.height = '120px';
  item.style.transform = 'none';
  item.style.fontSize = '40px'; // Adjusted for better fit in smaller size
});


let containerRect = container.getBoundingClientRect();
const positions = Array.from(items).map(item => {
  const rect = item.getBoundingClientRect();
  return {
    left: rect.left - containerRect.left,
    top: rect.top - containerRect.top
  };
});


items.forEach((item, index) => {
  item.style.position = 'absolute';
  item.style.left = `${positions[index].left}px`;
  item.style.top = `${positions[index].top}px`;
});


let selectedItem = null;
let offsetX = 0;
let offsetY = 0;


items.forEach(item => {
  item.addEventListener('mousedown', e => {
    selectedItem = item;
    containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;
    item.style.zIndex = '1000'; 
    container.classList.add('active');
    e.preventDefault();
  });
});


document.addEventListener('mousemove', e => {
  if (!selectedItem) return;
  containerRect = container.getBoundingClientRect(); 


  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;


  const itemWidth = selectedItem.offsetWidth;
  const itemHeight = selectedItem.offsetHeight;
  newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - itemWidth));
  newTop = Math.max(0, Math.min(newTop, container.clientHeight - itemHeight));


  selectedItem.style.left = `${newLeft}px`;
  selectedItem.style.top = `${newTop}px`;
});


document.addEventListener('mouseup', () => {
  if (selectedItem) {
    selectedItem.style.zIndex = ''; 
    container.classList.remove('active');
    selectedItem = null;
  }
});