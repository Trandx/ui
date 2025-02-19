<template>
    <div class="progress-bar w-ful overflow-hidden h-2 bg-white rounded-lg">
        <div class="h-full  animate-infinite-progress-horizontal ">
                <slot>
                <div class="bg-primary-500 h-full w-full stripe-bar-animated"></div>
                </slot>
        </div>
    </div>
</template>