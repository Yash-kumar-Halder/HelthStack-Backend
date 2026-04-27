import { ApiError } from '../utils/api/api-error.js';

/**
 * @param {{ body?: import('zod').ZodTypeAny; params?: import('zod').ZodTypeAny; query?: import('zod').ZodTypeAny }} schemas
 */
export function validateRequest(schemas) {
    return (req, _res, next) => {
        try {
            if (schemas.body) {
                const parsed = schemas.body.safeParse(req.body);
                if (!parsed.success) {
                    const msg = parsed.error.flatten();
                    return next(
                        ApiError.badRequest(
                            JSON.stringify(msg.fieldErrors || msg.formErrors),
                        ),
                    );
                }
                req.body = parsed.data;
            }
            if (schemas.params) {
                const parsed = schemas.params.safeParse(req.params);
                if (!parsed.success) {
                    const msg = parsed.error.flatten();
                    return next(
                        ApiError.badRequest(
                            JSON.stringify(msg.fieldErrors || msg.formErrors),
                        ),
                    );
                }
                req.params = parsed.data;
            }
            if (schemas.query) {
                const parsed = schemas.query.safeParse(req.query);
                if (!parsed.success) {
                    const msg = parsed.error.flatten();
                    return next(
                        ApiError.badRequest(
                            JSON.stringify(msg.fieldErrors || msg.formErrors),
                        ),
                    );
                }
                req.query = parsed.data;
            }
            return next();
        } catch (e) {
            return next(e);
        }
    };
}
