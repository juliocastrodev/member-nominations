import { Role } from '../../shared/domain/users/Role'

export const MARGOT = {
  name: 'Margot Robinson',
  email: 'margot@member.com',
  password: 'margotPassword',
  role: Role.MEMBER,
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiTUVNQkVSIiwic3ViIjoiYWJjIiwiaWF0IjoxNjQ2MDM1NzY2fQ.xufDCINIAgey_VpQuUg25zTDCWmQc9JxOC9RVXCavnM',
}

export const TYLER = {
  name: 'Tyler Pearce',
  email: 'tyler@admin.com',
  password: 'adminPassword',
  role: Role.ADMIN,
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJhYmMiLCJpYXQiOjE2NDYwMzU3MDZ9.DKYt_u_I1_Ssjc6KHAqQdasVZxqJ9XH6E94HBSrIjFY',
}
