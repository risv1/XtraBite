import cx_Oracle
import os
from dotenv import load_dotenv

load_dotenv()

user = os.environ['ORACLE_USER']
password = os.environ['ORACLE_PASSWORD']
host = os.environ['ORACLE_HOST']
port = os.environ['ORACLE_PORT']
service = os.environ['ORACLE_SERVICE']

dsn_tns = cx_Oracle.makedsn(host, port, service)

connection = cx_Oracle.connect(user=user, password=password, dsn=dsn_tns)

cursor = connection.cursor()