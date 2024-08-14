
# Django App on AWS ECS with CDK TypeScript

This repository contains a Django application hosted on AWS Elastic Container Service (ECS) with infrastructure managed by AWS Cloud Development Kit (CDK) in TypeScript. The setup includes a fully automated CI/CD pipeline using GitHub Actions, which builds a Docker image from the app, pushes it to Amazon Elastic Container Registry (ECR), and updates the ECS environment. The ECS cluster is fronted by an Application Load Balancer (ALB).

## Architecture Overview

- **AWS ECS**: The Django application is deployed in an ECS cluster using Fargate, providing scalable and secure hosting.
- **AWS CDK (TypeScript)**: The infrastructure is defined using AWS CDK in TypeScript, allowing for modular and reusable code.
- **Application Load Balancer (ALB)**: The ECS service is fronted by an ALB, routing traffic to the Django application.
- **Amazon ECR**: Docker images are stored in a private ECR repository, automatically updated when changes are pushed to the main branch.
- **GitHub Actions**: CI/CD pipelines build and push Docker images to ECR and update the ECS service with the new image.
- **Linting**: Python linting is performed using Pylama, with specific ignore codes configured in the `pylama.ini` file for testing purposes.
- **Automatic Tagging**: Tags are automatically created by analyzing commit messages according to the conventional commit message standards.

## Getting Started

### Prerequisites

To replicate this architecture in your environment, you'll need to set up the following GitHub Secrets:

- `GH_TOKEN`: Your GitHub token for accessing private repositories (if applicable).
- `AWS_ACCESS_KEY_ID`: Your AWS Access Key ID with permissions to manage ECS, ECR, and other related services.
- `AWS_SECRET_ACCESS_KEY`: Your AWS Secret Access Key.

### Repository Configuration

1. **Clone the repository** and navigate to the project directory.

2. **Update Pipeline Configuration**:
   - Modify the GitHub Actions pipeline files to change the ECR repository name according to your preferences.

3. **ALLOWED_HOSTS Configuration**:
   - In the Django app settings, `ALLOWED_HOSTS` is set to allow any domain, as the app uses the ALB domain names instead of personal domains.

### Deployment

1. **Push Changes to Main Branch**: When you push updates to the `main` branch, the GitHub Actions pipeline automatically builds a new Docker image and pushes it to the ECR repository.

2. **Update ECS Service**: The pipeline will then update the ECS service to use the newly built Docker image.

2. **Update ECS Service**: Get the ALB name from the 'deploy the latest image to ecs' > 'create-ecs-environment' section in the pipeline logs. 

### Monitoring and Management

- **AWS Management Console**: Use the AWS Management Console to monitor the ECS cluster, ALB, and other related resources.
- **Logs and Metrics**: CloudWatch logs and metrics can be used to monitor the performance and health of the application.

## Notes

- Ensure that the ALLOWED_HOSTS in the Django settings allows the ALB domain names to ensure proper routing of requests.
