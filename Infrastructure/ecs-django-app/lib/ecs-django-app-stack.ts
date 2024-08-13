import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export const PREFIX = "django-app-on-ecs";
export const CIDR:string = (process.env.CIDR as string)
export const IMAGE:string = (process.env.IMAGE as string)


export class EcsDjangoAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // deploy a cluster into a vpc
    const vpc = new ec2.Vpc(this, "Vpc", {
      ipAddresses: ec2.IpAddresses.cidr(CIDR),
      maxAzs: 2, // each will have 1 public + 1 private subnets
      vpcName: `${PREFIX}-vpc`
    });

    const cluster: ecs.Cluster = new ecs.Cluster(this, "Cluster", {
      vpc,
      clusterName: `${PREFIX}-cluster`
    })
    const executionRole = new iam.Role(this, 'EcsExecutionRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy')
      ]
    });

    const service = new ApplicationLoadBalancedFargateService(this, "Service", {
      serviceName: `${PREFIX}-service`,
      loadBalancerName: `${PREFIX}-alb`,
      cluster,
      memoryLimitMiB: 1024,
      cpu: 512, //
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry(IMAGE),
        environment: {
          REQUIRED_SETTING: "True"
        },
        containerPort: 8000,
        executionRole: executionRole
      },
      desiredCount: 1,
    })
  }
}