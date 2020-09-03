export const handler = (event: any = {}, context: any = {}, callback: any = {}) => {
    console.log(event);
    const request = event.Records[0].cf.request;
    callback(null, request);
};