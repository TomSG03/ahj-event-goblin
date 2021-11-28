import goblinImg from '../img/goblin.png';
import Control from './control';

export default class Cells {
  constructor(x, y, parent, time) {
    this.x = x;
    this.y = y;
    this.count = x * y;
    this.parent = parent;
    this.time = time;
    this.cell = {
      width: Math.round(this.parent.offsetWidth / x) - 6,
      height: Math.round(this.parent.offsetHeight / y) - 6,
    };
    this.init();
    this.controlGame = new Control(5, parent);
  }

  init() {
    this.createCells();
    this.createFigure();

    document.querySelector('.start').addEventListener('click', () => {
      clearInterval(this.timer);
      this.controlGame.clearScore();
      this.startMove();
    });
  }

  createCells() {
    for (let index = 0; index < this.count; index += 1) {
      const block = document.createElement('div');
      block.className = 'cells';
      block.style.width = `${this.cell.width}px`;
      block.style.height = `${this.cell.height}px`;
      this.parent.append(block);
    }

    this.cells = document.getElementsByClassName('cells');
  }

  createFigure() {
    const evilGoblin = document.createElement('img');
    evilGoblin.src = goblinImg;
    evilGoblin.alt = 'Goblin';
    evilGoblin.style.width = `${this.cell.width - 5}px`;
    evilGoblin.style.height = `${this.cell.height - 5}px`;
    evilGoblin.dataset.busy = 'goblin';
    const pos = this.getPos(0);
    this.cells[pos].appendChild(evilGoblin);

    this.goblin = document.querySelector('[data-busy=goblin]');
  }

  getPos(old) {
    let newPos;
    do {
      newPos = this.random();
    } while (newPos === old);
    this.position = newPos;
    return newPos;
  }

  random() {
    return Math.floor(Math.random() * this.count);
  }

  startMove() {
    this.timer = setInterval(() => {
      const old = Array.from(this.cells).findIndex((item) => item.firstChild !== null);
      if (old !== -1) {
        this.controlGame.miss();
        if (this.controlGame.hitGoblin >= 5) {
          clearInterval(this.timer);
          alert('You lost!!!');
        }
      }
      const next = this.getPos(old);
      this.cells[next].appendChild(this.goblin);
    }, this.time);
  }
}
