# users table
CREATE TABLE users (
  user_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR2(50) NOT NULL,
  last_name VARCHAR2(50) NOT NULL,
  email VARCHAR2(100) NOT NULL UNIQUE, -- Ensures unique email addresses
  password VARCHAR2(60) NOT NULL,
  role VARCHAR2(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT SYSDATE NOT NULL -- Uses current timestamp
);

# user details schema
CREATE TABLE user_details (
  user_id NUMBER NOT NULL,
  gender VARCHAR2(20),
  address_line_1 VARCHAR2(200),
  address_line_2 VARCHAR2(200),
  city VARCHAR2(50),
  state VARCHAR2(50),
  zip_code VARCHAR2(20),
  country VARCHAR2(50),
  driving_license_url VARCHAR2(200),
  driving_license_number VARCHAR2(50),
  social_security_card_number VARCHAR2(50), -- **Warning:** Consider security implications
  resume_url VARCHAR2(200),
  supportive_document BLOB, -- Store binary data for documents (e.g., scanned documents)
  mobile_phone_number VARCHAR2(20),
  -- Foreign Key Constraint (moved after column definitions)
  CONSTRAINT fk_user_details_user_id FOREIGN KEY (user_id)
  REFERENCES users(user_id)
);

# after altering the table
CREATE TABLE user_details (
  user_id NUMBER NOT NULL,
  gender VARCHAR2(20),
  address_line_1 VARCHAR2(200),
  address_line_2 VARCHAR2(200),
  city VARCHAR2(50),
  state VARCHAR2(50),
  zip_code VARCHAR2(20),
  country VARCHAR2(50),
  driving_license_url VARCHAR2(200),
  driving_license_number VARCHAR2(50),
  social_security_card_number VARCHAR2(50), -- **Warning:** Consider security implications
  resume_url VARCHAR2(200),
  supportive_document BLOB, -- Store binary data for documents (e.g., scanned documents)
  mobile_phone_number VARCHAR2(20),
  supportive_documents JSON, -- Store an array of document names and URLs
  -- Foreign Key Constraint (moved after column definitions)
  CONSTRAINT fk_user_details_user_id FOREIGN KEY (user_id)
  REFERENCES users(user_id)
);

## neon table to use
CREATE TABLE credential_for_users (
 user_id NUMBER NOT NULL,
  gender VARCHAR2(20),
  address_line_1 VARCHAR2(200),
  address_line_2 VARCHAR2(200),
  city VARCHAR2(50),
  state VARCHAR2(50),
  zip_code VARCHAR2(20),
  country VARCHAR2(50),
  driving_license_number VARCHAR2(50),
  social_security_card_number VARCHAR2(50), -- **Warning:** Consider security implications
  resume_url VARCHAR2(200),
  mobile_phone_number VARCHAR2(20),
  -- Foreign Key Constraint (moved after column definitions)
CONSTRAINT fk_credentials_user_id FOREIGN KEY (user_id)
  REFERENCES users(user_id)
);

# uploads table
CREATE TABLE uploads_for_users (
  user_id NUMBER NOT NULL,
  upload_data JSON NOT NULL,  -- Stores an array of objects with upload_name and upload_url
  CONSTRAINT fk_uploads_user_id FOREIGN KEY (user_id)
  REFERENCES users(user_id)
);
