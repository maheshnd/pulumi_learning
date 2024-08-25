# Project Deployment

## Overview

This project uses Pulumi to manage and deploy static websites to AWS S3. The following URLs link to the currently deployed static websites for different environments.

## Deployment URLs

- **SQA Environment:**

  - [SQA Website](http://maheshnd-pulumi-first-sqa-my-static-website-bucket-cd080d1.s3-website-us-east-1.amazonaws.com/)

- **Development Environment:**
  - [Development Website](http://maheshnd-pulumi-first-dev-my-static-website-bucket-5ec9f14.s3-website-us-east-1.amazonaws.com)

## Setup and Deployment

To set up and deploy this project, follow these steps:

1. **Install Dependencies:**

   - Ensure you have Node.js and npm installed.
   - Install Pulumi CLI globally:
     ```bash
     npm install -g pulumi
     ```

2. **Configure AWS Credentials:**

   - Set up your AWS credentials in your environment. You can use the `aws configure` command or set the necessary environment variables:
     ```bash
     export AWS_ACCESS_KEY_ID=<your-access-key-id>
     export AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
     export AWS_REGION=<your-region>
     ```

3. **Configure Pulumi Access Token:**

   - Obtain your Pulumi access token from your Pulumi account.
   - Set the Pulumi access token as an environment variable:
     ```bash
     export PULUMI_ACCESS_TOKEN=<your-pulumi-access-token>
     ```

4. **Install Project Dependencies:**

   - Navigate to the project directory and install the required npm packages:
     ```bash
     npm install
     ```

5. **Select Stack and Deploy:**
   - Select the stack you want to deploy (e.g., `dev` or `sqa`):
     ```bash
     pulumi stack select <your-stack-name>
     ```
   - Deploy the stack:
     ```bash
     pulumi up --yes
     ```
