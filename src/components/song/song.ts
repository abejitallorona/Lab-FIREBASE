import styles from './song.css';

export enum Attribute {
  'image' = 'image',
  'utitle' = 'utitle',
  'autor' = 'autor',
  'album' = 'album',
  'dateadded' = 'dateadded',
  'duration' = 'duration',
}

class Song extends HTMLElement {
  image?: string;
  utitle?: string;
  autor?: string;
  album?: string;
  dateadded?: number;
  duration?: number;

  constructor(){
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
      return Object.values(Attribute);
  }

  attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
      switch (propName) {
          case Attribute.dateadded:
              this.dateadded = newValue ? Number(newValue) : undefined;
              break;
          case Attribute.duration:
              this.duration = newValue ? Number(newValue) : undefined;
              break;
          default:
              this[propName] = newValue;
              break;
      }
      this.render();
  }

  render() {
      if (this.shadowRoot) {
        
          this.shadowRoot.innerHTML = `
              <style>${styles}</style>
              <link rel="stylesheet" href="./src/components/song/song.css">
              <section class="song-card">
                  <img src="${this.image}" alt="Song image">
                  <p><strong>Title:</strong> ${this.utitle}</p>
                  <p><strong>Autor:</strong> ${this.autor}</p>
                  <p><strong>Album:</strong> ${this.album}</p>
                  <p><strong>Date Added:</strong> ${this.dateadded}</p>
                  <p><strong>Duration:</strong> ${this.duration} mins</p>
              </section>
          `;
      }
  }

  connectedCallback() {
      this.render();
  }
}

customElements.define('song-component', Song);
export default Song;
