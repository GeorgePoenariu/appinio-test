# Appinio test

## Local development

To run the project locally, ensure that Docker is installed on your machine.

### Steps to run locally:

**1. Create a `.env` file inside of `/apps/backend` and add the fallowing environment variables:**

```
# General
PORT=8080
FRONT_END_URL=http://localhost:3000
PASSPORT_SESSION_SECRET=xhgMG7fv5Us5p3eKbAR2lNiRKuOPtV

# Mongo Connection
MONGO_URI_PREFIX=mongodb
MONGO_USERNAME=root
MONGO_PASSWORD=root
MONGO_HOST=db:27017
MONGO_DATABASE=appinio

# OpenAI
OPENAI_URL=https://api.openai.com/v1/completions
OPENAI_MODEL=gpt-3.5-turbo-instruct
OPENAI_API_KEY=<API KEY>
```

The OPENAI_API_KEY can be generate here [OpenAI dashboard](https://platform.openai.com/api-keys).  
(Note: in order to generate the key you first need an account and also have to add some balance as this is not a free service)

**2. Start the app by running the following command:**

```
docker compose up
```

This command will spin up the backend, frontend, and a MongoDB instance inside Docker.

**3. To stop the app, use the following command:**

```
docker compose down
```

**4. Access the app at: http://localhost:3000**

**5. Run backend tests with the following command:**

```
npm run test
```

### User Flow:

1. Upon entering the root, if the user is not logged in, they are redirected to the /login page.
2. From the login page, the user can also access the register page if they do not have an account.
3. After successful login, the user is redirected to the home page, where they can input data into a large text field.
4. Upon submitting the data, a call is made to the backend where the text is processed using OpenAI. The processed text, summarization, and insights are displayed under the Summarization label, with each entry prefaced with a timestamp.

### Other information:

    - Authorization is handled using `passport`, with authentication stored as a cookie.
    - Data is stored in MongoDB.
    - Input field validation is implemented using `express-validator`.

## AWS Hosting

1. The backend application is hosted on EC2 using Elastic Beanstalk and can be accessed at:

```
http://case-study-be.eu-central-1.elasticbeanstalk.com/api
```

2. The database is hosted in DocumentDB.
3. The frontend is hosted behind a CloudFront instance in an S3 bucket and can be accessed at:

```
http://d203hnyqevke7.cloudfront.net/
```

**Note: The communication between the frontend and backend is not fully functional in AWS. Passport authorization relies on setting cookies in the frontend to authorize requests. Browsers block this set-cookie action if the request comes from a different domain and is not secure (HTTPS). To resolve this, purchasing a domain, generating an SSL certificate, and setting it up for the backend to enable HTTPS requests is necessary. Due to time and budget constraints, this implementation was not pursued further.**
