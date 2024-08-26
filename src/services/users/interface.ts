export interface User {
  id: string;
  prefix: string;
  first_name: string;
  last_name: string;
  dob: string;
  nationality: string;
  identity_card_number?: string;
  gender: string;
  phone_number_prefix: string;
  phone_number: string;
  passport_number?: string;
  expected_salary: number;
}
