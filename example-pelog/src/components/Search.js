import Component from "../core/Component.js";

export default class Items extends Component {

  template() {
    return `
    <a class="search_Page" href="/searchPage.html">
      <svg width="17" height="17" viewBox="0 0 17 17">
        <path fill-rule="evenodd" d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z" clip-rule="evenodd" fill="currentColor">
        </path>
      </svg>
    </a>    `
  }

}