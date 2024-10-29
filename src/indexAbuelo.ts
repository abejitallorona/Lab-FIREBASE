import styles from './indexAbuelo.css';

import { addSongs, getSongs } from './utils/Firebase';
import Song, { Attribute } from './components/song/song';
import { songTypes } from './types/song';


const songInfo = {
    image: '',
    utitle: '',
    autor: '',
    album: '',
    dateadded: 0,
    duration: 0,
};

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    changeImage(e: any) {
        songInfo.image = e.target.value;
    }

    changeUtitle(e: any) {
        songInfo.utitle = e.target.value;
    }

    changeAutor(e: any) {
        songInfo.autor = e.target.value;
    }

    changeAlbum(e: any) {
        songInfo.album = e.target.value;
    }

    changeDateadded(e: any) {
        songInfo.dateadded = e.target.value;
    }

    changeDuration(e: any) {
        songInfo.duration = e.target.value;
    }

    // Función para manejar el envío del formulario
    submitForm() {
        console.log('Song submitted:', songInfo);
        addSongs(songInfo); 
        this.render();
    }

    // Render principal
    async render() {
        if (this.shadowRoot) {
            
             this.shadowRoot.innerHTML = `
             <link rel="stylesheet" href="../dist/global.css"/>`
            this.shadowRoot.innerHTML = '';

            // Crear el título del formulario
            const title = this.ownerDocument.createElement('h1');
            title.innerText = 'Tu playlist';
            this.shadowRoot.appendChild(title);

            // Inputs para agregar los datos de la canción
            
            const pUtitle = this.ownerDocument.createElement('input');
            pUtitle.placeholder = 'Título';
            pUtitle.addEventListener('change', this.changeUtitle.bind(this));
            this.shadowRoot.appendChild(pUtitle);
            
            const pAutor = this.ownerDocument.createElement('input');
            pAutor.placeholder = 'Autor';
            pAutor.addEventListener('change', this.changeAutor.bind(this));
            this.shadowRoot.appendChild(pAutor);
            
            const pAlbum = this.ownerDocument.createElement('input');
            pAlbum.placeholder = 'Álbum';
            pAlbum.addEventListener('change', this.changeAlbum.bind(this));
            this.shadowRoot.appendChild(pAlbum);
            
            const pDateadded = this.ownerDocument.createElement('input');
            pDateadded.placeholder = 'Fecha';
            pDateadded.addEventListener('change', this.changeDateadded.bind(this));
            this.shadowRoot.appendChild(pDateadded);
            
            const pDuration = this.ownerDocument.createElement('input');
            pDuration.placeholder = 'Duración';
            pDuration.addEventListener('change', this.changeDuration.bind(this));
            this.shadowRoot.appendChild(pDuration);

            const pImage = this.ownerDocument.createElement('input');
            pImage.placeholder = 'Img';
            pImage.addEventListener('change', this.changeImage.bind(this));
            this.shadowRoot.appendChild(pImage);

            // Botón para enviar el formulario
            const save = this.ownerDocument.createElement('button');
            save.innerText = 'Guardar';
            save.addEventListener('click', this.submitForm.bind(this));
            this.shadowRoot.appendChild(save);

            // Obtener las canciones de Firebase
            const songs = await getSongs();



            songs?.forEach((song) => {
                const songComponent = this.ownerDocument.createElement('song-component');
                songComponent.setAttribute(Attribute.image, song.image);
                songComponent.setAttribute(Attribute.utitle, song.utitle);
                songComponent.setAttribute(Attribute.autor, song.autor);
                songComponent.setAttribute(Attribute.album, song.album);
                songComponent.setAttribute(Attribute.dateadded, song.dateadded);
                songComponent.setAttribute(Attribute.duration, song.duration);


                

                // const img = this.ownerDocument.createElement('img');
                // img.src = song.image;  // Usamos 'src' para la imagen
                // container.appendChild(img);

                // // Crear un título para la canción
                // const title = this.ownerDocument.createElement('h1');
                // title.innerText = song.utitle; 
                // container.appendChild(title);

                // const autor = this.ownerDocument.createElement('p');
                // autor.innerText = song.autor;  
                // container.appendChild(autor);

                // const album = this.ownerDocument.createElement('p');
                // album.innerText = song.album;
                // container.appendChild(album);

                
                // const duration = this.ownerDocument.createElement('p');
                // duration.innerText = song.duration.toString();  
                // container.appendChild(duration);
                // const date_added = this.ownerDocument.createElement('p');
                // date_added.innerText = song.dateadded.toString();  
                // container.appendChild(date_added);

                this.shadowRoot?.appendChild(songComponent);
            });
        }
    }
}

customElements.define('app-container', AppContainer);
export default AppContainer;