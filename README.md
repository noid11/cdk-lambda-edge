# CDK Lambda@Edge Template

- A CDK App that deploys Lambda@Edge and CloudFront Distribution

## TOC

<!-- TOC -->

- [CDK Lambda@Edge Template](#cdk-lambdaedge-template)
    - [TOC](#toc)
    - [Useful commands](#useful-commands)
        - [build, deploy](#build-deploy)
        - [Lambda@Edge Function local invoke with SAM CLI](#lambdaedge-function-local-invoke-with-sam-cli)
        - [Delete Resources](#delete-resources)
    - [TIPS](#tips)
        - [An error occurs because the replica of the Lambda@Edge function is not deleted](#an-error-occurs-because-the-replica-of-the-lambdaedge-function-is-not-deleted)

<!-- /TOC -->

## Useful commands

### build, deploy

```zsh
% npm run build
% cdk deploy
```


### Lambda@Edge Function local invoke with SAM CLI

```zsh
% cdk synth --no-staging > template.yaml
% sam local invoke viewerRequestHandlerXXXX -e lambda/sample-events/viewer-requests.json
```

`lambda/sample-events/xxx.json` that sample Lambda@Edge events.

SAM CLI - AWS Cloud Development Kit (AWS CDK)  
https://docs.aws.amazon.com/cdk/latest/guide/sam.html

### Delete Resources

```zsh
% cdk destroy
```


## TIPS

### An error occurs because the replica of the Lambda@Edge function is not deleted

- An error occurs because the replica of the Lambda@Edge function is not deleted when you run the `cdk deploy`, `cdk destroy` commands
- It may take some time to delete the replica, so please try again later.
