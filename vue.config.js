module.exports = {

    configureWebpack:{
        resolve:{
            alias:{
                'assets' : '@/assets',
                'components' : '@/components',
                'content': 'components/content',
                'common': 'components/common',
                'network' : '@/network',
                'views' : '@/views'
            }
        }
    }
}
