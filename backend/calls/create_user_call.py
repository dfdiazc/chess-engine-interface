import requests

endpoint = "http://127.0.0.1:8000/users/create"

userdata = {
        "username": "test@email.com",
        "password": "fake"
}

response = requests.post(endpoint, json = userdata)

print(response.json())
