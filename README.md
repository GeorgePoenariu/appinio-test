# Appinio test

## Local development

In order for the project to work you need to have docker installed locally.

### Steps to run locally:

1. Create a `.env` file inside of `/apps/backend` and add the fallowing environment variables:

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
OPENAI_API_KEY=<API KEY>
```

The OPENAI_API_KEY can be generate here [OpenAI dashboard](https://platform.openai.com/api-keys).
(Note: in order to generate the key you first need an account and also have to add some balance as this is not a free service)

2. To start the app run the following command:

```
docker compose up
```

3. To stop the app run the following command:

```
docker compose down
```

4. The app can be accessed at: http://localhost:3000

//TODO complete documentation after the AWS config is done
