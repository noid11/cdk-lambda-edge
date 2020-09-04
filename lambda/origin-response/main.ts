export const handler = (event: any = {}, context: any = {}, callback: any = {}) => {
    console.log(event);
    const response = event.Records[0].cf.response;
    callback(null, response);
};