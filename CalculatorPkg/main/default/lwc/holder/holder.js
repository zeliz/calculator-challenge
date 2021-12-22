import { LightningElement, track } from 'lwc';

export default class Holder extends LightningElement {
    internalTotal = 0;
    internalOperation = "init";
    workingTotal = 0;
    zeroValue = 0;

    // For fractions
    decimalPlaces = 0;

    numRow1 = [
        new NumButton(7),
        new NumButton(8),
        new NumButton(9),
    ];
    numRow2 = [
        new NumButton(4),
        new NumButton(5),
        new NumButton(6),
    ];
    numRow3 = [
        new NumButton(1),
        new NumButton(2),
        new NumButton(3),
    ];

    handleButtonClick(event) {
        let type = event.detail.type;
        let value = event.detail.value;

        switch (type) {
            case "num":
                this.handleNumButton(value);
                break;
            case "clr":
                this.handleClearButton();
                break;
            case "opr":
                this.handleOperatorButton(value);
                break;
            case "tran":
                this.handleTransformButton(value);
                break;
            default:
                console.log("Unrecognized calculator event!");
        }
    }

    handleNumButton(value) {
        if (this.decimalPlaces === 0) {
            this.workingTotal = (10 * this.workingTotal) + value;
        } else {
            let scale = Math.pow(10, -this.decimalPlaces);
            this.workingTotal += value * scale;
            this.decimalPlaces += 1;
        }
        
    }
    handleClearButton() {
        this.workingTotal = 0;
        this.decimalPlaces = 0;
    }
    handleTransformButton(value) {
        switch (value) {
            case "toggleSign":
                this.workingTotal *= -1;
                break;
            case "decimal":
                if (this.decimalPlaces === 0)
                    this.decimalPlaces = 1;
                break;
            default:
                console.log("Unknown transformation!");
        }
    }
    handleOperatorButton(value) {
        switch (this.internalOperation) {
            case "init":
                // Store current number, clear for next input
                this.internalTotal = this.workingTotal;
                break;
            case "plus":
                this.internalTotal += this.workingTotal;
                break;
            case "minus":
                this.internalTotal -= this.workingTotal;
                break;
            case "times":
                this.internalTotal *= this.workingTotal;
                break;
            case "dividedBy":
                this.internalTotal /= this.workingTotal;
                break;
            case "equal":
                this.internalTotal = this.workingTotal;
                break;
            default:
                console.log("Unrecognized operation!");
        }
        this.internalOperation = value;
        // RESET WORKING...
        this.handleClearButton();
    }
}

class NumButton {
    label;
    type = "num";
    value;

    constructor(num) {
        this.label = "" + num;
        this.value = num;
    }
}