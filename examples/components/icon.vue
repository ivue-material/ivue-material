<template>
    <div>
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />

        <p>
            图标可以使用图标字体或外部SVG。此外，可以接受一些大小尺寸，如 2x,
            3x, 4x and 5x。默认情况下，IvueIcon 将假定你使用的是
            <a
                target="_black"
                href="https://material.io/tools/icons/?icon=mood_bad&style=baseline"
                >material icon</a
            >
        </p>

        <div>
            <ivue-icon>menu</ivue-icon>
            <ivue-icon>add</ivue-icon>
            <ivue-icon>thumb_up</ivue-icon>
            <ivue-icon>verified_user</ivue-icon>
            <ivue-icon>home</ivue-icon>
        </div>

        <div>
            <ivue-icon>menu</ivue-icon>
            <ivue-icon class="ivue-size-2x">add</ivue-icon>
            <ivue-icon class="ivue-size-3x">thumb_up</ivue-icon>
            <ivue-icon class="ivue-size-4x">verified_user</ivue-icon>
            <ivue-icon class="ivue-size-5x">home</ivue-icon>
        </div>
    </div>
</template>
