import { LightningElement, api } from 'lwc';

export default class CalculatorButton extends LightningElement {
    @api
    myLabel;

    @api
    eventType;
    @api
    eventValue;

    handleClick() {
        this.dispatchEvent( new CustomEvent('btnclick', {
            detail: {type: this.eventType, value: this.eventValue},
        }));
    }
}