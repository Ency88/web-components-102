class MyNativeComponent extends HTMLElement {

    attributeMessage;

    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        this.attributeMessage = this.getAttribute('attribute-message');
        this._render();

        const button = this.shadowRoot.querySelector('button');
        console.log(button);
        button.addEventListener('click', event => this._handleClick(event));
        document.addEventListener('element-dispatch', event => this._handleElementDispatchEvent(event))
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, newValue);
        if (name === 'attribute-message') {
            this.attributeMessage = newValue;
            this._render();
        }
    }

    static get observedAttributes() {
        return ['attribute-message'];
    }

    _render() {
        this.shadowRoot.innerHTML = `
            <style>
                .element-body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: #007fff;
                    border-radius: 1rem;
                    padding: 1rem;
                }
                
                h3 {
                    color: #ffba00;
                }
                
                div {
                    color: lightgray;
                    font-weight: bold;
                }
                
                button {
                    height: 2.1rem;
                    min-width: 8.5rem;
                    background: linear-gradient(#FFCE00, #FFBA00);
                    border: 0.15rem solid #FFA700;
                    border-radius: 3.2rem;
                    padding-left: 1rem;
                    padding-right: 1rem;
                    color: #FFFFFF;
                    margin: 0.3333rem;
                    font-weight: bold;
                }
                button:active {
                    background: #FFA700;
                }
                
                .message {
                    padding: 0.5rem 0;
                }
            </style>
            <div class="element-body">
                <slot></slot>
                <div class="message">Temporary message</div>
                <div>${this.attributeMessage}</div>
                <button>Click</button>
            </div>
        `;
    }

    _handleClick(event) {
        event.target.dispatchEvent(new CustomEvent('element-dispatch', {
            detail: 'Native element payload',
            bubbles: true,
            composed: true
        }));
    }

    _handleElementDispatchEvent(event) {
        this.attributeMessage = event.detail;
        this._render();
    }
}

customElements.define('my-native-component', MyNativeComponent);