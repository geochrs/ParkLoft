export const generateTicketId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    let result = '';
    
    // First character is a letter
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  
    // Next 5 characters are numbers
    for (let i = 0; i < 5; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
  
    return result;
  };
  