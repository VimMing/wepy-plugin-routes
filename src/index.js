export function getPaths() {
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
            paths = [...paths, ...parse.pages]
            paths.filter((item) => {
                if (item.startsWith('^')) {
                    launchPage = item.replace('^', '')
                    return false
                }
                return true
            })
            parse.pages = paths
            if (launchPage) {
                parse.pages.unshift(launchPage)
            }
            op.code = JSON.stringify(parse)
        }
        op.next()
    }
}