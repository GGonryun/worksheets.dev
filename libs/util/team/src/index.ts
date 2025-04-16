export const generateTeamSlug = (name: string) => {
  // Convert to lowercase
  let slug = name.toLowerCase();
  // Replace spaces with underscores
  slug = slug.replace(/\s+/g, '_');
  // Remove special characters except underscores
  slug = slug.replace(/[^\w_]/g, '');
  return slug;
};

export const validateTeamName = (name: string) => {
  if (name.trim().length === 0) return '';

  // Check minimum length
  if (name.trim().length < 3) {
    return 'Team name must be at least 3 characters long';
  }

  // Check if name contains at least one alphanumeric character
  if (!/[a-zA-Z0-9]/.test(name)) {
    return 'Team name must contain at least one letter or number';
  }

  return '';
};
