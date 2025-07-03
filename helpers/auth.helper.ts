import { request } from "@playwright/test";

export async function loginAndGetToken(): Promise<string> {
    const baseURL = process.env.BASE_URL!;
    const context = await request.newContext();

    const loginRes = await context.post(
        `${baseURL}/api/v1/user-core-api/auth/login`,
        {
            headers: {"Content-Type": "application/json"},
            data: {
                email: "admin@hormail.com",
                password: "Com@sci54",
            },
        }
    );

    const loginBody = await loginRes.json();
    const userId = loginBody.data.userId;

    const verifyRes = await context.post(
        `${baseURL}/api/v1/user-core-api/auth/email-otp/verify`,
        {
            headers: {"Content-Type": "application/json"},
            data: {
                userId,
                otp: "123456",
            },
        }
    );
    
    const verifyBody = await verifyRes.json();
    return verifyBody.data.token;
}