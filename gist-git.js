const tagName = 'git-gist';
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
        }

        /* width */
        ::-webkit-scrollbar {
            width: 3px;
            height: 3px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #ffce00; 
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #f3f3f3; 
        }

        #container {
            padding: 20px;
            font-size: 1.2em;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
            border: 1px solid black;
            max-height: 400px;
            overflow: scroll;
            background-color: #171717;
            color: #f3f3f3;
        }

        ol {
            margin: 0;
        }

        li {
            font-size: 1em;
            padding-left: 20px;
        }

    </style>

    <div id="container">
        If you don't provide me the gist id, I can't load shit
    </div>
`;

class GitGist extends HTMLElement {
    constructor() {
        super();
        this.gistData = '';
        this.container = undefined;
    }

    getGistDataFromGistId = (gistId) => {
        console.log('Id', gistId);
        const gistUrl = `https://api.github.com/gists/${gistId}`;
        fetch(gistUrl)
            .then(r => r.json())
            .then(body => {
                // For more information read the api docs for gists.
                // Or hit me up at @vipulbhj(Twitter), happy to help :)
                let files = body.files;
                let fileNameAsKeys = Object.keys(files)[0];
                const allData = files[fileNameAsKeys].content.replace(/[ ]/gm, "&nbsp").split('\n');
                const listItems = allData.map(item => {
                    return `<li>${item}</li>`;
                });
                this.gistData = `<ol>${listItems.join('')}</ol>`;
                this.render();
            })
            .catch(e => console.log('Something went wrong. Error:- ', e));
    }

    render() {
        if (this.gistData) {
            this.container.innerHTML = this.gistData;
        }
    }

    get gistId() {
        return this.getAttribute('gist-id');
    }

    set gistId(value) {
        this.setAttribute('gist-id', value);
    }

    static get observedAttributes() {
        return ['gist-id'];
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.container = this.shadowRoot.getElementById('container');
            if(this.gistId) {
                this.getGistDataFromGistId(this.gistId, this.gistId);
                this.gistData = 'Loading...';
                this.render(); 
            }
        }
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'gist-id') {
            if (newVal) {
                this.gistId = newVal;
                this.getGistDataFromGistId(this.gistId, this.gistId);
                this.gistData = 'Loading...';
                this.render();
            } else {
                this.gistId = undefined;
                this.gistData = '<code style="color: yellowgreen">gist-id</code> attribute is required';
                this.render();
            }                
        }
    }
}

const register = () => customElements.define(tagName, GitGist);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
