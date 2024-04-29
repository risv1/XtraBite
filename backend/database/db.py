import cx_Oracle
import os

user = os.environ['ORACLE_USER']
password = os.environ['ORACLE_PASSWORD']
host = os.environ['ORACLE_HOST']
port = os.environ['ORACLE_PORT']
service = os.environ['ORACLE_SERVICE']

dsn_tns = cx_Oracle.makedsn(
    os.environ['ORACLE_HOST'], os.environ['ORACLE_PORT'], service_name=os.environ['ORACLE_SERVICE'])

connection = cx_Oracle.connect(
    user=os.environ['ORACLE_USER'], password=os.environ['ORACLE_PASSWORD'], dsn=dsn_tns)
