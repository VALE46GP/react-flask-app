#!/usr/bin/env python3
# coding:utf-8

import platform, psutil, time
from datetime import datetime
from flask import Flask

app = Flask(__name__)

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

@app.route('/usage-data')
def get_usage_data():
    print(f">>>>>>>>> get_usage_data()")
#     print(f">>>>>>>>> psutil.sensors_battery().percent = {psutil.sensors_battery().percent}")
    return {
        'cpuPercent': psutil.cpu_percent(.5),
        'diskSpaceAvailable': psutil.disk_usage('/').free,
        'diskSpaceTotal': psutil.disk_usage('/').total,
        'time': time.time(),
        'memoryTotal': psutil.virtual_memory().total,
        'memoryAvailable': psutil.virtual_memory().available,
        'battery': {
            'percent': psutil.sensors_battery().percent,
            'secsLeft': psutil.sensors_battery().secsleft,
            'charging': psutil.sensors_battery().power_plugged
        }
    }

@app.route('/system-info')
def get_system_info():
    print(f">>>>>>>>> get_system_info()")
    return {
        'cpuCount': psutil.cpu_count(logical=False),
        'cpuMexFreq': format_bytes(psutil.cpu_freq().max * 1000000, 'Hz'),
        'diskSpaceTotal': format_bytes(psutil.disk_usage('/').total),
        'memoryTotal': format_bytes(psutil.virtual_memory().total)
    }

# print(f"Memory Total: {format_bytes(psutil.virtual_memory().total)}")
# print(f"Memory Available: {format_bytes(psutil.virtual_memory().available)}")
# print(f"diskSpaceTotal = {format_bytes(psutil.disk_usage('/').total)}")