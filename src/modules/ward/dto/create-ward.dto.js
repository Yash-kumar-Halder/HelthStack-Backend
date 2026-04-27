export class CreateWardDTO {
    constructor({ name, code, floor, status }) {
        this.name = name;
        this.code = code;
        this.floor = floor;
        this.status = status;
    }
}
