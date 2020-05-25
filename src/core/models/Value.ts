import BigNumber from "bignumber.js";

export class StringValue {
    data: string;

    toString(): string {
        return this.data;
    }
}

export class NumberValue {
    data: BigNumber;

    toString(): string {
        return this.data.toString();
    }
}

export type Value = StringValue | NumberValue;
