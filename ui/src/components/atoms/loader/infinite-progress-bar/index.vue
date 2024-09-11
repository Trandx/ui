<template>
    <div class="progress-bar w-ful overflow-hidden h-2 bg-white rounded-lg">
        <div class="h-full  animate-infinite-progress-horizontal ">
                <slot>
                <div class="bg-primary-400 h-full w-full progress-bar-striped animate-stripe"></div>
                </slot>
        </div>
    </div>
</template>