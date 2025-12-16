import http, { IncomingMessage, ServerResponse } from "node:http";
import BaseEmail from "../templates/BaseEmail";
import WelcomeEmail from "../templates/onboarding/Welcome";
import TestEmail from "./TestEmail";
import { EmailSenders, sendEmail } from "..";

function asUrl(url: string) {
    if (url !== "/" && url.endsWith("/")) {
        url = url.slice(0, url.length - 1);
    }

    return url;
}

async function HTMLResponse(req: IncomingMessage, res: ServerResponse, html: string) {
    const url = asUrl(req.url!);

    res.writeHead(200, undefined, { "Content-Type": "text/html" });
    res.write(await TestEmail(html, url));
    res.end();
}

function JSONResponse(req: IncomingMessage, res: ServerResponse, content: Record<string, any> = { msg: "Success" }) {
    res.writeHead(200, undefined, { "Content-Type": "application/json" });
    res.write(JSON.stringify(content));
    res.end();
}

const server = http.createServer(async (req, res) => {
    const url = asUrl(req.url!);

    if (url === "/") {
        const { html, subject } = BaseEmail("");

        if (req.method === "GET") {
            return HTMLResponse(req, res, html);
        }

        if (req.method === "POST") {
            const emailResult = await sendEmail({
                from: EmailSenders.BOSS,
                to: "stelios.kakoliris@yahoo.com",
                subject,
                html,
            });

            return JSONResponse(req, res, emailResult);
        }
    }

    if (url === "/welcome") {
        const { html, subject } = WelcomeEmail({ name: "Zoe Kakoliri" });

        if (req.method === "GET") {
            return HTMLResponse(req, res, html);
        }

        if (req.method === "POST") {
            const emailResult = await sendEmail({
                from: EmailSenders.BOSS,
                to: "zjaj14@gmail.com",
                subject,
                html,
            });

            return JSONResponse(req, res, emailResult);
        }
    }

    return HTMLResponse(req, res, "<h1>404 Not Found</h1>");
});

server.listen(9999, "localhost", 0, () => {
    console.log("View the email tester: http://localhost:9999");
});
