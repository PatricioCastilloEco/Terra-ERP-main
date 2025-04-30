class SidebarComponent extends HTMLElement {
    connectedCallback() {
      fetch('/views/sidebar.html')
        .then(res => res.text())
        .then(html => this.innerHTML = html);
    }
  }
  
  customElements.define('sidebar-component', SidebarComponent);
  