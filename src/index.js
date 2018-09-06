export function getPaths(routes) {
    let paths = []
    let recursive = function (obj) {
        let tempArr = Object.values(obj)
        for (let item of tempArr) {
            if (typeof item === 'string') {
                item = item.replace('/pages', 'pages')
                paths.push(item)
            }
            if (typeof item === 'object') {
                recursive(item)
            }
        }
    }
    recursive(routes)
    return paths
}

export default class {
    constructor(c = {}) {
        const def = {
            filter: new RegExp('app\.json$'),
            routes: {}
        };

        this.setting = Object.assign({}, def, c);
    }

    apply(op) {
        if (op.type === 'config' && this.setting.filter.test(op.file)) {
            let parse = JSON.parse(op.code)
            let paths = getPaths(this.setting.routes)
            let launchPage = ''
            paths = paths.filter((item) => {
                if (item.startsWith('^')) {
                    launchPage = item.replace('^', '')
                    return false
                }
                return true
            })
            if (launchPage) {
                paths.unshift(launchPage)
            }
            paths = Array.from(new Set([...paths, ...parse.pages]))
            parse.pages = paths
            op.code = JSON.stringify(parse)
        }
        if (op.type === '' && /pages\/.+\.js$/.test(op.file)) {
            let code = op.code.replace(/exports\.default\s*=\s*(\w+);/ig, function (m, defaultExport) {
                if (defaultExport === 'undefined') {
                    return '';
                }
                let pagePath = /(pages\/.+)\.js$/.exec(op.file)
                return '\nPage(_wepy.default.$createPage(' + defaultExport + ' , \'' + pagePath[1] + '\'));\n';
            })
            op.code = code
        }
        op.next()
    }
}