import os
from pathlib import Path
from aws_cdk import (
    Stack,
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_s3_deployment as s3_deploy,
    CfnOutput,
    RemovalPolicy,
)
from constructs import Construct

class FrontEndStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Get the React build directory path
        # This assumes the build output is in ../code/dist
        react_build_dir = Path(__file__).parent.parent.parent / "code" / "dist"

        # 1️⃣ Create S3 bucket for hosting the React app
        website_bucket = s3.Bucket(
            self,
            "TradingBucket",
            bucket_name=f"trading-bucket-{self.account}",
            block_public_access=s3.BlockPublicAccess(
                block_public_acls=True,
                block_public_policy=True,
                ignore_public_acls=True,
                restrict_public_buckets=True
            ),
            removal_policy=RemovalPolicy.DESTROY,
            auto_delete_objects=True,
        )

        # 2️⃣ Create CloudFront distribution
        distribution = cloudfront.Distribution(
            self,
            "WebsiteDistribution",
            default_behavior=cloudfront.BehaviorOptions(
                origin=origins.S3Origin(website_bucket),
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED,
            ),
            default_root_object="index.html",
            error_responses=[
                cloudfront.ErrorResponse(
                    http_status=404,
                    response_http_status=200,
                    response_page_path="/index.html",
                    ttl=None
                )
            ]
        )

        # 3️⃣ Deploy React build files to S3
        s3_deploy.BucketDeployment(
            self,
            "DeployWebsite",
            sources=[s3_deploy.Source.asset(str(react_build_dir))],
            destination_bucket=website_bucket,
            distribution=distribution,
            distribution_paths=["/*"],
        )

        # 4️⃣ Output the CloudFront URL
        CfnOutput(
            self,
            "CloudFrontURL",
            value=f"https://{distribution.domain_name}",
            description="CloudFront distribution URL for React app"
        )

        CfnOutput(
            self,
            "S3BucketName",
            value=website_bucket.bucket_name,
            description="S3 bucket name"
        )

