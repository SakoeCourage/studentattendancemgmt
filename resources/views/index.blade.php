<!DOCTYPE html>
<html lang="en">

<head>
    @viteReactRefresh
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    @vite('resources/css/app.css')
    @vite('resources/css/index.css')
</head>

<body>

    <div id="root">

    </div>
    @vite('resources/js/main.jsx')
</body>

<style>
    div.pagepreloader {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: flex-start;
        background-color: rgb(243 244 246 / 0.1);
        isolation: isolate;
        z-index: 90;
    }

    .loadingwheel {
        width: 100%;
        margin: 0 auto;
        border-radius: 10px;
        position: relative;
        padding: 1.5px;
        background-color: white;

    }

    .loadingwheel:before {
        content: '';
        border-radius: 10px;
        position: absolute;
        top: -4px;
        right: -4px;
        bottom: -4px;
        left: -4px;
    }

    .loadingwheel .loadingBar {
        position: absolute;
        border-radius: 10px;
        top: 0;
        right: 100%;
        bottom: 0;
        left: 0;
        width: 0;
        background: #067b82;
        animation: wheelbar 2s linear infinite;
    }

    @keyframes wheelbar {
        0% {
            left: 0%;
            right: 100%;
            width: 0%;
        }

        10% {
            left: 0%;
            right: 75%;
            width: 25%;
        }

        90% {
            right: 0%;
            left: 75%;
            width: 25%;
        }

        100% {
            left: 100%;
            right: 0%;
            width: 0%;
        }
    }
</style>

</html>
