export const handler = (event: any = {}, context: any = {}, callback: any = {}) => {
    console.log(JSON.stringify(event, null, 4));
    const response = event.Records[0].cf.response;
    callback(null, response);
};