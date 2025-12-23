export default class Config {
    static env = import.meta.env
    static baseurl = Config.env['VITE_BASEURL']
    static apiurl = `/api/v1`
}

