##### When component is attached to the DOM
`connectedCallback()`
is called immediately when component is attached to the dom - you can reach attributes here


##### When component is going to be detached to the DOM
`disconnectedCallback()`
is called immediately when component is going to be detached to the dom - you can release all memory here


##### When attribute is changed
`attributeChangedCallback(name, oldValue, newValue)`
is called each time when **observed** atribute is changed

###### Observed Attributes
`static get observedAttributes() { return [...]}`