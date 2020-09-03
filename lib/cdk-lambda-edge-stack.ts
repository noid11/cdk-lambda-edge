import * as cdk from '@aws-cdk/core';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export class CdkLambdaEdgeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaEdgeIamRole = new iam.Role(this, 'lambdaEdgeIamRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('edgelambda.amazonaws.com'),
        new iam.ServicePrincipal('lambda.amazonaws.com')
      )
    });

    const allowAssumeRoleStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["sts:AssumeRole"],
      resources: ["*"]
    });

    const allowLogsStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      resources: ["*"]
    });

    const assumePolicy = new iam.Policy(this, 'StsAssumeForLambdaEdge');
    assumePolicy.addStatements(allowAssumeRoleStatement);
    assumePolicy.addStatements(allowLogsStatement);

    lambdaEdgeIamRole.attachInlinePolicy(assumePolicy);

    const viewerRequestFunction = new lambda.Function(this, 'viewerRequestHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda/viewer-request'),
      handler: 'main.handler',
      role: lambdaEdgeIamRole
    });

    const originRequestFunction = new lambda.Function(this, 'originRequestHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda/origin-request'),
      handler: 'main.handler',
      role: lambdaEdgeIamRole
    });

    const dist = new cloudfront.Distribution(this, 'myDist', {
      defaultBehavior: {
        origin: new origins.HttpOrigin('www.example.com'),
        edgeLambdas: [
          {
            functionVersion: viewerRequestFunction.currentVersion,
            eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
          },
          {
            functionVersion: originRequestFunction.currentVersion,
            eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
          }
        ]
      }
    });
  }
}
