export type StringOrNumber = string | number;
import { RangeValidationBase } from "./union-types"; 

class UnionRangeValidationWithTypeAlias extends RangeValidationBase {
    IsInRange(value : StringOrNumber) : boolean {
        if (typeof value === "number") {
            return this.RangeCheck(value);
        }
        return this.RangeCheck(this.GetNumber(value));
    }
}

let total : StringOrNumber = 10;
if (new UnionRangeValidationWithTypeAlias(0,100).IsInRange(total)) {
    console.log(`This value is in range`);
}