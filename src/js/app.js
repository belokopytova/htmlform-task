import Popover from './popover';

const popoverFactory = new Popover();
let actualPopovers = [];
const popoverText = "And here's some amazing content. It's very engaging. Right?";

const container = document.querySelector('.container');

const onClick = (e) => {
  const { target } = e;

  if (target.classList.contains('btn')) {
    const matchingPopover = actualPopovers.find(
      (popover) => popover.name === target.name,
    );

    if (matchingPopover) {

      popoverFactory.remove(matchingPopover.id);
      actualPopovers = actualPopovers.filter(
        (popover) => popover.id !== matchingPopover.id,
      );
    } else {

      actualPopovers.push({
        name: target.name,
        id: popoverFactory.show('Popover title', popoverText, target),
      });
    }
  }
};

window.addEventListener('click', onClick);

const button = document.createElement('button');
button.type = 'button';
button.innerHTML = 'Click to toggle popover';
button.classList.add('btn', 'btn-lg', 'btn-danger');

const tasks = container.querySelectorAll('.task');
const task1 = tasks[0];
task1.appendChild(button);
