import { Shift } from "~/app/services/shift/shift";
import { Days } from "~/app/core/days";

export class Day {
    public shifts: Shift[];
    public name: string;

    constructor(name: string, shifts: Shift[]) {
        this.shifts = shifts;
        this.name = name;
    }
}
