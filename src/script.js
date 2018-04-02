document.querySelector('body').addEventListener('click', function(event) {
  //при клике на нижнюю иконку навигации(под почтой) - скрываем сообщения и профиль, показываем
  //на весь экран список чатов, и наоборот
  if (event.target === document.querySelector('.fa-comment')) {
    document
      .querySelector('.inbox__dialogues-container')
      .classList.toggle('show');
    document.querySelector('.inbox__messages').classList.toggle('hide');
    document.querySelector('.inbox__profile').classList.toggle('hide');
    document
      .querySelector('.nav__icon-chats')
      .classList.toggle('nav__icon_active');
  }

  //выезжающее боковое меню гамбургер
  //его скрываем только если кликнули за пределами меню или на саму иконку
  //при клике на меню но между иконками - где нет ховера, меню не скрывается
  //типо если криворукие юзеры не могут пальцом попасть по пунктам навигации)
  if (event.target === document.querySelector('.header__nav-btn')) {
    document.querySelector('.nav').classList.toggle('active');
    document.querySelector('.header__nav-btn').classList.toggle('active');
  } else if (
    (document.querySelector('.nav').classList.contains('active') &&
      event.target.classList.contains('nav__icon')) ||
    !event.target.closest('.nav')
  ) {
    document.querySelector('.nav').classList.remove('active');
    document.querySelector('.header__nav-btn').classList.remove('active');
  }

  //обработка модалок
  let isModalBtnClicked = event.target.closest('[data-modal="btn"]');
  let modal = document.querySelector('.modal');

  if (isModalBtnClicked) {
    modal.classList.add('modal_active');
  } else if (
    modal &&
    (!event.target.closest('.modal-container') ||
      event.target.closest('.modal__list-item'))
  ) {
    modal.classList.remove('modal_active');
  }

  //тут обработка всех дропдаунов
  let closest = event.target.closest('[data-dropdown]');
  let activeDropdownsArr = [].slice.call(
    document.querySelectorAll('.dropdown.active')
  );

  if (closest) {
    closest.classList.toggle('active');
  } else if (activeDropdownsArr.length > 0) {
    activeDropdownsArr.forEach(function(dropdown) {
      dropdown.classList.remove('active');
    });
  }
});
