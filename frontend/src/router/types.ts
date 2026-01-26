import type { Component } from "vue";
import { type RouteMeta, type RouteRecordNormalized, type RouteRecordRaw } from "vue-router";

export interface NavOptions {
    icon: Component;
    label: string;
}

export type ExtendedRouteRecord = RouteRecordRaw & { meta: RouteMeta & { navOptions: NavOptions } };

export type ExtendedRouteRecordNormalized = RouteRecordNormalized & { meta: RouteMeta & { navOptions: NavOptions } };
