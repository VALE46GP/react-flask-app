#!/usr/bin/env python3
# coding:utf-8

import platform, psutil, time
from datetime import datetime
from flask import Flask

app = Flask(__name__)

# @app.route('/time')
# def get_current_time():
#     return {'time': time.time()}

@app.route('/usage-data')
def get_cpu_percent():
    print(f"CPU Percent: {psutil.cpu_percent(.5)}  -------  Time: {time.time()}")
    return {
        'cpuPercent': psutil.cpu_percent(.5),
        'time': time.time(),
        'memoryTotal': psutil.virtual_memory().total,
        'memoryAvailable': psutil.virtual_memory().available
    }

# def format_bytes(bytes, suffix="B"):
#     """
#     Scale bytes to its proper format
#     e.g.:
#         1253656 => '1.20MB'
#         1253656678 => '1.17GB'
#     """
#     factor = 1024
#     for unit in ["", "K", "M", "G", "T", "P"]:
#         if bytes < factor:
#             return f"{bytes:.2f}{unit}{suffix}"
#         bytes /= factor

# print(f"Memory Total: {format_bytes(psutil.virtual_memory().total)}")
# print(f"Memory Available: {format_bytes(psutil.virtual_memory().available)}")