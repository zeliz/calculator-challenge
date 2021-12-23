import { LightningElement, track } from 'lwc';

export default class CalculatorMain extends LightningElement {
    histIndex = 0;

    @track
    history = [];

    addHistoryLine(newEntry) {
        this.history.unshift( { index: this.histIndex++, text: newEntry} );
    }

    handleEntry() {
        this.addHistoryLine("Line of input # " + this.histIndex);
    }

    clearHistory() {
        this.history = [];
    }
}