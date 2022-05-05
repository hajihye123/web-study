import Component from "../core/Component.js";

export default class ItemFilter extends Component {

  template() {
    return `
    <button color="darkGray" class="login_btn">로그인</button>
    `
  }

  setEvent() {
    const { login } = this.$props;
    this.addEvent('click', '.login_btn', () => {
      login();
    });
  }

}