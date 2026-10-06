const mongoose = require('mongoose');

const VALID_DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'IT',
  'Other',
];

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters.'],
      maxlength: [100, 'Name must be at most 100 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address.',
      ],
    },
    department: {
      type: String,
      required: [true, 'Department is required.'],
      trim: true,
      enum: {
        values: VALID_DEPARTMENTS,
        message: 'Department must be one of: ' + VALID_DEPARTMENTS.join(', '),
      },
    },
    designation: {
      type: String,
      required: [true, 'Designation is required.'],
      trim: true,
      minlength: [2, 'Designation must be at least 2 characters.'],
      maxlength: [100, 'Designation must be at most 100 characters.'],
    },
  },
  {
    timestamps: true,
  }
);

// Export the valid departments for reuse
employeeSchema.statics.VALID_DEPARTMENTS = VALID_DEPARTMENTS;

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
