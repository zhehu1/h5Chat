const createError = require('http-errors');

class Res {
    constructor () {};

    Success (ctx, data) {
        ctx.body = data;
    };

    BadRequest (ctx, msg) {
        ctx.throw(createError(400, msg));
    };

    Unauthorized (ctx, msg) {
        ctx.throw(createError(401, msg));
    };

    PaymentRequired (ctx, msg) {
        ctx.throw(createError(402, msg));
    };

    Forbidden (ctx, msg) {
        ctx.throw(createError(403, msg));
    };

    NotFound (ctx, msg) {
        ctx.throw(createError(404, msg));
    };

    MethodNotAllowed (ctx, msg) {
        ctx.throw(createError(405, msg));
    };

    NotAcceptable (ctx, msg) {
        ctx.throw(createError(406, msg));
    };

    ProxyAuthenticationRequired (ctx, msg) {
        ctx.throw(createError(407, msg));
    };

    RequestTimeout (ctx, msg) {
        ctx.throw(createError(408, msg));
    };

    Conflict (ctx, msg) {
        ctx.throw(createError(409, msg));
    };

    Gone (ctx, msg) {
        ctx.throw(createError(410, msg));
    };

    LengthRequired (ctx, msg) {
        ctx.throw(createError(411, msg));
    };

    PreconditionFailed (ctx, msg) {
        ctx.throw(createError(412, msg));
    };

    PayloadTooLarge (ctx, msg) {
        ctx.throw(createError(413, msg));
    };

    URITooLong (ctx, msg) {
        ctx.throw(createError(414, msg));
    };

    UnsupportedMediaType (ctx, msg) {
        ctx.throw(createError(415, msg));
    };

    RangeNotSatisfiable (ctx, msg) {
        ctx.throw(createError(416, msg));
    };

    ExpectationFailed (ctx, msg) {
        ctx.throw(createError(417, msg));
    };

    ImATeapot (ctx, msg) {
        ctx.throw(createError(418, msg));
    };

    MisdirectedRequest (ctx, msg) {
        ctx.throw(createError(421, msg));
    };

    UnprocessableEntity (ctx, msg) {
        ctx.throw(createError(422, msg));
    };

    Locked (ctx, msg) {
        ctx.throw(createError(423, msg));
    };

    FailedDependency (ctx, msg) {
        ctx.throw(createError(424, msg));
    };

    UnorderedCollection (ctx, msg) {
        ctx.throw(createError(425, msg));
    };

    UpgradeRequired (ctx, msg) {
        ctx.throw(createError(426, msg));
    };

    PreconditionRequired (ctx, msg) {
        ctx.throw(createError(428, msg));
    };

    TooManyRequests (ctx, msg) {
        ctx.throw(createError(429, msg));
    };

    RequestHeaderFieldsTooLarge (ctx, msg) {
        ctx.throw(createError(431, msg));
    };

    UnavailableForLegalReasons (ctx, msg) {
        ctx.throw(createError(451, msg));
    };

    InternalServerError (ctx, msg) {
        ctx.throw(createError(500, msg));
    };

    NotImplemented (ctx, msg) {
        ctx.throw(createError(501, msg));
    };

    BadGateway (ctx, msg) {
        ctx.throw(createError(502, msg));
    };

    ServiceUnavailable (ctx, msg) {
        ctx.throw(createError(503, msg));
    };

    GatewayTimeout (ctx, msg) {
        ctx.throw(createError(504, msg));
    };

    HTTPVersionNotSupported (ctx, msg) {
        ctx.throw(createError(505, msg));
    };

    VariantAlsoNegotiates (ctx, msg) {
        ctx.throw(createError(506, msg));
    };

    InsufficientStorage (ctx, msg) {
        ctx.throw(createError(507, msg));
    };

    LoopDetected (ctx, msg) {
        ctx.throw(createError(508, msg));
    };

    BandwidthLimitExceeded (ctx, msg) {
        ctx.throw(createError(509, msg));
    };

    NotExtended (ctx, msg) {
        ctx.throw(createError(510, msg));
    };

    NetworkAuthenticationRequired (ctx, msg) {
        ctx.throw(createError(511, msg));
    }
}

exports = module.exports = new Res;



