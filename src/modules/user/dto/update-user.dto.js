export class UpdateUserDTO {
    constructor(fields, data) {
        fields.forEach((field) => {
            if (data[field].trim()) {
                this[field] = data[field];
            }
        });
    }
}
