import pandas as pd
import requests
from flask import Flask, request, jsonify, render_template
from io import BytesIO

app = Flask(__name__)

# Load Excel file from GitHub
excel_url = "https://github.com/MishelTor/misheltor.github.io/raw/main/Website2/CustomerID.xlsx"
try:
    response = requests.get(excel_url)
    response.raise_for_status()  # Check if the request was successful
    df = pd.read_excel(BytesIO(response.content), engine='openpyxl')
except Exception as e:
    print(f"Error loading Excel file: {e}")
    df = pd.DataFrame()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search():
    customer_id = request.args.get('customer_id')
    
    if not customer_id:
        return render_template('index.html', error="Please enter a Customer ID")
    
    try:
        customer_id_int = int(customer_id)
    except ValueError:
        return render_template('index.html', error="Invalid ID. Numbers only please.")
    
    if df.empty:
        return render_template('index.html', error="Database not available")
    
    result = df[df['ID'] == customer_id_int]
    
    if not result.empty:
        customer_data = result.iloc[0].to_dict()
        return render_template('index.html',
                             customer_id=customer_data['ID'],
                             name=customer_data['Name'],
                             tickets=customer_data['Tickets'])
    else:
        return render_template('index.html', error="Customer ID not found")

if __name__ == '__main__':
    app.run(debug=True, port=8080)
