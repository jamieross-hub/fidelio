export default async function TestEmail(content: string, route: string) {
    async function getSidebar() {
        interface SidebarItem {
            label: string;
            href: string;
        }

        return [
            { label: "Base", href: "/" },
            { label: "Welcome", href: "/welcome" },
            { label: "Verify", href: "/verify" },
        ] as SidebarItem[];
    }

    return `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
                </style>
            </head>
            <body style="display:flex;height:100vh;width:100vw;margin:0;padding:0;font-family:system-ui;">
                <aside style="height:100vh;display:flex;flex-direction:column;gap:1rem;box-sizing:border-box;width:300px;border-right:1px solid black;background-image:linear-gradient(to bottom right, rgb(32, 32, 32), rgb(0, 0, 0));color:rgb(221, 221, 221);">
                    <h1 style="border-bottom:1px solid rgb(66, 66, 66);padding:1.25rem;">Emails</h1>
                    <div style="display:flex;flex-direction:column;overflow:auto;">
                    ${(await getSidebar())
                        .map((item) => {
                            return `
                                <button style="display:flex;text-align:left;margin:0.5rem;border-radius:5px;${
                                    route === item.href
                                        ? "border:1px solid #333;background-color:#444;"
                                        : "border:0px solid #fff;background-color:transparent;"
                                }">
                                    <a style="width:100%;height:100%;padding:0.75rem;color:white;text-decoration:none;" href="${item.href}">
                                        ${item.label}
                                    </a>
                                </button>
                        `;
                        })
                        .join("")}
                    </div>
                    <button id="send" style="display:flex;cursor:pointer;margin:1rem;margin-top:auto;background-color:#111;color:white;border:1px solid #333;outline:0;border-radius:5px;padding:0.75rem;justify-content:center;" onclick="send()">
                        Send Email
                    </button>
                </aside>
                <iframe style="flex-grow:1;border:0;outline:0;overflow:auto;" srcdoc="${content.trim().replace(/"/g, "&quot;")}"></iframe>
                <script>
                    function send() {
                        console.log("sending");
                        fetch("", { method: "POST" }).then((res) => { console.log(res) }).catch((err) => { console.error(err) });
                    }
                </script>
            </body>
        </html>
`;
}
