export function escapeHtml(str: string): string {
  // Create a Map object with special characters and their replacement values
  const escapeMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
  };

  // Use the replace method with regex to replace special characters
  return str.replace(/[&<>"'`]/g, (char) => escapeMap[char] || char);
}
