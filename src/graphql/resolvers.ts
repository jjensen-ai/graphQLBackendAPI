import { employee } from '../models/employeeModel';
import { user } from '../models/users';

export const resolvers = {
  Query: {
    getAllEmployees: async () => {
      return await employee.find();
    },
    getEmployee: async ({ id }: any) => {
      return await employee.findById(id);
    },
    login: async (
      parent: any | undefined,
      { username, password }: any | undefined
    ) => {
      const userLogin = await user.findOne({ username });

      if (!userLogin) {
        throw Error(`${username} does not exist`);
      }

      const validUser = await user.findOne({ password });

      if (!validUser) {
        throw Error('Password is incorrect');
      }

      return userLogin;
    },
  },

  Mutation: {
    signUp: async (parent: any, args: any | undefined) => {
      const { username, email, password } = args;

      const newUser = new user({ username, email, password });

      if (email === user.findOne(email)) {
        throw Error('This email is already in use, try a different one');
      } else {
        await newUser.save();
      }

      return newUser;
    },

    addEmployee: async (parent: any, args: any | undefined) => {
      const { firstName, lastName, email, gender, salary } = args;

      const newEmployee = new employee({
        firstName,
        lastName,
        email,
        gender,
        salary,
      });

      if (email === employee.findOne(email)) {
        throw Error('This email is already in use, try a different one');
      } else {
        await newEmployee.save();
      }

      return newEmployee;
    },

    updateEmployee: async (parent: any, args: any | undefined) => {
      const { id, firstName, lastName, email, gender, salary } = args;
      const currentEmployee = employee.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          gender,
          salary,
        },
        { new: true }
      );

      if (!currentEmployee) {
        throw Error('This employee does not exist');
      }

      return await currentEmployee;
    },

    deleteEmployee: async (parent: any, args: any | undefined) => {
      const { id } = args;
      await employee.findByIdAndDelete(id);
      return 'Employee has been deleted successfully';
    },
  },
};
