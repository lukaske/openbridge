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
    key = os.environ.get('PROXY_SECRET_KEY', "nIOSp2MiKo9zP8o3OZW-AFy8dBaTf8GVqqaXsU1GA7E=")
    key = convert_key(key)
    return Fernet(key).decrypt(string.encode('utf-8')).decode('utf-8')

def encrypt_string(string):
    key = os.environ.get('PROXY_SECRET_KEY', "nIOSp2MiKo9zP8o3OZW-AFy8dBaTf8GVqqaXsU1GA7E=")
    key = convert_key(key)
    return Fernet(key).encrypt(string.encode('utf-8')).decode('utf-8')

def convert_key(string):
    key_bytes = string.encode('utf-8')
    return key_bytes

def generate_fernet_key():
    key = Fernet.generate_key()
    return key.decode('utf-8')

