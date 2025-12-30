import { createRouter, createWebHistory } from "vue-router";
import { usePreviousRoute } from "@/composables/previousRoute";
import { useUserStore } from "@/stores/userStore";
import { MONTH_NAMES, type MonthName } from "@api-contract";
import { capitalize } from "lodash";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            meta: { title: "Login", requiresAuth: false, showNav: false },
            component: () => import("@/views/LoginView.vue"),
        },
        {
            path: "/",
            name: "home",
            redirect: () => {
                return `/calendar/${new Date().getFullYear().toString()}`;
            },
        },
        {
            path: "/calendar",
            redirect: () => {
                return `/calendar/${new Date().getFullYear().toString()}`;
            },
            children: [
                {
                    path: ":year",
                    name: "year",
                    meta: { title: "Home", requiresAuth: true, hasYear: true, showNav: true },
                    component: () => import("@/views/YearView.vue"),
                },
                {
                    path: ":year/:month",
                    name: "month",
                    meta: { title: "Month", requiresAuth: true, hasYear: true, hasMonth: true, showNav: true },
                    component: () => import("@/views/MonthView.vue"),
                },
            ],
        },
        {
            path: "/transactions",
            name: "transactions",
            meta: { title: "Transactions", requiresAuth: true, showNav: true },
            component: () => import("@/views/TransactionsView.vue"),
        },
        {
            path: "/transactions/create",
            name: "createTransaction",
            meta: { title: "Create a transaction", requiresAuth: true, showNav: false, slide: true, slideFrom: "right" },
            component: () => import("@/views/CreateTransactionsView.vue"),
        },
        {
            path: "/transactions/:transaction/edit",
            name: "editTransaction",
            meta: { title: "Edit a transaction", requiresAuth: true, showNav: false, slide: true, slideFrom: "right" },
            component: () => import("@/views/EditTransactionView.vue"),
        },
    ],
});

const previousRoute = usePreviousRoute();

router.beforeEach(async (to, from, next) => {
    console.log("Before each Navigation Guard");

    if (from.path !== "/") {
        previousRoute.value = from;
    }

    if (to.meta.hasYear) {
        const year = Array.isArray(to.params.year) ? parseInt(to.params.year[0]) : parseInt(to.params.year);

        if (isNaN(year) || year < 1900 || year > 3024) {
            return next({ name: to.name, params: { ...to.params, year: new Date().getFullYear().toString() } });
        }
    }

    if (to.meta.hasMonth) {
        const month = (Array.isArray(to.params.month) ? to.params.month[0] : to.params.month) as MonthName;
        const isValidMonthName = MONTH_NAMES.includes(capitalize(month));
        const routerMonth = isValidMonthName ? month : MONTH_NAMES[new Date().getMonth()];
        const routerMonthLower = routerMonth.toLowerCase();

        if (month !== routerMonthLower) {
            return next({ name: to.name, params: { ...to.params, month: routerMonthLower } });
        }
    }

    if (to.meta.requiresAuth) {
        const { validateJWT } = useUserStore();
        try {
            await validateJWT();
            return next();
        } catch (err: any) {
            return next("/login");
        }
    }

    return next();
});

export default router;
