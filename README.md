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

### Generate text response from text-input

```bash
$ curl --location 'http://localhost:3000/gemini/text' \
--header 'Content-Type: application/json' \
--data '{
    "prompt": "Write a story from Hong Kong where it started as a fish village and is an financial hub now."
}'
```

```

{"totalTokens":21,"text":"Once upon a time, in the heart of the South China Sea, where rivers met the sea and mountains embraced the land, there lay a humble fishing village called Xianggang, which would later become known as Hong Kong.\n\nXianggang was a simple place, where people lived off the bounty of the sea. Fishermen would set sail at dawn, returning with nets laden with fish. Women would gather at the docks, sorting and cleaning the catch, while children played among the boats, dreaming of the adventures that awaited them beyond the horizon.\n\nAs the years passed, Xianggang grew in size and prominence. Its strategic location, nestled between the mainland and the sea, made it a natural crossroads for trade. Merchants from far and wide flocked to the village, eager to exchange goods and ideas. Soon, Xianggang was no longer just a fishing village but a bustling trading port.\n\nIn the early 1800s, the British arrived in Hong Kong, seeking a base for their operations in the Far East. They saw the potential of the village and negotiated a treaty with the Qing dynasty, leasing Hong Kong for 150 years.\n\nThe British occupation brought about significant changes to Xianggang. They established a colonial government, introduced Western laws and institutions, and developed the infrastructure of the city. Hong Kong quickly became a major port and a hub for trade between China and the West.\n\nAs Hong Kong prospered, it attracted people from all over the world. Chinese immigrants flocked to the city in search of opportunity, while Europeans, Americans, and Indians came to trade and work. The city became a melting pot of cultures, languages, and traditions.\n\nAfter the Opium Wars, Hong Kong became a free port, further boosting its trade and commerce. By the early 20th century, it had become one of the most important financial centers in the world.\n\nHowever, Hong Kong's success was short-lived. In 1941, Japanese forces invaded the city, beginning a three-year occupation. During this time, many people fled the city, and the economy was devastated.\n\nAfter the war, Hong Kong was returned to British rule, but it took many years for the city to rebuild. However, by the 1970s, Hong Kong was once again flourishing. The city became a major manufacturing hub, producing everything from textiles to electronics.\n\nIn 1997, Hong Kong was handed back to China, marking the end of British rule. The city, however, retained its economic and political autonomy, and it continued to grow and prosper.\n\nToday, Hong Kong is one of the most important financial centers in the world. It is a global hub for banking, finance, and trade. The city is also a major tourist destination, known for its vibrant culture, stunning skyline, and delicious cuisine.\n\nThe journey of Hong Kong from a humble fish village to a global financial hub is a testament to the human spirit of innovation, resilience, and determination. It is a story of transformation and success that continues to inspire people around the world."}%
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
