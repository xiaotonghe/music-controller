from django.db import models
import string
import random
# Create your models here.


def generate_unique_code():
    length = 6

    while True:
        # generate random code that's 6 length only contains uppercase
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        # check if the generate code is unique or not
        if Room.objects.filter(code=code).count() == 0:
            break
    return code


class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)  # who is the host
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
