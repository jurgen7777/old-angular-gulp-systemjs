(function (global) {

System.config({

    defaultExtension: 'js',
    defaultJSExtensions: true,

    paths: {
       'npm:': 'node_modules/',
       'deps:': 'production/'
    },

    // Let the system loader know where to look for things
    map: {

        // Our app is compiled to js files in the dist folder
        app: 'build',

        // Angular bundles
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

        // Other libraries
        'rxjs': 'npm:rxjs',
        'ng2-translate': 'node_modules/ng2-translate'

    },

    // Tell the system loader how to load when no filename and/or no extension
    packages: {
        app: { main: './main.js', defaultExtension: 'js' },
        // rxjs: { defaultExtension: 'js' },
        'ng2-translate': { defaultExtension: 'js' }
    },

    bundles: {
        '/vendor/Rx.min.js': [
            "rxjs/*",
            "rxjs/operator/*",
            "rxjs/observable/*",
            "rxjs/add/operator/*",
            "rxjs/add/observable/*",
            "rxjs/util/*"
        ],
        '/js/app.bundle': ['main']
    }

});

})(this);
