let showAjax = function(status=0, msg='', data={}) {
    return {
        state: status,
        msg: msg,
        data: data
    }
}
module.exports = showAjax