const registerOrganizationTemplate = (organization_name: string, email: string, password: string) => {
    return `{<!DOCTYPE html>
    <html>
      <head>
        <title>Organization Created</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
          }
    
          h1 {
            font-size: 24px;
            margin-top: 0;
          }
    
          p {
            margin-bottom: 1em;
          }
    
          .container {
            max-width: 600px;
            margin: 0 auto;
          }
    
          .button {
            display: inline-block;
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 1em;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Organization Created</h1>
          <p>Congratulations, your organization has been successfully created!</p>
          <p>Here are the details:</p>
          <ul>
            <li><strong>Name:</strong> ${organization_name}</li>
            <li><strong>Email of your organization:</strong> ${email}</li>
            <li><strong>Admin password of your organization:</strong> ${password}</li>
          </ul>
          <p>Thank you for using our service!</p>
        </div>
      </body>
    </html>}`;
};

export {registerOrganizationTemplate};