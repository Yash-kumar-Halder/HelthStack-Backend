export class UserResponseDTO {
    constructor({
        name,
        email,
        phone,
        role,
        isVerified,
        isRoleProfileCreated,
        status,
        createdAt,
        updatedAt,
    }) {
        this.name = name.trim();
        this.email = String(email).toLowerCase();
        this.phone = phone;
        this.role = role;
        this.isVerified = isVerified;
        this.isRoleProfileCreated = isRoleProfileCreated;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
