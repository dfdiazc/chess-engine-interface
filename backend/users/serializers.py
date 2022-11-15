from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:

        model = User

        fields = ["username", "password"]

    def create(self, validated_data):

        user = User.objects.create_user(username = validated_data["username"],
                                        password = validated_data["password"],
                                        email = validated_data["username"])

        return user

class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = ["username", "first_name", "last_name", "email"]

class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = ["first_name", "last_name"]
