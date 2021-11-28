export default class Control {
  constructor(hit, field) {
    this.hit = hit;
    this.field = field;
    this.user = document.getElementById('user');
    this.goblin = document.getElementById('goblin');
    this.hitUser = 0;
    this.hitGoblin = 0;
    this.startControl();
  }

  startControl() {
    this.field.addEventListener('click', (e) => {
      if (e.target.dataset.busy === 'goblin') {
        this.hitUser += 1;
        this.user.innerHTML = `User: ${this.hitUser}`;
        e.target.remove();
      }
    });
  }

  miss() {
    this.hitGoblin += 1;
    this.goblin.innerHTML = `Goblin: ${this.hitGoblin}`;
  }

  clearScore() {
    this.hitUser = 0;
    this.hitGoblin = 0;
    this.user.innerHTML = `User: ${this.hitUser}`;
    this.goblin.innerHTML = `Goblin: ${this.hitGoblin}`;
  }
}
