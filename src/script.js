class Dashboard {
  constructor() {
    this.body = document.querySelector('body');
    this.navigation = document.querySelector('.nav');
    this.navigationBtn = document.querySelector('.header__nav-btn');
    this.initEventHandlers();
  }

  handleChatsClick() {
    //при клике на нижнюю иконку навигации(под почтой) - скрываем сообщения и профиль,
    //показываем на весь экран список чатов, и наоборот
    this.body.addEventListener('click', event => {
      if (event.target.closest('.fa-comment')) {
        document
          .querySelector('.inbox__dialogues-container')
          .classList.toggle('show');
        document.querySelector('.inbox__messages').classList.toggle('hide');
        document.querySelector('.inbox__profile').classList.toggle('hide');
        document
          .querySelector('.nav__icon-chats')
          .classList.toggle('nav__icon_active');
      }
    });
  }

  handleSlidingMenuClick() {
    //выезжающее боковое меню гамбургер
    this.body.addEventListener('click', event => {
      if (event.target.closest('.header__nav-btn')) {
        this.navigation.classList.toggle('active');
        this.navigationBtn.classList.toggle('active');
      } else if (
        (this.navigation.classList.contains('active') &&
          event.target.classList.contains('nav__icon')) ||
        !event.target.closest('.nav')
      ) {
        this.navigation.classList.remove('active');
        this.navigationBtn.classList.remove('active');
      }
    });
  }

  handleModalClick() {
    this.body.addEventListener('click', event => {
      const isModalBtnClicked = event.target.closest('[data-modal="btn"]');
      const modal = document.querySelector('.modal');

      if (isModalBtnClicked) {
        modal.classList.add('modal_active');
      } else if (
        modal &&
        (!event.target.closest('.modal-container') ||
          event.target.closest('.modal__list-item'))
      ) {
        modal.classList.remove('modal_active');
      }
    });
  }

  handleDropdownClick() {
    this.body.addEventListener('click', event => {
      const clickedDropdown = event.target.closest('[data-dropdown]');
      const activeDropdown = document.querySelector('.dropdown.active');

      if (clickedDropdown) {
        clickedDropdown.classList.toggle('active');
      }

      if (activeDropdown) {
        activeDropdown.classList.remove('active');
      }
    });
  }

  initEventHandlers() {
    this.handleChatsClick();
    this.handleSlidingMenuClick();
    this.handleModalClick();
    this.handleDropdownClick();
  }
}

document.addEventListener('DOMContentLoaded', event => {
  new Dashboard();
});
