export class UpdateWardDTO {
    constructor({ name, code, floor, status }) {
        if (name !== undefined) {
            this.name = name;
        }
        if (code !== undefined) {
            this.code = code;
        }
        if (floor !== undefined) {
            this.floor = floor;
        }
        if (status !== undefined) {
            this.status = status;
        }
    }
}
