import {Component, EventEmitter, Prop, Event, Listen, State} from "@stencil/core";

@Component({
  tag: 'stencil-component',
  styleUrl: './stencil-component.css',
  shadow: true
})
export class StencilComponent {

  @Prop() attributeMessage: string;

  @State() message: string;

  @Event({eventName: 'element-dispatch'}) clickEvent: EventEmitter<string>;

  @Listen('document:element-dispatch')
  onElementDispatch(event: CustomEvent) {
    this.message = event.detail;
  }

  public render() {
    return (
      <div class="element-body">
        <div><slot/></div>
        <div>{this.message || this.attributeMessage}</div>
        <button onClick={() => this.clickEvent.emit('Payload from stencil')}>Click</button>
      </div>)
  }
}
