#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkLambdaEdgeStack } from '../lib/cdk-lambda-edge-stack';

const app = new cdk.App();
new CdkLambdaEdgeStack(app, 'CdkLambdaEdgeStack', {
    env: {
        region: 'us-east-1'
    }
});
