export class UserResponseDTO {
    constructor({ name, email, phone, role }) {
        ((this.name = name.trim()),
            (this.email = email.toLowercase()),
            (this.phone = phone),
            (this.role = role));
    }
}
