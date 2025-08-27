const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    e.preventDefault(); // prevent text selection

    selectedCube = cube;

    // convert from inline-block/grid to absolute positioning
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cube.style.position = 'absolute';
    cube.style.left = (rect.left - containerRect.left) + 'px';
    cube.style.top = (rect.top - containerRect.top) + 'px';
    cube.style.zIndex = 1000;
    cube.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = selectedCube.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Constrain inside container
  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + cubeRect.width > containerRect.width) {
    newLeft = containerRect.width - cubeRect.width;
  }
  if (newTop + cubeRect.height > containerRect.height) {
    newTop = containerRect.height - cubeRect.height;
  }

  selectedCube.style.left = newLeft + 'px';
  selectedCube.style.top = newTop + 'px';
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.zIndex = 1;
    selectedCube.style.cursor = 'grab';
    selectedCube = null;
  }
});
