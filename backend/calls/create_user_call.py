import requests
from getpass import getpass

password = getpass("Enter password: ")

endpoint = "http://127.0.0.1:8000/users/create"

userdata = {
        "username": "test_username",
        "password": password
}

response = requests.post(endpoint, json = userdata)

print(response.json())
