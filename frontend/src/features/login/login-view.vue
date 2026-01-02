<script setup lang="ts">
import { motion, type MotionProps } from "motion-v";

const primary = window.getComputedStyle(document.body).getPropertyValue("--primary");
const background = window.getComputedStyle(document.body).getPropertyValue("--background");
const transparentBackground = `${background.split(")")[0]} / 0)`;

const containerMotions: MotionProps = {
    animate: {
        backgroundImage: [
            `linear-gradient(180deg, ${transparentBackground} 0%), radial-gradient(${primary} 0px, ${background} 0px)`,
            `linear-gradient(180deg, ${transparentBackground} 0%), radial-gradient(${primary} 2px, ${background} 2px)`,
            `linear-gradient(180deg, ${transparentBackground} 0%), radial-gradient(${primary} 1px, ${background} 1px)`,
        ],
    },
    transition: {
        duration: 1,
    },
};
</script>

<template>
    <motion.div v-bind="containerMotions" class="w-full h-full flex justify-between bg-size-[100%,19px_19px]">
        <LoginInfo class="flex flex-col justify-center gap-5 w-1/2 h-full px-20 max-lg:hidden" />
        <LoginForm
            class="bg-card md:bg-background md:border-border md:border md:shadow-2xl flex flex-col justify-center w-full lg:w-1/2 sm:px-10 md:px-35 rounded-3xl md:min-w-175 lg:max-w-250 max-lg:w-full"
        />
    </motion.div>
</template>
