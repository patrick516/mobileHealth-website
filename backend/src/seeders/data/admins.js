import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const adminData = [
  {
    fullName: 'Super Admin',
    email: 'admin@mobilehealth.com',
    passwordHash: bcrypt.hashSync('admin123', salt),
    role: 'SUPER_ADMIN',
    isActive: true,
  },
  {
    fullName: 'Test Admin',
    email: 'test@mobilehealth.com',
    passwordHash: bcrypt.hashSync('test123', salt),
    role: 'ADMIN',
    isActive: true,
  },
];
