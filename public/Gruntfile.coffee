module.exports = (grunt)->

    stringify = require 'stringify'
    coffeeify = require 'coffeeify'

    grunt.initConfig
        # 将bower下载的库中所需要的文件提取出来
        copy:
            dev:
                files: [
                    {src: ["lib/jquery/dist/jquery.min.js"], dest: 'dist/lib/jquery.min.js'},
                    {src: ["lib/jquery/dist/jquery.min.map"], dest: 'dist/lib/jquery.min.map'},
                    {src: ["lib/socket.io-client/socket.io.js"], dest: 'dist/lib/socket.io.js'},
                    {src: ["lib/qiniu/src/qiniu.min.js"], dest: 'dist/lib/qiniu.min.js'},
                    {src: ["lib/plupload/js/plupload.full.min.js"], dest: 'dist/lib/plupload.full.min.js'},
                    {src: ["lib/unslider/src/unslider.js"], dest: 'dist/lib/unslider.js'},
                    {src: ["lib/artTemplate/dist/template.js"], dest: 'dist/lib/template.js'}
                ]
        # 每次有文件变化后先清理dist文件夹
        clean:
            dist: ['dist']

        # 前端采用browerify实现模块化
        browserify:
            components:
                options:
                  preBundleCB: (b)->
                    b.transform(coffeeify)
                    b.transform(stringify({extensions: ['.hbs', '.html', '.tpl', '.txt']}))
                expand: true
                flatten: true
                files: {
                    'dist/js/components.js': ['src/components/**/*.coffee']
                    'dist/js/common.js': ['src/common/**/*.coffee'],
                }

            pages:
                options:
                  preBundleCB: (b)->
                    b.transform(coffeeify)
                    b.transform(stringify({extensions: ['.hbs', '.html', '.tpl', '.txt']}))
                expand: true
                flatten: true
                src: ['src/pages/**/*.coffee']
                dest: 'dist/js/pages/'
                ext: '.js'

        # 监听文件变化
        watch:
            compile:
                files: ['src/**/*.less', 'src/**/*.coffee']
                tasks: ['browserify', 'less']

        # 将less文件编译成css
        less:
            components:
                files:
                    'dist/css/layout.css': ['src/components/**/*.less', 'src/common/**/*.less']
                    # 'dist/css/signup.css': ['src/pages/sign/signup.less']
                    # 'dist/css/signin.css': ['src/pages/sign/signin.less']
                    # 'dist/css/chat.css': ['src/pages/chat/chat.less']
                    # 'dist/css/setting.css': ['src/pages/account/setting.less']
                    # 'dist/css/userinfo.css': ['src/pages/user/index.less']
                    # 'dist/css/home.css': ['src/pages/home/home.less']

    grunt.loadNpmTasks 'grunt-browserify'
    grunt.loadNpmTasks 'grunt-contrib-less'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-less'

    grunt.registerTask 'default', ->
        grunt.task.run [
            'clean'
            'copy'
            'browserify'
            'less'
            'watch'
        ]
