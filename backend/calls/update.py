import requests

login_point = "http://127.0.0.1:8000/users/login"
userdata = {"username": "jotas", "password": "test_password"}

auth_response = requests.post(login_point, json = userdata)

token = auth_response.json()["access"]

endpoint = "http://127.0.0.1:8000/users/update"

update_data = {

    "first_name": "Juan José"

}

d = {"Authorization": f"Bearer {token}"}
response = requests.post(endpoint, headers = d, json=update_data)

print(response.json())
