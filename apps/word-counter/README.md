# Word Caounter

This is a simple API for Caounting repetitive words from text submissions,
generating reports of the most common words, and handling specific language requirements.

## Table of Contents

- [Setup](#setup)
- [Endpoints](#endpoints)
- [Create Text Submission](#create-text-submission)
- [Get All Text Submissions](#get-all-text-submissions)
- [Get Report](#get-report)

# Setup

Environment Variable

```env
FORBIDDEN_WORDS=halo,test //Array of Forbidden Words, will reject the submission if the content contains the given words
```

# Endpoints

## Create Text Submission

URL: `api/text-submission`
Method: POST
Headers:
_`Content-Type: application/json`
_`Accept-Language: en`
Body:

```
{
  "content": "This is a test text submission."
}
```

Example curl Command:

```bash
curl -X POST http://localhost:3000/api/text-submission \
-H "Content-Type: application/json" \
-H "Accept-Language: en" \
-d '{"content": "This is a test text submission."}'
```

## Get All Text Submissions

URL: `api/text-submission`
Method: GET
Headers:
\_`Accept-Language: en`

Example curl Command:

```bash
curl -X GET http://localhost:3000/text-submission \
-H "Accept-Language: en"
```

## Get Report

URL: `/report`
Method: GET

Headers:
\_`Accept-Language: en`

Query Parameters:
numberOfWords (optional): The number of most common words to return.
minRepetitions (optional): The minimum number of repetitions a word must have to be included in the report.

Example curl Commands:

    With only numberOfWords:
    ```bash
    curl -X GET "http://localhost:3000/report?numberOfWords=10" \
    -H "Accept-Language: en"

    ```

    With only minRepetitions:
    ```bash
    curl -X GET "http://localhost:3000/report?minRepetitions=2" \

-H "Accept-Language: en"

````

With both numberOfWords and minRepetitions:
```bash
curl -X GET "http://localhost:3000/report?numberOfWords=10&minRepetitions=2" \
-H "Accept-Language: en"

````

With neither parameter:

```bash
With neither parameter:
```

## Testing

To run the tests, use the following command:

```bash
nx test word-counter
```
