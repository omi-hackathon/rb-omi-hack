#!/bin/bash
forever stop $(cat ~/.forever/pids/api.pid)
