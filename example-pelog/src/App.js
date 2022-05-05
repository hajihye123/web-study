import Component from "./core/Component.js";
import Search from "./components/Search.js";
import Logo from "./components/Logo.js";
import Login from "./components/Login.js";

export default class App extends Component {
  
  setup() {
    this.$state = {
      isLogin: false
    }
  }

  template () {
    return `
      <header data-component="logo"></header>
      <main data-component="search"></main>
      <footer data-component="login"></footer>
    `;
  }

  mounted () {
    const { login } = this;
    const $logo = this.$target.querySelector('[data-component="logo"]');
    const $search = this.$target.querySelector('[data-component="search"]');
    const $login = this.$target.querySelector('[data-component="login"]');

    new Logo($logo);
    new Search($search);
    new Login($login, {
      login: login.bind(this)
    });

  }

  login () {
    let { isLogin } = this.$state;
    isLogin = !isLogin;
    this.setState({ isLogin });
    console.log('isLogin:', isLogin);
  }


}

