import router from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";
import { apiClient } from "@/api/api";
import { authClient } from "@/api";
import type { UserPureType } from "@schemas/pure/User.pure";

export const useUserStore = defineStore("user", () => {
    const user = ref<Omit<UserPureType, "transactions"> | null>(null);

    async function validateJWT() {
        if (user.value) return;

        const jwtResponse = await apiClient.users.validateJWT();

        if (jwtResponse.status === 200) {
            const userResponse = await apiClient.users.getUser();
            if (userResponse.status === 200) user.value = userResponse.body;
        }
    }

    async function login(email: string, password: string) {
        try {
            const authResponse = await authClient.postLogin({
                body: { serviceName: "income_calculator", emailOrUsername: email, password },
            });

            if (authResponse.status === 200) {
                const { jwt } = authResponse.body;

                localStorage.setItem("jwt", jwt);

                const userResponse = await apiClient.users.getUser();

                if (userResponse.status === 200) {
                    user.value = userResponse.body;
                    await router.replace({ name: "year", params: { year: new Date().getFullYear() } });
                }
            }
        } catch (err: unknown) {
            throw err;
        }
    }

    async function signUp(email: string, password: string) {
        try {
            const response = await authClient.postSignUp({ body: { username: email, email, password, serviceName: "income_calculator" } });

            if (response.status === 200) {
                await login(email, password);
            }
        } catch (err: unknown) {
            throw err;
        }
    }

    function googleRedirect() {
        let redirect_uri = "http://localhost:5173/login";

        if (process.env.NODE_ENV === "production") {
            redirect_uri = "https://www.fidelio.club/login";
        } else if (process.env.NODE_ENV === "staging") {
            redirect_uri = "https://staging.fidelio.club/login";
        }

        const params = new URLSearchParams({
            scope: "openid email profile",
            include_granted_scopes: "true",
            response_type: "token",
            redirect_uri,
            client_id: "545142393929-1jg47rom4v7hcfjvpjgkuhtkca9a73kb.apps.googleusercontent.com",
        });
        const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        window.location.href = googleAuthURL;
    }

    async function signInWithGoogle(token: string) {
        const authResponse = await authClient.postGoogleSignIn({ body: { serviceName: "income_calculator", token } });

        if (authResponse.status === 200) {
            const { jwt } = authResponse.body;

            localStorage.setItem("jwt", jwt);

            const userResponse = await apiClient.users.getUser();

            if (userResponse.status === 200) {
                user.value = userResponse.body;
                await router.replace({ name: "year", params: { year: new Date().getFullYear() } });
            }
        }
    }

    function logout() {
        localStorage.removeItem("jwt");
        user.value = null;
        router.replace({ name: "login" });
    }

    return { user, validateJWT, login, signUp, signInWithGoogle, googleRedirect, logout };
});
