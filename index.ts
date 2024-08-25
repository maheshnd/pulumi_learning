import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import * as fs from "fs";
import * as path from "path";

const stackName = pulumi.getStack();
const projectName = pulumi.getProject();
const organizationName = pulumi.getOrganization();

// Define the S3 bucket
const bucket = new aws.s3.Bucket(
  `${organizationName}-${projectName}-${stackName}-my-static-website-bucket`,
  {
    website: {
      indexDocument: "index.html",
      errorDocument: "error.html",
    },
    forceDestroy: true,
  }
);

// Define the public access block configuration for the S3 bucket
const bucketPublicAccessBlock = new aws.s3.BucketPublicAccessBlock(
  `${bucket.id}-public-access-block`,
  {
    bucket: bucket.id,
    blockPublicAcls: false,
    ignorePublicAcls: true,
    blockPublicPolicy: false,
    restrictPublicBuckets: false,
  }
);

// Define the S3 bucket policy
const bucketPolicy = new aws.s3.BucketPolicy(`${bucket.id}-policy`, {
  bucket: bucket.id,
  policy: bucket.id.apply((id) =>
    JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Action: "s3:GetObject",
          Effect: "Allow",
          Resource: `arn:aws:s3:::${id}/*`,
          Principal: "*",
        },
      ],
    })
  ),
});

// Path to your website files
const websitePath = path.join(__dirname, "website");

// Upload static files to S3 bucket
fs.readdirSync(websitePath).forEach((file) => {
  const filePath = path.join(websitePath, file);
  new aws.s3.BucketObject(file, {
    bucket: bucket.id,
    source: new pulumi.asset.FileAsset(filePath),
    contentType: file.endsWith(".html") ? "text/html" : "text/css",
  });
});

// Export bucket name and website URL
export const bucketName = bucket.id;
export const websiteUrl = bucket.websiteEndpoint;
