export class CreateUserDTO {
    constructor({ name, email, passowrd, phone, role }) {
        ((this.name = name.trim()),
            (this.email = email.toLowerCase()),
            (this.passowrd = passowrd),
            (this.phone = phone),
            (this.role = role));
    }
}
