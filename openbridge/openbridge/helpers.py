import os
import re
from cryptography.fernet import Fernet
def regex_validator(value):
    is_valid = False
    try:
        re.compile(value)
        is_valid = True
    except re.error:
        pass
    return is_valid

def decrypt_string(string):
    key = os.environ.get('PROXY_SECRET_KEY', "CHANGE_ME")
    return Fernet(key).decrypt(string)

def encrypt_string(string):
    key = os.environ.get('PROXY_SECRET_KEY', "CHANGE_ME")
    return Fernet(key).encrypt(string)