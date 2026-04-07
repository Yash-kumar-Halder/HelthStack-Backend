// test/auth.manual.js
import 'dotenv/config';
import mongoose from 'mongoose';
import { AuthService } from '../src/modules/auth/auth.service.js';

// 1. connect DB
await mongoose.connect('mongodb://127.0.0.1:27017/your_db_name');

// 2. run test
(async () => {
    try {
        const user = {
            _id: new mongoose.Types.ObjectId(),
            name: 'yash',
            email: 'hello@hello.com',
        };

        const result = await AuthService._generateAuthResponse(user, {
            ipAddress: '127.0.0.1',
            userAgent: 'chrome_desktop',
        });

        console.log('✅ RESULT:\n', result);
    } catch (err) {
        console.error('❌ ERROR:\n', err);
    } finally {
        // 3. close DB
        await mongoose.connection.close();
    }
})();
