import qs from 'qs';

// parse multipart/form-data (busboy) and store in request.body
export default (request) => new Promise((resolve, reject) => {
    if (!request.multipart || !request.isMultipart()) {
        return resolve();
    }
    request.body = request.body || {};
    const fauxQueryStringParts: string[] = [];
    request
        .multipart(() => { }, (err) => {
            if (err) {
                reject(err);
            } else {
                Object.assign(request.body, qs.parse(fauxQueryStringParts.join('&')));
                resolve();
            }
        })
        .on('field', (key, val) => {
            if (val !== '') {
                fauxQueryStringParts.push(qs.stringify({
                    [key]: val
                }));
            }
        });
});