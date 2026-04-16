import bcrypt from 'bcrypt';

export class Hash {
    static async hash(token) {
        const saltRounds = 10; // ✅ industry standard (10–12)
        return await bcrypt.hash(token, saltRounds);
    }

    static async compare(token, hash) {
        return await bcrypt.compare(token, hash);
    }
}
