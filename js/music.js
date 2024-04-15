fetch (
    "https://t3ogxvus80.execute-api.us-east-1.amazonaws.com/musicData"
)
    .then((response) => response.json())
    .then((data) => musicFunctions(data));