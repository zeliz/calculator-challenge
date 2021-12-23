import { api, LightningElement, track } from 'lwc';

export default class CalculatorMain extends LightningElement {
    @api
    equationHistory = [];
}