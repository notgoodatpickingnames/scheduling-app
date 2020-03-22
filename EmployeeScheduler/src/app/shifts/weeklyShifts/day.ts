import { Shift } from "~/app/services/shift/shift";

export class Day {
    public shifts: Shift[];
    public name: string;

    constructor(name: string, shifts: Shift[]) {
        this.shifts = shifts;
        this.name = name;
    }
}