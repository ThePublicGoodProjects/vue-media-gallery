export function parse() {
    return decodeURIComponent(location.hash).replace(/#/, '').split('&').reduce((acc, n) => {
        let vals    = n.split('='),
            isArray = false,
            key;
        if (vals.length > 1) {
            isArray = /\[/.test(vals[0]);
            key     = vals[0].replace(/[\][]/g, '');

            if (isArray) {

                if (!acc[key]) {
                    acc[key] = [];
                }

                acc[key].push(vals[1]);

            } else {
                acc[key] = vals[1];
            }
        }
        return acc;
    }, {});
}

