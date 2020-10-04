#!/usr/bin/env python3
# coding:utf-8

import time, psutil, platform
from datetime import datetime
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

def format_bytes(bytes, suffix="B"):
    """
    Scale bytes to its proper format
    e.g.:
        1253656 => '1.20MB'
        1253656678 => '1.17GB'
    """
    factor = 1024
    for unit in ["", "K", "M", "G", "T", "P"]:
        if bytes < factor:
            return f"{bytes:.2f}{unit}{suffix}"
        bytes /= factor

svmem = psutil.virtual_memory()
print(f"Memory Available: {format_bytes(svmem.available)}")