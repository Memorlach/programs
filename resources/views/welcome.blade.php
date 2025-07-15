<!DOCTYPE html>
<html>
<head>
    <!-- ... -->

</head>
<body>
<div id="app"></div>
</body>
</html>


<!doctype html>
<html class="h-full" lang="en" dir="ltr">
<head>
    <meta charset="utf-8" />

    @viteReactRefresh
    @vite(['resources/js/app.tsx', 'resources/css/app.css'])

    <link rel="icon" href="/media/app/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700"/>
    <style>
        .dark body {
            background-color: hsl(240 10% 4%);
        }
    </style>
    <script>
        (function () {
            try {
                const theme = localStorage.getItem('theme') || 'system';
                const prefersDark = window.matchMedia(
                    '(prefers-color-scheme: dark)',
                ).matches;
                const isDarkMode =
                    theme === 'dark' || (theme === 'system' && prefersDark);
                if (isDarkMode) document.documentElement.classList.add('dark');
            } catch (e) {}
        })();
    </script>
</head>
<body class="text-foreground bg-background flex h-full text-base antialiased">
<div class="flex grow" id="app"></div>
</body>
</html>

