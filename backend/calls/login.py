import requests

endpoint = "http://127.0.0.1:8000/users/login"

userdata = {
    "username": "test_username",
    "password": "test_password"
}

response = requests.post(endpoint, json=userdata)

print(response.json())
