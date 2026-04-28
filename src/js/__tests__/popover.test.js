import Popover from '../popover';

describe('Popover', () => {
  let button;
  let popover;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <div class="task"></div>
      </div>
    `;

    button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Click to toggle popover';
    button.classList.add('btn', 'btn-lg', 'btn-danger');

    const task = document.querySelector('.task');
    task.appendChild(button);

    popover = new Popover();
  });

  afterEach(() => {
    popover.popovers.forEach((p) => {
      if (p.element && p.element.remove) {
        p.element.remove();
      }
    });
    popover.popovers = [];
    document.body.innerHTML = '';
  });

  test('создание popover элемент', () => {
    popover.show('Popover title', 'Some content', button);

    const popoverEl = document.querySelector('.popover');
    expect(popoverEl).not.toBeNull();
  });

  test('возврат id', () => {
    const id = popover.show('Popover title', 'Some content', button);

    expect(typeof id).toBe('number');
    expect(id).toBeGreaterThan(0);
  });

  test('правильный заголовок', () => {
    popover.show('Test Header', 'Test Body', button);

    const header = document.querySelector('.popover-header');
    expect(header.textContent).toBe('Test Header');
  });

  test('правильный текст', () => {
    popover.show('Test Header', 'Test Body', button);

    const body = document.querySelector('.popover-body');
    expect(body.textContent).toBe('Test Body');
  });

  test('popover имеет стрелку', () => {
    popover.show('Title', 'Body', button);

    const arrow = document.querySelector('.arrow');
    expect(arrow).not.toBeNull();
  });

  test('remove удаляет popover из DOM', () => {
    const id = popover.show('Title', 'Body', button);

    expect(document.querySelector('.popover')).not.toBeNull();

    popover.remove(id);

    expect(document.querySelector('.popover')).toBeNull();
  });

  test('удаление из массива', () => {
    const id = popover.show('Title', 'Body', button);

    expect(popover.popovers.length).toBe(1);

    popover.remove(id);

    expect(popover.popovers.length).toBe(0);
  });

  test('удаление одного popover не влияет на другой', () => {
    const button2 = document.createElement('button');
    button2.classList.add('btn');
    document.body.appendChild(button2);

    const id1 = popover.show('Title 1', 'Body 1', button);
    const id2 = popover.show('Title 2', 'Body 2', button2);

    popover.remove(id1);

    expect(popover.popovers.length).toBe(1);
    expect(popover.popovers[0].id).toBe(id2);
    expect(document.querySelectorAll('.popover').length).toBe(1);

    button2.remove();
  });

  test('popover позиционируется относительно элемента', () => {
    const mockRect = {
      left: 100,
      top: 200,
      width: 100,
      height: 40,
    };

    button.getBoundingClientRect = jest.fn(() => mockRect);

    popover.show('Title', 'Body', button);
    const popoverEl = document.querySelector('.popover');

    Object.defineProperty(popoverEl, 'offsetWidth', { value: 200 });
    Object.defineProperty(popoverEl, 'offsetHeight', { value: 100 });

    expect(popoverEl.style.left).toBeDefined();
    expect(popoverEl.style.top).toBeDefined();
  });
});
