# Deployment of the app to GCP

<hr/>

We are using one project with two services. One service for frontend and another for the backend of the application.

-   Create a new project on gcp account.
-   Enable the below mentioned services in GCP.

## Services

-   Cloud SQL
-   VPC
-   App Engine [Flex environment](https://cloud.google.com/appengine/docs/the-appengine-environments)

### Cloud SQL

1. Create instance , select postgreSQL
2. Add all the details , the most important part is you need to have your Cloud SQL and VPC connector in the
   [same zone](https://cloud.google.com/vpc/docs/configure-serverless-vpc-access).
3. Expand customize your instance , expand connections panel. Select private IP and select the
   [network that you want to use](https://cloud.google.com/sql/docs/mysql/configure-private-ip?_ga=2.12415412.-141697412.1629460196).
4. Create the instance

### VPC

1. Go to vpc -> serverless VPC access. [More Info](https://cloud.google.com/appengine/docs/standard/python3/connecting-shared-vpc)
2. Create a connector , select the same network that you selected in Cloud SQL #3 and same zone as Cloud SQL #2
3. Create the network

### App Engine

1. Go to [cloud shell](https://www.youtube.com/watch?v=QTJ1yrD-pII)
2. Open terminal
3. Set project in config by running : `gcloud config set project [project_name]`
4. Set up a github
   [personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
5. Clone your repositories
6. Upload your app.yaml file, specify the service name and other
   [configurations in app-[development|production].yaml file](https://cloud.google.com/appengine/docs/flexible/nodejs/configuring-your-app-with-app-yaml)
7. Specify the connector in app-[development|production].yaml <br/><br/>
   `vpc_access_connector: name: "projects/[project name]/locations/[region]/connectors/[connector name]"`<br/> <br/>
8. Deploy the application with: `gcloud app deploy` OR you can specify the YAML file to read config from like: <br/>
   `cloud app deploy ~/my_app/app.yaml` [More Info](https://cloud.google.com/sdk/gcloud/reference/app/deploy)
9. Update the routing by running `npm run update-routing`

#### App engine service names

Dev environment:

-   frontend_dev

Production environment:

-   frontend_prod

#### Note:

<ol>
    <li> App engine expects two scripts in your package.json
        <ul>
        <li>gcp-build</li>
        <li>start</li>
        </ul>
    </li>
    <li> App engine expects the "main" property to be defined in package.json <br/>to the main file that will be loaded ex: 'main':'dist/main.js' in NEST JS</li>
</ol>

## Post Deployment

You can run:

-   `gcloud app browse -s [service name]` to get the url of the service.
-   `gcloud app logs tail --service=[service name]` to get the logs of the service.
