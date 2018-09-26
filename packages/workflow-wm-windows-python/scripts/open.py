import subprocess
import sys

args = sys.argv[1]
app = subprocess.Popen(args)

print ('{"pid": %s }' % app.pid)
