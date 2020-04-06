import BigNumber from "bignumber.js";

export class StringValue {
    data: string;
}

export class NumberValue {
    data: BigNumber;
}

export type Value = StringValue | NumberValue;
