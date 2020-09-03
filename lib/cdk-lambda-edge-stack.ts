import * as cdk from '@aws-cdk/core';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';

export class CdkLambdaEdgeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dist = new cloudfront.Distribution(this, 'myDist', {
      defaultBehavior: {
        origin: new origins.HttpOrigin('www.example.com')
      }
    });
  }
}
