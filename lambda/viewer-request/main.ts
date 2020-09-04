export const handler = (event: any = {}, context: any = {}, callback: any = {}) => {
    console.log(JSON.stringify(event, null, 4));
    const request = event.Records[0].cf.request;
    callback(null, request);
};