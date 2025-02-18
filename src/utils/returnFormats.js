// Format user details before sending response
const formatUser = (user) => {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    provider: user.provider,
    createdAt: user.createdAt,
  };
};

// Format API response structure (for consistency)
const formatResponse = (message, data = null) => {
  return {
    success: true,
    message,
    data,  
  };
};

// Format error responses (for handling API errors)
const formatError = (errorMessage, statusCode = 500) => {
  return {
    success: false,
    error: errorMessage,
    statusCode,
  };
};

module.exports = { formatUser, formatResponse, formatError };
