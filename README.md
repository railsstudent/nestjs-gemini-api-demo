<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

Create a NestJS API to call Gemini API to

- generate text from text-only input
- generate text from text-and-image input (multimodal)
- generate text from 2 images to find what is common in them or to find the differences in them

Google Cloud credits are provided for this project. #GeminiSprint hashtag.

## Installation

```bash
$ npm install
```

## Get Germini API Key

- Visit https://aistudio.google.com/app/apikey to generate a new API key

## Test the key is working

- Run curl command

```
curl \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Write a story about a magic backpack"}]}]}' \
  -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY
```

## Create the environment variables

- Copy .env.example to .env. Replace GEMINI_API_KEY variable with the API Key that generated in the previous step

```
GEMINI_API_KEY=<google_gemini_api_key>
GEMINI_PRO_MODEL=gemini-pro
GEMINI_PRO_VISION_MODEL=gemini-pro-vision
PORT=3000
```

## Start Docker Compose

```bash
$ docker-compose up -d
```

## Call the endpoints to communicate with Gemini SDK

### Generate text from text-input

- Use Postman to test POST http://localhost:3000/gemini/text

```bash
$ curl --location 'http://localhost:3000/gemini/text' \
--header 'Content-Type: application/json' \
--data '{
    "prompt": "Write a story from Hong Kong where it started as a fish village and is an financial hub now."
}'
```

```
{"totalTokens":21,"text":"Once upon a time, in the heart of the South China Sea, where rivers met the sea and mountains embraced the land, there lay a humble fishing village called Xianggang."}%
```

#### Generate text from text-and-image input

- Use Postman to test POST http://localhost:3000/gemini/text-and-image

```bash
$ curl --location 'http://localhost:3000/gemini/text-and-image' \
--form 'file=<JPEG or PNG image>' \
--form 'prompt="Describe the rocket in 50 words or less."'
```

```
{"totalTokens":270,"text":" The rocket is small and cartoonish. It has a red cone shaped top and yellow and orange flames coming out of the bottom. It is mainly white with two small blue windows and three black circles."}
```

#### Generate text from 2 images

- Use Postman to test POST http://localhost:3000/gemini/analyse-the-images

```bash
curl --location 'http://localhost:3000/gemini/analyse-the-images' \
--form 'first=<JPEG or PNG image>' \
--form 'second=<JPEG or PNG image>' \
--form 'prompt="What is common in the two images?  The image shows \"keep calm and write code togehter\". The second image shows \"keep calm and let'\''s do it together"'
```

```
{
    "totalTokens": 553,
    "text": " The two images are similar because they both use the same font, color, and layout. They both have a crown at the top and the words \"Keep Calm\" in the middle. The second image has the words \"and write code\" below the crown, while the first image has the words \"let's do it together\" below the crown."
}
```

## Running the app (if not using Docker Compose)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## OpenAPI Specification

Swagger URL: http://localhost:3000/api

## Deploy to Cloud Run

- install gcloud cli. Assume the installation path of gcloud is ~/google-cloud-sdk/
- cd to the root of the project
- replace GEMINI_API_KEY with the actual Gemini API Key

```bash
$ ~/google-cloud-sdk/bin/gcloud run deploy \ --update-env-vars GEMINI_API_KEY=<replace with your own key>,GEMINI_PRO_MODEL=gemini-pro,GEMINI_PRO_VISION_MODEL=gemini-pro-vision
```

Cloud Run: https://nestjs-gemini-api-demo-lmoqiqicnq-de.a.run.app/
