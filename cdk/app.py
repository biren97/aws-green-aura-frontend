#!/usr/bin/env python3
import os

import aws_cdk as cdk

from cdk.cdk_stack import FrontEndStack


app = cdk.App()
FrontEndStack(app, "FrontEndStack",
    env=cdk.Environment(account=os.getenv('CDK_DEFAULT_ACCOUNT'), region=os.getenv('CDK_DEFAULT_REGION')),
    )

app.synth()
