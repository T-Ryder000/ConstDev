from flask import Flask, jsonify, render_template, request
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_form', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        print(request.form) 
        email = request.form['email']
        message = request.form['message']
        number = request.form['number']

        sender_email = 'suporteconstsoft@gmail.com'
        sender_password = 'i g m f x o s f t z w k e a m e'

        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = sender_email
        msg['Subject'] = 'Tenho interesse em um sistema!'

        body = f"Novo contato recebido!\n\nEmail: {email}\nTelefone/Whatsapp: {number}\nMensagem: {message}"
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, sender_email, msg.as_string())
        server.quit()

        response_message = 'Mensagem enviada com sucesso!'
        return jsonify(response_message)

if __name__ == '__main__':
    app.run(debug=True)
