// Predefined vibrant, sophisticated avatar gradient presets
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', // Indigo-Violet
  'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)', // Blue-Cyan
  'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Emerald
  'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', // Rose
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', // Amber
  'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', // Purple-Pink
  'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', // Sky-Blue
  'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', // Teal
];

/**
 * Get initials from employee full name (e.g. "Rahul Sharma" -> "RS")
 */
export function getInitials(name = '') {
  if (!name || typeof name !== 'string') return '??';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Deterministically pick a gradient for an employee based on their name or ID
 */
export function getAvatarGradient(name = '') {
  if (!name) return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}
