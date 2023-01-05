# API endpoints

## Authentication
<ul>
<li>

### GET /api/v1/auth/
<b> Description : </b> to check whether service is running . 

</li>
<br>
<li>

### POST /api/v1/auth/
<b> Description : </b> to sign up or login . <br>
<b> Parameters : </b>
| Parameter  | Description |
| ------------- | ------------- |
| phone  | mobile number of user with country code  |

</li>
<br>
<li>

### POST /api/v1/auth/verify
<b> Description : </b> to verify the otp of user. <br>
<b> Parameters : </b>
| Parameter  | Description |
| ------------- | ------------- |
| phone  | mobile number of user with country code  |
| otp | otp sent to the user |

</li>
<br>
<li>

### GET /api/v1/auth/me
<b> Description : </b> to verify the authenticity of user. <br>
<b> Parameters : </b>
| Parameter  | Description |
| ------------- | ------------- |
| Header | Authorization : Bearer JWTToken  |

</li>